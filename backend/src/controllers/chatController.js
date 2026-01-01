import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all conversations for the logged-in user
export const getConversations = async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { id: req.user.id }
        }
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true
          }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(conversations);
  } catch (err) {
    console.error("Get Conversations Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get messages for a specific conversation
export const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId: parseInt(conversationId) },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true }
        }
      }
    });

    res.json(messages);
  } catch (err) {
    console.error("Get Messages Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Send a message (creates conversation if it doesn't exist)
export const sendMessage = async (req, res) => {
  const { text, receiverId, conversationId } = req.body;
  const senderId = req.user.id;

  try {
    let targetConversationId = conversationId;

    // 1. If no conversationId, check if one exists between these two users
    if (!targetConversationId && receiverId) {
      const existing = await prisma.conversation.findFirst({
        where: {
          AND: [
            { participants: { some: { id: senderId } } },
            { participants: { some: { id: parseInt(receiverId) } } }
          ]
        }
      });

      if (existing) {
        targetConversationId = existing.id;
      } else {
        // Create new conversation
        const newConversation = await prisma.conversation.create({
          data: {
            participants: {
              connect: [
                { id: senderId },
                { id: parseInt(receiverId) }
              ]
            }
          }
        });
        targetConversationId = newConversation.id;
      }
    }

    if (!targetConversationId) {
      return res.status(400).json({ message: "Conversation not found or receiver not specified" });
    }

    // 2. Create the message
    const message = await prisma.message.create({
      data: {
        text,
        senderId,
        conversationId: parseInt(targetConversationId)
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true }
        }
      }
    });

    // 3. Update conversation's updatedAt
    await prisma.conversation.update({
      where: { id: parseInt(targetConversationId) },
      data: { updatedAt: new Date() }
    });

    res.status(201).json(message);
  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
