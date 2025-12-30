import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createPost, getAllPosts, deletePost } from "../controllers/postController.js";

const router = express.Router();

// GET /api/posts
router.get("/", getAllPosts);

// POST /api/posts
router.post("/", protect, createPost);

// DELETE /api/posts/:id
router.delete("/:id", protect, deletePost);

export default router;