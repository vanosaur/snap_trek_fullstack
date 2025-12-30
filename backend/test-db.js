
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  console.log("Attempting to connect to database...");
  try {
    await prisma.$connect();
    console.log("✅ Successfully connected to the database!");
    
    const userCount = await prisma.user.count();
    console.log(`Current user count: ${userCount}`);

  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
