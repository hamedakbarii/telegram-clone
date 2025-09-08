// app/layout.tsx
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import BodyWrapper from "@/components/BodyWrapper";

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Telegram Web Clone",
  description: "A modern Telegram web clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body suppressHydrationWarning={true}>
        <BodyWrapper className={`${vazirmatn.variable} antialiased bg-white text-black font-vazirmatn`}>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </BodyWrapper>
      </body>
    </html>
  );
}