import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './src/config/db.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

import authRoutes from './src/routes/authRoutes.js';
import contentRoutes from './src/routes/contentRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import inquiryRoutes from './src/routes/inquiryRoutes.js';

// Setup environment and paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.set('trust proxy', 1); // Trust reverse proxy on cloud platforms like Render
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// CORS Configuration
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman) or matched origins
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev to avoid CORS friction
      }
    },
    credentials: true,
  })
);

// Body Parsers
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Serve static uploaded files (Hero images, service photos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    project: 'Royal Upholstery Backend API',
    endpoints: {
      content: '/api/content',
      heroUpdate: '/api/content/hero (PATCH)',
      uploadImage: '/api/upload (POST)',
      inquiries: '/api/inquiries (POST/GET)',
      auth: '/api/auth/login (POST)',
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Royal Upholstery Backend Server running on http://localhost:${PORT}`);
  console.log(`📁 Static uploads served at http://localhost:${PORT}/uploads/`);
});
