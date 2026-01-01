
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

function fixBigInt(obj) {
  if (Array.isArray(obj)) {
    return obj.map(fixBigInt);
  }
  if (obj !== null && typeof obj === "object") {
    const fixed = {};
    for (let key in obj) {
      const value = obj[key];
      fixed[key] = typeof value === "bigint" ? value.toString() : fixBigInt(value);
    }
    return fixed;
  }
  return obj;
}

async function main() {
  console.log("Attempting to fetch users with saved reels...");
  try {
    const users = await prisma.user.findMany({
      where: {
        savedReels: {
          some: {} // Users who have at least one saved reel
        }
      },
      include: {
        savedReels: {
          include: { reel: true }
        }
      },
      take: 1
    });

    if (users.length === 0) {
      console.log("No users found with saved reels.");
      return;
    }

    const user = users[0];
    console.log(`✅ User found: ${user.email}`);
    console.log("Saved Reels Data:");
    console.log(JSON.stringify(fixBigInt(user.savedReels), null, 2));

  } catch (error) {
    console.error("❌ Fetch failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
