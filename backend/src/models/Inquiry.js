import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      default: 'Sofa Upholstery',
    },
    area: {
      type: String,
      default: 'Dubai',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'completed', 'cancelled'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model('Inquiry', InquirySchema);
