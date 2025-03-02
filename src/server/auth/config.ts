import { env } from "@/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Logger } from "@logtail/next";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
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
        const logger = new Logger();
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
    session: async ({ session, user: sessionUser, token }) => {
      const userId = (token?.id ||
        sessionUser?.id ||
        session.user?.id) as string;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          username: true,
        },
      });

      return {
        ...session,
        user: {
          ...session.user,
          ...sessionUser,
          ...user,
          id: userId,
        },
      };
    },
    jwt: ({ token, user }) => {
      return { ...token, ...user };
    },
  },
};

export const getServerAuthSession = () => getServerSession(config);
