# 🏔️ SnapTrek - Travel Reel & Booking Platform
**Live Deployments:**
- Frontend (Vercel): [https://snap-trek-fullstack.vercel.app/](https://snap-trek-fullstack.vercel.app/)
- Backend (Render): [https://snap-trek-fullstack.onrender.com](https://snap-trek-fullstack.onrender.com)
> **Discover, Share, and Book Your Next Adventure.**
**SnapTrek** is a modern social travel platform that combines Instagram-style reels with integrated booking functionality. Users can discover travel destinations through engaging video content, save their favorite spots, follow other travelers, and book trips directly—all in one seamless experience.
---
## 📖 Problem Statement
Travelers today consume content across multiple platforms—Instagram for inspiration, booking sites for reservations, and various apps for planning. This fragmented experience makes trip planning inefficient and overwhelming.
## 💡 Solution
SnapTrek provides an all-in-one platform to:
- **Discover** travel destinations through immersive video reels
- **Save** favorite destinations for future reference
- **Follow** travel creators and friends
- **Book** trips directly with integrated booking system
- **Share** experiences through posts and stories
- **Connect** with other travelers via real-time chat
---
## ✨ Key Features
### 🎥 Travel Reels
- Vertical video feed with swipe navigation
- Like, save, and share functionality
- Author profiles with follow/unfollow
- Detailed itinerary cards with flip animation
- Persistent like/save state across sessions
### 📅 Integrated Booking System
- Direct booking from reel itineraries
- Date and guest selection
- Real-time price calculation (₹ INR)
- Booking management in user profile
- Cancellation with ownership verification
### 👤 User Profiles
- Customizable avatar and bio
- Multiple content tabs (Posts, Reels, Saved, Bookings)
- Follower/following lists with real counts
- Delete functionality for owned content
### 💬 Real-Time Chat
- Persistent PostgreSQL-backed messaging
- Conversation list with unread indicators
- Real-time message polling
- User avatars and timestamps
### 📸 Stories & Feed
- 24-hour expiring stories with Cloudinary storage
- Instagram-style feed with posts
- Location tagging and captions
- Image upload with preview
### 🔐 Authentication & Security
- JWT-based authentication
- Protected routes with middleware
- Secure password hashing
- Session persistence
---
## 🛠️ Tech Stack
### **Frontend**
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript + JavaScript (React)
- **Styling:** Tailwind CSS with custom utilities
- **Icons:** Lucide React
- **HTTP Client:** Axios with interceptors
- **Media:** Cloudinary for image/video storage
- **Hosting:** Vercel
### **Backend**
- **Runtime:** Node.js with Express.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 6.18.0
- **Authentication:** JWT (jsonwebtoken)
- **CORS:** Production-ready with Vercel support
- **Hosting:** Render
### **Database Schema**
- Users, Posts, Reels, Stories
- Bookings with reel relations
- Follow system (many-to-many)
- Saved reels and likes
- Chat (Conversations & Messages)
---
## 🏗️ System Architecture
The application follows a **monorepo structure** with separate frontend and backend:
snap_trek_fullstack/ ├── frontend/ # Next.js application │ ├── app/ # App router pages │ ├── components/ # React components │ └── utils/ # API client & helpers ├── backend/ # Express API server │ ├── src/ │ │ ├── routes/ # API endpoints │ │ ├── controllers/ # Business logic │ │ ├── middlewares/ # Auth & validation │ │ └── utils/ # Serialization helpers │ └── prisma/ # Database schema & migrations └── render.yaml # Render deployment config

### **Data Flow**
1. **Frontend** makes authenticated requests via Axios
2. **Backend** validates JWT tokens via `protect` middleware
3. **Prisma** handles database queries with type safety
4. **BigInt serialization** ensures JSON compatibility
5. **CORS** allows cross-origin requests from Vercel
---
## 📡 API Overview
| Endpoint | Method | Description | Auth |
|:---------|:-------|:------------|:-----|
| `/api/auth/signup` | POST | Register new user | Public |
| `/api/auth/login` | POST | Authenticate user | Public |
| `/api/auth/profile` | GET | Get current user profile | Protected |
| `/api/reels` | GET | Fetch all reels with like/save status | Protected |
| `/api/reels/:id/like` | POST | Toggle like on reel | Protected |
| `/api/reels/:id/save` | POST/DELETE | Save/unsave reel | Protected |
| `/api/bookings` | GET | Get user's bookings | Protected |
| `/api/bookings` | POST | Create new booking | Protected |
| `/api/bookings/:id` | DELETE | Cancel booking | Protected |
| `/api/users/:id/follow` | POST | Follow/unfollow user | Protected |
| `/api/users/:id/followers` | GET | Get follower list | Protected |
| `/api/chat` | GET | Get conversations | Protected |
| `/api/chat/:id/messages` | GET | Get messages | Protected |
| `/api/stories` | POST | Upload story (24h expiry) | Protected |
---
## 🚀 Getting Started
### Prerequisites
- **Node.js** (v18+)
- **npm** or **yarn**
- **PostgreSQL** database (Neon recommended)
- **Cloudinary** account (for media storage)
### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/vanosaur/snap_trek_fullstack.git
   cd snap_trek_fullstack
Install backend dependencies

cd backend
npm install
Configure backend environment Create 

backend/.env
:

DATABASE_URL="postgresql://user:password@host/database"
JWT_SECRET="your-secret-key-here"
PORT=8080
NODE_ENV=development
Run Prisma migrations

cd backend
npx prisma generate
npx prisma db push
Seed the database (optional)

npm run seed
Install frontend dependencies

cd ../frontend
npm install
Configure frontend environment Create frontend/.env.local:

NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset
Run development servers

Backend:

cd backend
npm run dev  # Runs on http://localhost:8080
Frontend:

cd frontend
npm run dev  # Runs on http://localhost:3000
🔧 Production Deployment
Backend (Render)
Connect GitHub repository to Render
Set Root Directory to backend
Set Build Command: npm install && npm run build
Set Start Command: npm start
Add environment variables (DATABASE_URL, JWT_SECRET)
Frontend (Vercel)
Import project from GitHub
Set Root Directory to frontend
Framework Preset: Next.js
Add environment variables (NEXT_PUBLIC_API_BASE_URL, Cloudinary keys)
🎯 Key Implementation Highlights
BigInt Serialization
Centralized fixBigInt utility handles Prisma BigInt → String conversion for JSON responses.

State Persistence
Reels API returns isLiked and isSaved status per user
Profile endpoint includes savedReels with full reel details
Bookings persist with ownership verification
CORS Configuration
Dynamic origin validation supports both localhost and Vercel preview URLs.

Monorepo Deployment

render.yaml
 ensures Render deploys from /backend subfolder correctly.

🔮 Future Improvements
Payment Integration: Razorpay/Stripe for real transactions
Advanced Search: Filter by location, price, duration
Reviews & Ratings: User feedback on trips
Notifications: Real-time alerts for messages and bookings
Mobile App: React Native version
AI Recommendations: Personalized destination suggestions
📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Vani Rudra

GitHub: @vanosaur
Project: SnapTrek
Built with ❤️ for travelers who dream big 🏔️✈️🌍
