import prisma from "../lib/prisma.js";
import { fixBigInt } from "../utils/serialization.js";

// ----------------------------
// GET reels with filtering support
// ----------------------------
export const getReels = async (req, res) => {
  try {
    const { place, maxPrice, minRating, duration, cursor, limit = 5 } = req.query;

    const whereClause = {};
    if (place) {
      whereClause.place = { contains: place, mode: 'insensitive' };
    }
    if (maxPrice) {
      whereClause.price = { lte: parseInt(maxPrice) };
    }
    if (minRating) {
      whereClause.rating = { gte: parseFloat(minRating) };
    }
    if (duration) {
      whereClause.duration = { contains: duration, mode: 'insensitive' };
    }

    const queryOptions = {
      where: whereClause,
      take: parseInt(limit),
      orderBy: { id: "desc" },
      include: {
        author: true,
        _count: {
          select: { likes: true }
        }
      }
    };

    // If cursor is provided, use it for pagination
    if (cursor) {
      queryOptions.cursor = { id: BigInt(cursor) };
      queryOptions.skip = 1; // Skip the cursor element itself
    }

    const reels = await prisma.reel.findMany(queryOptions);

    // Flatten _count.likes to likes property and add isLiked/isSaved status
    const reelsWithCounts = await Promise.all(reels.map(async reel => {
      let isFollowing = false;
      let isLiked = false;
      let isSaved = false;

      if (req.user) {
        // Check if user follows the author
        if (reel.authorId) {
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

        // Check if user liked this reel
        const like = await prisma.reelLike.findUnique({
          where: {
            userId_reelId: {
              userId: req.user.id,
              reelId: reel.id
            }
          }
        });
        isLiked = !!like;

        // Check if user saved this reel
        const saved = await prisma.savedReel.findUnique({
          where: {
            userId_reelId: {
              userId: req.user.id,
              reelId: reel.id
            }
          }
        });
        isSaved = !!saved;
      }

      return {
        ...reel,
        likes: reel._count.likes,
        liked: isLiked,
        saved: isSaved,
        author: {
          ...reel.author,
          isFollowing
        }
      };
    }));

    const lastReel = reels[reels.length - 1];
    const nextCursor = reels.length === parseInt(limit) ? lastReel?.id.toString() : null;

    const fixed = fixBigInt(reelsWithCounts);
    return res.json({
      reels: fixed,
      nextCursor
    });
  } catch (err) {
    console.error("ERROR FETCHING REELS:", err);
    return res.status(500).json({ error: err.message });
  }
};

// ----------------------------
// CREATE reel
// ----------------------------
export const createReel = async (req, res) => {
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
};


// ----------------------------
// DELETE reel
// ----------------------------
export const deleteReel = async (req, res) => {
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
};

// ----------------------------
// TOGGLE LIKE
// ----------------------------
export const toggleLike = async (req, res) => {
  try {
    const reelId = BigInt(req.params.id);
    const userId = req.user.id;

    const existingLike = await prisma.reelLike.findUnique({
      where: {
        userId_reelId: {
          userId: userId,
          reelId: reelId,
        },
      },
    });

    if (existingLike) {
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
};

// ----------------------------
// TOGGLE SAVE
// ----------------------------
export const toggleSave = async (req, res) => {
  try {
    const reelId = BigInt(req.params.id);
    const userId = req.user.id;

    const existingSave = await prisma.savedReel.findUnique({
      where: {
        userId_reelId: {
          userId: userId,
          reelId: reelId,
        },
      },
    });

    if (existingSave) {
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
};

// ----------------------------
// DELETE SAVED REEL (Unsave)
// ----------------------------
export const unsaveReel = async (req, res) => {
  try {
    const reelId = BigInt(req.params.id);
    const userId = req.user.id;

    const existingSave = await prisma.savedReel.findUnique({
      where: {
        userId_reelId: {
          userId: userId,
          reelId: reelId,
        },
      },
    });

    if (!existingSave) {
      return res.status(404).json({ message: "Reel not saved" });
    }

    await prisma.savedReel.delete({
      where: {
        userId_reelId: {
          userId: userId,
          reelId: reelId,
        },
      },
    });

    res.json({ message: "Reel unsaved successfully" });
  } catch (err) {
    console.error("Unsave Reel Error:", err);
    res.status(500).json({ message: "Failed to unsave reel", error: err.message });
  }
};
