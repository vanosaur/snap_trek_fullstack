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

// DELETE /api/posts/:id
router.delete("/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);

    // 1. (Optional) Check if post exists and belongs to user
    // For now, we just delete it directly
    await prisma.post.delete({
      where: { id: postId }
    });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default router;
