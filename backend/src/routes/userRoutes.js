import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Find the user AND their posts
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' } // Newest posts first
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;