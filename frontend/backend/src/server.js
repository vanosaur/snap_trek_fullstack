import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
const prisma = new PrismaClient();

// --- 1. Define Global CORS Options ---
const corsOptions = {
  // ✅ CHANGE THIS LINE: Use an array to allow both Local and Vercel
  origin: [
    "https://snap-trek-fullstack.vercel.app", // Your Production URL
    "http://localhost:3000"                   // Your Local Development URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// --- 2. Apply Global Middleware ---
app.use(cors(corsOptions));
app.use(express.json());

// --- 3. Database Connect ---
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Neon MySQL successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}
connectDB();

// --- 4. Register Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// --- 5. Start Server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});