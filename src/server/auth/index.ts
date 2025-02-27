import NextAuth from "next-auth";
import { config } from "./config";

export const nextAuth = NextAuth(config);
