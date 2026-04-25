import prisma from "../lib/prisma.js";
import { fixBigInt } from "../utils/serialization.js";

// ----------------------------
// CREATE BOOKING
// ----------------------------
export const createBooking = async (req, res) => {
  console.log("POST /api/bookings - Body:", req.body);
  try {
    const { reelId, guests, bookingDate } = req.body;

    if (!reelId || !bookingDate) {
      return res.status(400).json({ message: "Missing required booking details (reelId, date)" });
    }

    // Defensive parsing
    const parsedGuests = parseInt(guests) || 1;
    
    if (isNaN(parsedGuests) || parsedGuests <= 0) {
       return res.status(400).json({ message: "Invalid guests count format" });
    }

    // Secure calculation
    const reel = await prisma.reel.findUnique({
      where: { id: BigInt(reelId) }
    });

    if (!reel) {
      return res.status(404).json({ message: "Reel not found for booking" });
    }

    const pricePerGuest = reel.price ? parseFloat(reel.price) : 0;
    const calculatedPrice = pricePerGuest * parsedGuests;

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        reelId: BigInt(reelId),
        guests: parsedGuests,
        bookingDate: new Date(bookingDate),
        totalPrice: calculatedPrice,
        status: "CONFIRMED",
      },
    });

    res.status(201).json(fixBigInt(booking));
  } catch (err) {
    console.error("Booking Creation Error:", err);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
};

// ----------------------------
// GET USER BOOKINGS
// ----------------------------
export const getUserBookings = async (req, res) => {
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
};

// ----------------------------
// DELETE BOOKING
// ----------------------------
export const deleteBooking = async (req, res) => {
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
};
