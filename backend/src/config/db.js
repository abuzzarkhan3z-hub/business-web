import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/royal_upholstery';

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.log(`ℹ️ Server is still running. When you configure your MongoDB connection (Local or MongoDB Atlas) in .env, data will sync automatically.`);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('ℹ️ MongoDB disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️ MongoDB connection error:', err.message);
});
