import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fixBigInt } from "../utils/serialization.js";

dotenv.config();
const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  const { name, username, bio, avatar } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name,
        username,
        bio,
        avatar,
      },
    });

    // Return the updated user (similar structure to profile endpoint)
    res.json({
      ...updatedUser,
      posts: [], // Or fetch posts if needed, but usually redundant for an update response
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: "Could not update profile" });
  }
};

// fixBigInt helper removed as it's now centralized in src/utils/serialization.js

export const profile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        posts: {
          orderBy: { createdAt: "desc" },
        },
        reels: {
          orderBy: { id: "desc" },
        },
        savedReels: {
          include: { reel: true },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true
          }
        },
        reelLikes: true, // Fetch likes to know what I liked
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use REAL data now (fallbacks only if fields are empty)
    const enhancedUser = {
      ...user,
      username: user.username || user.email.split("@")[0],
      avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=0D9488&color=fff`,
      bio: user.bio || "",
      followers: user._count.followers,
      following: user._count.following,
    };

    res.json(fixBigInt(enhancedUser));
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
