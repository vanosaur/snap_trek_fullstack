import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ----------------------------
// GET all reels
// ----------------------------
router.get("/", async (req, res) => {
  try {
    const reels = await prisma.reel.findMany({
      orderBy: { id: "desc" }
    });
    res.json(reels);
  } catch (err) {
    console.error("ERROR FETCHING REELS:", err);
    res.status(500).json({ error: "Failed to fetch reels" });
  }
});

// ----------------------------
// POST create a new reel
// ----------------------------
router.post("/", async (req, res) => {
  try {
    const reel = await prisma.reel.create({
      data: {
        title: req.body.title,
        place: req.body.place,
        video_url: req.body.video_url,
        image_url: req.body.image_url,
        rating: req.body.rating,
        seats: req.body.seats,
        price: req.body.price,
        duration: req.body.duration,
        highlights: req.body.highlights,
        itinerary_days: req.body.itinerary_days,
        stay: req.body.stay
      }
    });

    res.json(reel);
  } catch (err) {
    console.error("ERROR CREATING REEL:", err);
    res.status(500).json({ error: "Failed to create reel" });
  }
});

export default router;
