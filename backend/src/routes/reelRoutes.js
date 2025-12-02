import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// FIX BIGINT IN ALL NESTED OBJECTS
function fixBigInt(obj) {
  if (Array.isArray(obj)) {
    return obj.map(fixBigInt);
  }
  if (obj !== null && typeof obj === "object") {
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
// GET reels
// ----------------------------
router.get("/", async (req, res) => {
  try {
    const reels = await prisma.reel.findMany({
      orderBy: { id: "desc" }
    });

    const fixed = fixBigInt(reels);
    return res.json(fixed); // ✅ FIXED — NO BIGINT ANYWHERE
  } catch (err) {
    console.error("ERROR FETCHING REELS:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ----------------------------
// POST reels
// ----------------------------
router.post("/", async (req, res) => {
  try {
    const reel = await prisma.reel.create({
      data: req.body,
    });

    const fixed = fixBigInt(reel);
    return res.json(fixed); // ✅ FIXED
  } catch (err) {
    console.error("ERROR CREATING REEL:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
