import express from "express";
import { PrismaClient } from "@prisma/client";
import { protect } from "../middlewares/authMiddleware.js";
import { fixBigInt } from "../utils/serialization.js";

const router = express.Router();
const prisma = new PrismaClient();

// ----------------------------
// CREATE BOOKING
// ----------------------------
router.post("/", protect, async (req, res) => {
  console.log("POST /api/bookings - Body:", req.body);
  try {
    const { reelId, guests, bookingDate, totalPrice } = req.body;

    if (!reelId || !bookingDate) {
      return res.status(400).json({ message: "Missing required booking details (reelId, date)" });
    }

    // Defensive parsing
    const parsedGuests = parseInt(guests) || 1;
    const parsedPrice = parseFloat(totalPrice) || 0;
    
    if (isNaN(parsedGuests) || isNaN(parsedPrice)) {
       return res.status(400).json({ message: "Invalid guests or price format" });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        reelId: BigInt(reelId),
        guests: parsedGuests,
        bookingDate: new Date(bookingDate),
        totalPrice: parsedPrice,
        status: "CONFIRMED",
      },
    });

    res.status(201).json(fixBigInt(booking));
  } catch (err) {
    console.error("Booking Creation Error:", err);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
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

    res.json(fixBigInt(bookings));
  } catch (err) {
    console.error("Fetch Bookings Error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ----------------------------
// DELETE BOOKING
// ----------------------------
router.delete("/:id", protect, async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    const userId = req.user.id;

    // Find the booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check ownership
    if (booking.userId !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this booking" });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Delete Booking Error:", err);
    res.status(500).json({ message: "Failed to delete booking", error: err.message });
  }
});

export default router;
