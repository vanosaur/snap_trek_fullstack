
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
  console.log("Checking video_url for saved reels...");
  try {
    const users = await prisma.user.findMany({
      where: {
        savedReels: {
          some: {} 
        }
      },
      include: {
        savedReels: {
          include: { reel: true }
        }
      },
      take: 1
    });

    if (users.length > 0) {
      const saved = users[0].savedReels;
      saved.forEach((item, i) => {
         console.log(`Saved Reel ${i+1}: ID=${item.reel.id}`);
         console.log(`   Image: ${item.reel.image_url}`);
         console.log(`   Video: ${item.reel.video_url}`);
      });
    } else {
        console.log("No saved reels found.");
    }

  } catch (error) {
    console.error("❌ Fetch failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
