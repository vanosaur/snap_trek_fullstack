import express from "express";
import cors from "cors";

// Import all routes
import authRoutes from "./routes/authRoutes.js";
import reelRoutes from "./routes/reelRoutes.js";
import postUploadRoutes from "./routes/postUploadRoutes.js";
import postFeedRoutes from "./routes/postFeedRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// ✅ Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ Production-ready CORS
const allowedOrigins = [
  "https://snap-trek-fullstack.vercel.app",
  "http://localhost:3000"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      console.warn("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Consolidated Routes
app.use("/api/auth", authRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/post-upload", postUploadRoutes);
app.use("/api/postfeed", postFeedRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Verification Route (to confirm synchronization)
app.get("/api/v2/verify", (req, res) => {
  res.json({
    version: "2.0.1",
    timestamp: new Date().toISOString(),
    message: "✅ SUCCESS: You are hitting the NEW backend in /backend folder",
    routes: ["/api/reels", "/api/bookings", "/api/users"]
  });
});

// ✅ Diagnostic Route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 SnapTrek Backend Active",
    status: "READY",
    database: process.env.DATABASE_URL ? "CONFIGURED" : "MISSING",
    environment: process.env.NODE_ENV || "development"
  });
});

export default app;
