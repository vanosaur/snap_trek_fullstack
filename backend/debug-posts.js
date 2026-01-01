
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  console.log("Attempting to fetch posts...");
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      // take: 5 removed to fetch all
    });
    console.log("✅ Successfully fetched posts!");
    console.log(JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("❌ Fetch failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
