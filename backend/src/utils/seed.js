import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/User.js';
import { PageContent } from '../models/PageContent.js';
import { defaultPageContent } from '../config/defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedDatabase = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/royal_upholstery';

  try {
    console.log(`⏳ Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected.`);

    // 1. Seed or update Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@royalupholstery.ae';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        name: 'Royal Furnishing Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`👤 Created default Admin: ${adminEmail} (password: ${adminPassword})`);
    } else {
      console.log(`ℹ️ Admin already exists: ${adminEmail}`);
    }

    // 2. Seed default Page Content
    const contentCount = await PageContent.countDocuments();
    if (contentCount === 0) {
      await PageContent.create({
        ...defaultPageContent,
        isActive: true,
      });
      console.log(`📄 Seeded default page content and Hero section.`);
    } else {
      console.log(`ℹ️ Page content already exists in database.`);
    }

    console.log(`🎉 Database seeding completed successfully!`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed:`, error.message);
    process.exit(1);
  }
};

seedDatabase();
