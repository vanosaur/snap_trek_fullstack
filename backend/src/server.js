import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const prisma = new PrismaClient();

// 🧩 CORS FIX FOR EXPRESS 5
app.use(cors({
  origin: "https://snap-trek-fullstack.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// NO app.options("*") HERE — EXPRESS 5 DOES NOT SUPPORT "*"
// Preflight handled automatically by cors()

// Database connect
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Aiven MySQL successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}
connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
