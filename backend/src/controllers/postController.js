import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// --- Create a new Post ---
export const createPost = async (req, res) => {
  // Get the data from the frontend
  const { imageUrl, caption, location, itinerary } = req.body;
  
  // Get the user ID from the `protect` middleware
  const userId = req.user.id;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        imageUrl,
        caption,
        location,
        itinerary, // This will be the JSON data
        authorId: userId, // Connect the post to the logged-in user
      },
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Error creating post" });
  }
};

// --- Get all Posts ---
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc", // Show newest posts first
      },
      include: {
        author: { // Include the author's info
          select: {
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// --- Delete a Post ---
export const deletePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.user.id; // From protect middleware

  try {
    // 1. Find the post
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    // 2. Check if post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 3. Check ownership
    // Ensure both are same type (int) just in case
    if (post.authorId !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    // 4. Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server error during deletion" });
  }
};