'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import '@mantine/core/styles.css'; // Import global Mantine styles
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Telegram Clone',
  description: 'Chat UI project with Mantine and Next.js',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  return (
    <html lang="en">
      <head>
        {/* Sets color scheme for dark/light toggle */}
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: 'blue',
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
