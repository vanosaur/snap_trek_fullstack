import express from "express";
import cors from "cors"; // <-- 1. Import cors
import { signup, login, profile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// --- 2. Define Your CORS Options ---
// You can import this from a shared file or redefine it here.
// It MUST match what's in server.js
const corsOptions = {
  origin: "https://snap-trek-fullstack.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// --- 3. Handle ALL Preflight requests for this router ---
// This is the critical line. It catches OPTIONS for /signup, /login, etc.
router.options('*', cors(corsOptions)); // <-- 4. THE FIX

// --- 5. Apply CORS to your actual routes ---
// This ensures the response to the *actual* POST request also
// has the correct headers.
router.post("/signup", cors(corsOptions), signup);
router.post("/login", cors(corsOptions), login);
router.get("/profile", cors(corsOptions), protect, profile);

export default router;