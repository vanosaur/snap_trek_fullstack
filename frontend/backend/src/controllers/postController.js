import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// --- Create a new Post ---
export const createPost = async (req, res) => {
  // Get the data from the frontend
  const { imageUrl, caption, location, itinerary } = req.body;
  
  // Get the user ID from the `protect` middleware
  const userId = req.user.id;

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