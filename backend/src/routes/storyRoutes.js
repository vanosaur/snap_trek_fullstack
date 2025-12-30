import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createStory, getActiveStories } from "../controllers/storyController.js";

const router = express.Router();

// GET /api/stories/active - Get all active stories grouped by user
router.get("/active", getActiveStories);

// POST /api/stories - Create a new story (Protected)
router.post("/", protect, createStory);

export default router;