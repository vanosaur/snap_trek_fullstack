import express from "express";
import cors from "cors";
import { createPost, getAllPosts } from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js"; // We use this to get the user

const router = express.Router();

// --- CORS Options ---
const corsOptions = {
  origin: "https://snap-trek-pi.vercel.app", // Your Vercel frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS to all routes in this router
router.use(cors(corsOptions));

// --- Define Routes ---

// GET /api/posts
// Get all posts for the home feed (no protection needed, everyone can see)
router.get("/", getAllPosts);

// POST /api/posts
// Create a new post (MUST be logged in)
router.post("/", protect, createPost);

export default router;