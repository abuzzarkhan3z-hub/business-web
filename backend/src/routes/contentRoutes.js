import express from 'express';
import {
  getContent,
  updateContent,
  updateHero,
  resetContent,
} from '../controllers/contentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to fetch current website content
router.get('/', getContent);

// Protected Admin routes to update content
router.put('/', protect, updateContent);
router.patch('/hero', protect, updateHero);
router.post('/reset', protect, resetContent);

export default router;
