import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js"; // This now has the OPTIONS handler

const app = express();
const prisma = new PrismaClient();

// --- 1. Define CORS Options ---
const corsOptions = {
  origin: "https://snap-trek-fullstack.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// --- 2. Apply Middleware ---

// This applies CORS headers to all *non-preflight* requests globally
app.use(cors(corsOptions));

// This is the line that was crashing. Make sure it is DELETED.
// app.options('/*', cors(corsOptions)); // <-- DELETE THIS

// Body Parser
app.use(express.json());

// --- 3. Database Connect ---
// ... (your connectDB function)
connectDB();

// --- 4. Register Routes (LAST) ---
// This will now pass OPTIONS requests to your authRoutes file,
// which now knows how to handle them.
app.use("/api/auth", authRoutes);

// --- 5. Start Server ---
// ... (your server listen logic)

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