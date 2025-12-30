import express from "express";
import cors from "cors"; // <-- Import CORS here
import { signup, login, profile, updateProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// --- 1. Define Router-Specific CORS Options ---

// Define the list of allowed origins
const allowedOrigins = [
  "https://snap-trek-fullstack.vercel.app", // Your live Vercel URL
  "http://localhost:3000"           // Your local Next.js URL
];

const corsOptions = {
  origin: allowedOrigins, // <-- Use the array here
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// --- 2. Apply CORS as Router-Level Middleware ---
// THIS IS THE FIX:
// This line automatically handles all OPTIONS (preflight) requests
// and adds the correct headers to all POST/GET responses for this router.
router.use(cors(corsOptions));

// --- 3. Define Your Routes ---
// No need to add cors() to each route individually.
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, profile);
router.put("/profile", protect, updateProfile);

export default router;