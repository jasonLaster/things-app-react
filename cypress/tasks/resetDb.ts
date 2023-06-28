import { PrismaClient } from "@prisma/client";

export async function resetDatabase() {
  const prisma = new PrismaClient();

  try {
    await prisma.todo.deleteMany();
    // figure out later
    // await prisma.$executeRaw(Prisma.sql`ALTER SEQUENCE "Todo_id_seq" RESTART WITH 1`);
    console.log("Database reset successful.");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await prisma.$disconnect();
  }
  
}


export function resetDbTask() {
  return new Promise((resolve) => {
    resetDatabase()
      .then(() => {
        resolve(null);
      })
      .catch((error) => {
        console.error("Error resetting database:", error);
      });
  });
}