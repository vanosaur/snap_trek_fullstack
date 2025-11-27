import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true }
    });

    res.json(posts);
  } catch (err) {
    console.error("ERROR FETCHING POSTS:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

export default router;
