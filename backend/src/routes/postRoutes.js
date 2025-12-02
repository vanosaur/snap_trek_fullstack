import express from "express";
import cors from "cors";
import { createPost, getAllPosts } from "../controllers/postController.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import { protect } from "../middlewares/authMiddleware.js"; // We use this to get the user

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
// 2. CREATE POST (For Upload)
// No 'protect' middleware here!
router.post("/", async (req, res) => {
  try {
    const { caption, location, imageUrl, authorId } = req.body;

    const newPost = await prisma.post.create({
      data: {
        caption,
        location,
        imageUrl,
        authorId: Number(authorId) 
      }
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Add this inside your existing postRoutes.js (or postUploadRoutes.js)

// DELETE /api/posts/:id
// routes/postRoutes.js

// DELETE /api/posts/:id
router.delete("/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    await prisma.post.delete({ where: { id: postId } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;