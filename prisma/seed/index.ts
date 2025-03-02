import { prisma } from "@/server/database";
import { seedRestaurants } from "./restaurant";
import { seedUsers } from "./user";

async function main() {
  await seedUsers();
  await seedRestaurants();
}

main()
  .then()
  .finally(async () => {
    await prisma.$disconnect();
  });
