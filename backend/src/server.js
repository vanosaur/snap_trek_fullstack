import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const prisma = new PrismaClient();

// --- 1. Define Global CORS Options ---
// This will be the default for any routes *not* handled by a specific router.
const corsOptions = {
  origin: "https://snap-trek-fullstack.vercel.app",
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
    console.log("✅ Connected to Aiven MySQL successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}
connectDB();

// --- 4. Register Routes ---
// Express will now forward all /api/auth requests to your authRoutes file.
app.use("/api/auth", authRoutes);

// --- 5. Start Server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});