import express from "express";
import { PrismaClient } from "@prisma/client";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

// Helper to fix BigInt serialization
function fixBigInt(obj) {
  if (Array.isArray(obj)) {
    return obj.map(fixBigInt);
  }
  if (obj !== null && typeof obj === "object") {
    // Check if it's a BigInt directly
    if (typeof obj === "bigint") return obj.toString();
    
    // Check if it's a Date
    if (obj instanceof Date) return obj.toISOString();

    const fixed = {};
    for (let key in obj) {
      const value = obj[key];
      fixed[key] = typeof value === "bigint" ? value.toString() : fixBigInt(value);
    }
    return fixed;
  }
  return obj;
}

// ----------------------------
// CREATE BOOKING
// ----------------------------
router.post("/", protect, async (req, res) => {
  try {
    const { reelId, guests, bookingDate, totalPrice } = req.body;

    if (!reelId || !bookingDate || !guests || !bookingDate) {
      return res.status(400).json({ message: "Missing required booking details" });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        reelId: BigInt(reelId),
        guests: parseInt(guests),
        bookingDate: new Date(bookingDate),
        totalPrice: parseFloat(totalPrice),
        status: "CONFIRMED",
      },
    });

    const fixed = fixBigInt(booking);
    res.status(201).json(fixed);
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Failed to create booking" });
  }
});

// ----------------------------
// GET USER BOOKINGS
// ----------------------------
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: {
        reel: true, // Include Reel details
      },
      orderBy: { createdAt: "desc" },
    });

    const fixed = fixBigInt(bookings);
    res.json(fixed);
  } catch (err) {
    console.error("Fetch Bookings Error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

export default router;
