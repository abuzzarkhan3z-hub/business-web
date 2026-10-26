import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Upload image route (protected so only authorized admins can upload)
router.post('/', protect, upload.single('image'), uploadImage);

export default router;
