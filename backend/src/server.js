import app from "./app.js";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // Load from .env
dotenv.config({ path: "../.env" }); // Fallback for monorepo-style setup

const prisma = new PrismaClient();

// --------------------------------
// DATABASE CONNECTION
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
// START SERVER
// --------------------------------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("✅ Consolidated API routes active");
});

