import mongoose from 'mongoose';
import { Inquiry } from '../models/Inquiry.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

// In-memory fallback if DB is not yet connected
const fallbackInquiries = [];

// @desc    Submit new quote inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res, next) => {
  try {
    const { name, phone, email, service, area, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }

    if (!isDbConnected()) {
      const tempInquiry = {
        _id: 'temp-' + Date.now(),
        name,
        phone,
        email,
        service,
        area,
        message,
        status: 'new',
        createdAt: new Date(),
      };
      fallbackInquiries.unshift(tempInquiry);
      return res.status(201).json({
        success: true,
        message: 'Inquiry received (saved in temporary cache, connect MongoDB for permanent storage)',
        data: tempInquiry,
      });
    }

    const inquiry = await Inquiry.create({
      name,
      phone,
      email,
      service,
      area,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
export const getInquiries = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        count: fallbackInquiries.length,
        dbStatus: 'disconnected',
        data: fallbackInquiries,
      });
    }

    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PATCH /api/inquiries/:id
// @access  Private/Admin
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!isDbConnected()) {
      const item = fallbackInquiries.find((i) => i._id === req.params.id);
      if (item) item.status = status;
      return res.status(200).json({ success: true, message: 'Status updated', data: item });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
export const deleteInquiry = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      const idx = fallbackInquiries.findIndex((i) => i._id === req.params.id);
      if (idx !== -1) fallbackInquiries.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Inquiry deleted' });
    }

    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};
