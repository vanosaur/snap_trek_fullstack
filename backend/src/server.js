import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import reelRoutes from "./routes/reelRoutes.js";
import postUploadRoutes from "./routes/postUploadRoutes.js";
import postFeedRoutes from "./routes/postFeedRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


import dotenv from "dotenv";
dotenv.config(); // Load from .env
dotenv.config({ path: "../.env" }); // Fallback for monorepo-style setup

const app = express();
const prisma = new PrismaClient();

// --------------------------------
// 1️⃣ CORS CONFIG
// --------------------------------
const allowedOrigins = [
  "https://snap-trek-fullstack.vercel.app",
  "http://localhost:3000"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) or if origin is in the list
    // OR if it's a Vercel preview URL (regex check)
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      console.warn("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));   // <-- THIS ALONE HANDLES PREFLIGHT
app.use(express.json());

// --------------------------------
// 2️⃣ DATABASE
// --------------------------------
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Neon MySQL successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}
connectDB();

// --------------------------------
// 3️⃣ ROUTES
// --------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/post-upload", postUploadRoutes);
app.use("/api/postfeed", postFeedRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🚀 SnapTrek Backend Active",
    status: "READY",
    database: process.env.DATABASE_URL ? "CONFIGURED" : "MISSING",
    environment: process.env.NODE_ENV || "development"
  });
});


// --------------------------------
// 4️⃣ START SERVER
// --------------------------------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("✅ Chat routes registered at /api/chat");
});

