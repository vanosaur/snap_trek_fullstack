
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding test conversation...");
  try {
    const users = await prisma.user.findMany({ take: 2 });
    if (users.length < 2) {
      console.log("Need at least 2 users to seed chat.");
      return;
    }

    const [u1, u2] = users;
    console.log(`Creating chat between ${u1.email} and ${u2.email}`);

    // Create Conversation
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [{ id: u1.id }, { id: u2.id }]
        }
      }
    });

    // Create Messages
    await prisma.message.createMany({
      data: [
        { text: "Hey there! Ready for the trip?", senderId: u1.id, conversationId: conversation.id },
        { text: "Absolutely! Packing my bags now.", senderId: u2.id, conversationId: conversation.id },
        { text: "Don't forget the sunscreen! ☀️", senderId: u1.id, conversationId: conversation.id }
      ]
    });

    console.log("✅ Seeded test chat successfully!");
  } catch (err) {
    console.error("Seed Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
