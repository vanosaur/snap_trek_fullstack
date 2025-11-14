import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: "https://snap-trek-fullstack.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// Global CORS middleware - this is fine
app.use(cors(corsOptions));

// Body Parser
app.use(express.json());

// ... your connectDB() function ...
connectDB();

// Register Routes
app.use("/api/auth", authRoutes); // <-- This is correct

// ... your app.listen() ...

// --- 5. Start Server ---
// Use process.env.PORT for Railway
const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});