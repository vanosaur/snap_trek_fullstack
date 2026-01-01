import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import reelRoutes from "./routes/reelRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();


// ✅ Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/chat", chatRoutes);


// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Backend running successfully on port 4000 (CORS active)");
});

export default app;
