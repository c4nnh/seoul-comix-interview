import { env } from "@/env";
import { logger } from "@/utils/logger";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../database";
import { hashPassword } from "../utils/user";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
    } & DefaultSession["user"];
  }
}

export const config: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "username-password-credentials",
      name: "Username password credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        logger.info("Login", { username: credentials?.username });

        if (!credentials?.username || !credentials.password) {
          logger.error("Missing credentials");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          logger.error("Incorrect username");
          return null;
        }

        const hashedPassword = hashPassword(credentials.password);
        if (user.password !== hashedPassword) {
          logger.error("Incorrect password");
          return null;
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
};
