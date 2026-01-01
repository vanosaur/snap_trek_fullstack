
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { name: { contains: "Vani" } },
    include: {
      _count: {
        select: { followers: true, following: true, reels: true }
      }
    }
  });

  console.log("USERS FOUND:");
  for (const u of users) {
    const followersInDb = await prisma.follow.count({ where: { followingId: u.id } });
    const followingInDb = await prisma.follow.count({ where: { followerId: u.id } });
    
    console.log(`ID: ${u.id}, Name: ${u.name}, Username: ${u.username}`);
    console.log(`Prisma Count - Followers: ${u._count.followers}, Following: ${u._count.following}, Reels: ${u._count.reels}`);
    console.log(`Raw Count - Followers: ${followersInDb}, Following: ${followingInDb}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
