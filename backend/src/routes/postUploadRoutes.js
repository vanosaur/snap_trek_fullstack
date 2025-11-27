import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const { imageUrl, caption, location, authorId } = req.body;

    const newPost = await prisma.post.create({
      data: {
        imageUrl,
        caption,
        location,
        authorId
      }
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.log("POST Upload error:", err);
    res.status(500).json({ error: "Failed to upload post" });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true }
    });

    res.json(posts);
  } catch (err) {
    console.log("Fetch posts error:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

export default router;
