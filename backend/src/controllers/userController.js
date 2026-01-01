
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Toggle follow/unfollow
export const toggleFollow = async (req, res) => {
  console.log(`POST /api/users/${req.params.id}/follow - User:`, req.user.id);
  try {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.id);
    console.log(`Backend toggleFollow: ${followerId} -> ${followingId}`);

    if (followerId === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: { id: existingFollow.id }
      });
      return res.json({ followed: false, message: "Unfollowed successfully" });
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId,
          followingId
        }
      });
      return res.json({ followed: true, message: "Followed successfully" });
    }
  } catch (err) {
    console.error("Toggle Follow Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile by ID (including real counts)
export const getUserProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const viewerId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
        reels: { orderBy: { id: "desc" } },
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true
          }
        }
      }
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    let isFollowing = false;
    if (viewerId) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: viewerId,
            followingId: userId
          }
        }
      });
      isFollowing = !!follow;
    }

    res.json({
      ...user,
      isFollowing,
      followersCount: user._count.followers,
      followingCount: user._count.following
    });
  } catch (err) {
    console.error("Get User Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get followers list
export const getFollowers = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const follows = await prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: { id: true, name: true, username: true, avatar: true }
        }
      }
    });
    res.json(follows.map(f => f.follower));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get following list
export const getFollowing = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const follows = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: { id: true, name: true, username: true, avatar: true }
        }
      }
    });
    res.json(follows.map(f => f.following));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
