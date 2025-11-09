import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "https://snap-trek-fullstack.vercel.app"],
  credentials: true,
}));
app.use(express.json());

// ✅ This line matters
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running");
});
