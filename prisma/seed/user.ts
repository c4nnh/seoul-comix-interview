import { prisma } from "@/server/database";
import { hashPassword } from "@/server/utils/user";
import users from "./data/user.json";

export async function seedUsers() {
  console.log("Inserting users...");

  const response = await prisma.user.createMany({
    data: users.map(({ name, username, password }) => ({
      name,
      username,
      password: hashPassword(password),
    })),
    skipDuplicates: true,
  });

  console.log(`Inserted ${response.count}.`);
}
