import express from "express";
import { generateItinerary, aiSearch } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only authenticated users can use the AI generator (to prevent API abuse)
router.post("/generate-itinerary", protect, generateItinerary);
router.post("/search", protect, aiSearch);

export default router;
