import mongoose from 'mongoose';
import { PageContent } from '../models/PageContent.js';
import { defaultPageContent } from '../config/defaultData.js';

// Helper to check if MongoDB is connected
const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get landing page dynamic content
// @route   GET /api/content
// @access  Public
export const getContent = async (req, res, next) => {
  try {
    // If DB is not connected yet, return default data immediately without buffering
    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        isDefault: true,
        dbStatus: 'disconnected (serving default data)',
        data: defaultPageContent,
      });
    }

    let content = await PageContent.findOne({ isActive: true });

    // If no record exists yet, return default data gracefully
    if (!content) {
      return res.status(200).json({
        success: true,
        isDefault: true,
        data: defaultPageContent,
      });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update whole landing page content
// @route   PUT /api/content
// @access  Private/Admin
export const updateContent = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure your MONGO_URI in .env',
      });
    }

    let content = await PageContent.findOne({ isActive: true });

    if (!content) {
      content = new PageContent({
        ...defaultPageContent,
        ...req.body,
        isActive: true,
      });
    } else {
      Object.assign(content, req.body);
    }

    const updated = await content.save();
    res.status(200).json({
      success: true,
      message: 'Page content updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Hero section specifically (Image, Title, Subtitle, Description)
// @route   PATCH /api/content/hero
// @access  Private/Admin
export const updateHero = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure your MONGO_URI in .env',
      });
    }

    let content = await PageContent.findOne({ isActive: true });

    if (!content) {
      content = new PageContent({
        ...defaultPageContent,
        hero: {
          ...defaultPageContent.hero,
          ...req.body,
        },
        isActive: true,
      });
    } else {
      content.hero = {
        ...content.hero.toObject(),
        ...req.body,
      };
    }

    const updated = await content.save();
    res.status(200).json({
      success: true,
      message: 'Hero section updated successfully',
      data: updated.hero,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset content back to original design default
// @route   POST /api/content/reset
// @access  Private/Admin
export const resetContent = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure your MONGO_URI in .env',
      });
    }

    await PageContent.deleteMany({});
    const newContent = await PageContent.create({
      ...defaultPageContent,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      message: 'Content reset to default successfully',
      data: newContent,
    });
  } catch (error) {
    next(error);
  }
};
