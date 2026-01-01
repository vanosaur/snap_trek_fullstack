import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

import { protect } from "../middlewares/authMiddleware.js";
import { toggleFollow, getUserProfile, getFollowers, getFollowing } from "../controllers/userController.js";

// GET /api/users/:id
router.get("/:id", protect, getUserProfile);

// POST /api/users/:id/follow
router.post("/:id/follow", protect, toggleFollow);

// GET /api/users/:id/followers
router.get("/:id/followers", protect, getFollowers);

// GET /api/users/:id/following
router.get("/:id/following", protect, getFollowing);

export default router;