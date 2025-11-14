import express from "express";
import cors from "cors"; // <-- 1. Import
import { signup, login, profile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// --- 2. Define CORS Options ---
const corsOptions = {
  origin: "https://snap-trek-fullstack.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// --- 3. THE FIX: Apply CORS as router-level middleware ---
// This one line will:
//   a) Automatically handle all OPTIONS requests for this router.
//   b) Add CORS headers to all POST, GET, etc. responses from this router.
router.use(cors(corsOptions));

// --- 4. Your Routes (no changes needed) ---
// You NO LONGER need to add cors() to each individual route.
// The router.use() above handles all of them.

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, profile);

export default router;