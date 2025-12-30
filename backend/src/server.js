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

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

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
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
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

// --------------------------------
// 4️⃣ START SERVER
// --------------------------------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
