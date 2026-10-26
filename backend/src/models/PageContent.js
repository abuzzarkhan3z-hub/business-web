import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  badge: { type: String, default: 'Transform Your Furniture' },
  title: { type: String, default: 'Transform Your Furniture' },
  subtitle: { type: String, default: 'with Royal Furnishing' },
  description: { type: String, default: 'Lorem ipsum dolor sit amet consectetur...' },
  buttonText: { type: String, default: 'Contact Us' },
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80' },
}, { _id: false });

const PromoCardSchema = new mongoose.Schema({
  id: Number,
  title: String,
  subtitle: String,
  discount: String,
  action: String,
  image: String,
}, { _id: false });

const ServiceCardSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
}, { _id: false });

const AboutSchema = new mongoose.Schema({
  badge: String,
  title: String,
  description: String,
  yearsExperience: String,
  imageUrl: String,
}, { _id: false });

const ContactSchema = new mongoose.Schema({
  phone: String,
  email: String,
  address: String,
  workingHours: String,
}, { _id: false });

const PageContentSchema = new mongoose.Schema(
  {
    hero: { type: HeroSchema, default: () => ({}) },
    promoCards: { type: [PromoCardSchema], default: [] },
    services: { type: [ServiceCardSchema], default: [] },
    about: { type: AboutSchema, default: () => ({}) },
    contact: { type: ContactSchema, default: () => ({}) },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PageContent = mongoose.model('PageContent', PageContentSchema);
