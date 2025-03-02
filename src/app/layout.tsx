import { TRPCClientProvider } from "@/trpc/client";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "./_components/composites/toaster";
import { SessionProvider } from "./_providers/session";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restaurant management",
  description: "Developed by Can Ngo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <TRPCClientProvider>
            <SessionProvider>{children}</SessionProvider>
            <Toaster />
          </TRPCClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
