# Royal Upholstery Backend API

Express.js + MongoDB backend architecture designed for the Royal Upholstery landing page and future Admin Panel.

---

## 📁 Project Structure

```
backend/
├── server.js               # Main Express entry point
├── package.json            # Dependencies & scripts
├── .env                    # Environment variables
├── .env.example            # Sample configuration
├── uploads/                # Uploaded hero & furniture images
└── src/
    ├── config/
    │   ├── db.js           # Mongoose connection with fallback warning
    │   └── defaultData.js  # Default landing page content seed
    ├── models/
    │   ├── PageContent.js  # Dynamic Hero & section content schema
    │   ├── User.js         # Admin credentials with bcrypt
    │   └── Inquiry.js      # Customer quotes & inquiries
    ├── routes/
    │   ├── authRoutes.js   # /api/auth (login, register, me)
    │   ├── contentRoutes.js# /api/content (get/update landing page & Hero)
    │   ├── uploadRoutes.js # /api/upload (multer image upload)
    │   └── inquiryRoutes.js# /api/inquiries (quote submissions)
    ├── controllers/
    │   ├── authController.js
    │   ├── contentController.js
    │   ├── uploadController.js
    │   └── inquiryController.js
    ├── middleware/
    │   ├── authMiddleware.js   # JWT token protection
    │   ├── uploadMiddleware.js # Multer file validation
    │   └── errorMiddleware.js  # 404 & error handling
    └── utils/
        └── seed.js         # Database seeding script
```

---

## ⚙️ Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Database in `.env`
Open `.env` and set your MongoDB URI:
```env
# Local MongoDB:
MONGO_URI=mongodb://127.0.0.1:27017/royal_upholstery

# Or MongoDB Atlas (Cloud):
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/royal_upholstery?retryWrites=true&w=majority
```

### 3. Seed Initial Content & Admin
```bash
npm run seed
```
- **Default Admin Email**: `admin@royalupholstery.ae`
- **Default Admin Password**: `admin123`

### 4. Start Server
```bash
# Development mode with auto-reload:
npm run dev

# Or Production:
npm start
```
Server runs on: **`http://localhost:5000`**

---

## 📡 API Endpoints

### 1. Landing Page Content
- `GET /api/content` - Fetch landing page dynamic content (Hero image, title, descriptions, etc.)
- `PUT /api/content` - Update entire content *(Protected: Bearer Token)*
- `PATCH /api/content/hero` - Update Hero image and texts *(Protected: Bearer Token)*
- `POST /api/content/reset` - Reset to original default data *(Protected: Bearer Token)*

### 2. Image Upload (Hero Image & Photos)
- `POST /api/upload` - Upload image via Multer *(Protected: Bearer Token, field: `image`)*
  - Returns: `{ "url": "http://localhost:5000/uploads/hero-12345.webp" }`

### 3. Authentication (Admin Panel)
- `POST /api/auth/login` - Admin login with email & password, returns JWT token
- `GET /api/auth/me` - Get current admin session

### 4. Inquiries & Quotes
- `POST /api/inquiries` - Public customer quote submission
- `GET /api/inquiries` - List all customer inquiries *(Protected: Bearer Token)*
- `PATCH /api/inquiries/:id` - Update status (new, contacted, completed)
- `DELETE /api/inquiries/:id` - Remove inquiry
