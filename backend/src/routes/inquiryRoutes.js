import express from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', protect, getInquiries);
router.patch('/:id', protect, updateInquiryStatus);
router.delete('/:id', protect, deleteInquiry);

export default router;
