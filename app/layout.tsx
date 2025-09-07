// Path: app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Telegram Clone",
  description: "Chat UI project with Mantine and Next.js",
  icons: { icon: "/assets/avatar/telegram.jpg", },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      {/* Remove dark:bg-gray-900 dark:text-white here */}
      <body className={`${vazirmatn.variable} antialiased bg-white text-black font-vazirmatn`} >
        {children}
      </body>
    </html>
  );
}