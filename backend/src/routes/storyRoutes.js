import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

// 1. Upload a story
router.post("/story", async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;

    const story = await prisma.story.create({
      data: {
        userId: Number(userId),
        imageUrl
      }
    });

    res.json({ success: true, story });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to upload story" });
  }
});

// 2. Get active stories (Corrected Route & Structure)
// Note: We changed "/stories" to "/stories/active" to match your frontend
router.get("/stories/active", async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Fetch raw stories from DB
    const stories = await prisma.story.findMany({
      where: {
        createdAt: {
          gte: since
        }
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // --- NEW: Group stories by User ---
    // The frontend expects: [{ user: {...}, stories: [...] }, ...]
    const groupedStories = stories.reduce((acc, story) => {
      const existingGroup = acc.find(group => group.user.id === story.userId);
      
      if (existingGroup) {
        existingGroup.stories.push(story);
      } else {
        acc.push({
          user: story.user,
          stories: [story]
        });
      }
      return acc;
    }, []);

    res.json(groupedStories);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching stories" });
  }
});

export default router;