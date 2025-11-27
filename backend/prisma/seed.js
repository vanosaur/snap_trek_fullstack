import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import reelsData from "./reelsData.js"; // we will create this file next

async function main() {
  console.log("🌱 Seeding reels...");

  for (const reel of reelsData) {
    await prisma.reel.create({
      data: {
        title: reel.title,
        place: reel.place,
        video_url: reel.video,
        image_url: reel.image,
        rating: reel.rating,
        seats: reel.seats,
        price: reel.price,
        duration: reel.duration,
        highlights: reel.highlights,
        itinerary_days: reel.itineraryDays || reel.itinerary_days,
        stay: reel.stay
      }
    });
  }

  console.log("✅ All reels inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
