import { TRPCClientProvider } from "@/trpc/client";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "./_components/composites/toaster";
import { AppLayout } from "./_layouts/app";
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
  title: "Your restaurants",
  description: "Find your favorite restaurants",
  creator: "Can Ngo",
  icons: [{ rel: "icon", url: "/logo.svg" }],
  openGraph: {
    title: "Your restaurants",
    description: "Find your favorite restaurants",
    images: "/logo.svg",
  },
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
            <SessionProvider>
              <AppLayout>{children}</AppLayout>
            </SessionProvider>
            <Toaster />
          </TRPCClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
