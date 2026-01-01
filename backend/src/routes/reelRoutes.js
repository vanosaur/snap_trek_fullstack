import express from "express";
import { PrismaClient } from "@prisma/client";
import { protect } from "../middlewares/authMiddleware.js";
import { fixBigInt } from "../utils/serialization.js";

const router = express.Router();
const prisma = new PrismaClient();

// ----------------------------
// GET reels
// ----------------------------
router.get("/", protect, async (req, res) => {
  try {
    const reels = await prisma.reel.findMany({
      orderBy: { id: "desc" },
      include: {
        author: true,
        _count: {
          select: { likes: true }
        }
      }
    });

    // Flatten _count.likes to likes property
    const reelsWithCounts = await Promise.all(reels.map(async reel => {
      let isFollowing = false;
      if (req.user && reel.authorId) {
        const follow = await prisma.follow.findUnique({
          where: {
            followerId_followingId: {
              followerId: req.user.id,
              followingId: reel.authorId
            }
          }
        });
        isFollowing = !!follow;
      }

      return {
        ...reel,
        likes: reel._count.likes,
        author: {
          ...reel.author,
          isFollowing
        }
      };
    }));

    const fixed = fixBigInt(reelsWithCounts);
    return res.json(fixed);
  } catch (err) {
    console.error("ERROR FETCHING REELS:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { 
      title, place, video_url, image_url, rating, seats, price, 
      duration, highlights, itinerary_days, stay 
    } = req.body;

    if (!video_url || !image_url) {
      return res.status(400).json({ error: "Video and Thumbnail URLs are required" });
    }

    const reelData = {
      title: title || null,
      place: place || null,
      video_url,
      image_url,
      rating: rating ? parseFloat(rating) : null,
      seats: seats ? parseInt(seats) : null,
      price: price ? parseInt(price) : null,
      duration: duration || null,
      highlights: highlights || null,
      itinerary_days: itinerary_days || null,
      stay: stay || null,
      authorId: req.user.id
    };

    const reel = await prisma.reel.create({
      data: reelData,
    });

    const fixed = fixBigInt(reel);
    return res.json(fixed);
  } catch (err) {
    console.error("ERROR CREATING REEL:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ----------------------------
// DELETE reel
// ----------------------------
router.delete("/:id", protect, async (req, res) => {
  try {
    const reelId = BigInt(req.params.id);
    const userId = req.user.id;

    // 1. Find the reel
    const reel = await prisma.reel.findUnique({
      where: { id: reelId },
    });

    // 2. Check if reel exists
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    // 3. Check ownership
    if (reel.authorId !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this reel" });
    }

    // 4. Delete the reel
    await prisma.reel.delete({
      where: { id: reelId },
    });

    res.json({ message: "Reel deleted successfully" });
  } catch (err) {
    console.error("Delete Reel Error:", err);
    res.status(500).json({ message: "Server error during deletion" });
  }
});

// ----------------------------
// TOGGLE LIKE
// ----------------------------
router.post("/:id/like", protect, async (req, res) => {
  try {
    const reelId = BigInt(req.params.id);
    const userId = req.user.id; // User ID from auth middleware

    // Check if already liked
    const existingLike = await prisma.reelLike.findUnique({
      where: {
        userId_reelId: {
          userId: userId,
          reelId: reelId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.reelLike.delete({
        where: {
          userId_reelId: {
            userId: userId,
            reelId: reelId,
          },
        },
      });
      return res.json({ message: "Unliked", liked: false });
    } else {
      // Like
      await prisma.reelLike.create({
        data: {
          userId: userId,
          reelId: reelId,
        },
      });
      return res.json({ message: "Liked", liked: true });
    }
  } catch (err) {
    console.error("Like Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------
// TOGGLE SAVE
// ----------------------------
router.post("/:id/save", protect, async (req, res) => {
  try {
    const reelId = BigInt(req.params.id);
    const userId = req.user.id;

    // Check if already saved
    const existingSave = await prisma.savedReel.findUnique({
      where: {
        userId_reelId: {
          userId: userId,
          reelId: reelId,
        },
      },
    });

    if (existingSave) {
      // Unsave
      await prisma.savedReel.delete({
        where: {
          userId_reelId: {
            userId: userId,
            reelId: reelId,
          },
        },
      });
      return res.json({ message: "Unsaved", saved: false });
    } else {
      // Save
      await prisma.savedReel.create({
        data: {
          userId: userId,
          reelId: reelId,
        },
      });
      return res.json({ message: "Saved", saved: true });
    }
  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
