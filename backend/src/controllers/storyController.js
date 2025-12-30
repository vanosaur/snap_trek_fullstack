import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// --- Create a new Story ---
export const createStory = async (req, res) => {
  const { imageUrl, caption } = req.body;
  const userId = req.user.id; // From protect middleware

  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    const newStory = await prisma.story.create({
      data: {
        imageUrl,
        userId: userId,
      },
    });
    res.status(201).json(newStory);
  } catch (err) {
    console.error("Error creating story:", err);
    res.status(500).json({ message: "Error creating story" });
  }
};

// --- Get all Active Stories (Last 24h) ---
export const getActiveStories = async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const stories = await prisma.story.findMany({
      where: {
        createdAt: {
          gte: since,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Group stories by User
    const groupedStories = stories.reduce((acc, story) => {
      const existingGroup = acc.find((group) => group.user.id === story.userId);

      if (existingGroup) {
        existingGroup.stories.push({
          id: story.id,
          imageUrl: story.imageUrl,
          createdAt: story.createdAt,
        });
      } else {
        acc.push({
          user: story.user,
          stories: [
            {
              id: story.id,
              imageUrl: story.imageUrl,
              createdAt: story.createdAt,
            },
          ],
        });
      }
      return acc;
    }, []);

    res.status(200).json(groupedStories);
  } catch (err) {
    console.error("Error fetching stories:", err);
    res.status(500).json({ message: "Error fetching stories" });
  }
};
