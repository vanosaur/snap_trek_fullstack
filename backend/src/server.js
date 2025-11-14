import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const prisma = new PrismaClient();

// --- 1. Define CORS Options ---
const corsOptions = {
  origin: "https://snap-trek-fullstack.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// --- 2. Apply Middleware (CRITICAL ORDER) ---

// 1. Handle PREFLIGHT requests (This is the line we fixed)
// This explicitly handles the 'OPTIONS' request *before* it hits any
// other routes. Use '/*' to match all paths.
app.options('/*', cors(corsOptions)); 

// 2. Apply CORS to all other requests
// This adds the CORS headers to your actual 'POST', 'GET', etc., responses.
app.use(cors(corsOptions));

// 3. Body Parser
// Must come *after* CORS but *before* your routes.
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

// --- 4. Register Routes (LAST) ---
// Your routes must be registered *after* all global middleware.
app.use("/api/auth", authRoutes);


// --- 5. Start Server ---
// Use process.env.PORT for Railway
const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});