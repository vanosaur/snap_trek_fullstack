import express from "express";
import { getConversations, getMessages, sendMessage } from "../controllers/chatController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect); // All chat routes require authentication

router.get("/conversations", getConversations);
router.get("/messages/:conversationId", getMessages);
router.post("/messages", sendMessage);

export default router;
