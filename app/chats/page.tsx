// Path: app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import ChatSidebar from "@/components/ChatSidebar";
import MainContent from "@/components/MainContent";

export default function ChatListPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = useStore((state) => state.user);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleUserClick = () => {
    setShowUserProfile(true);
    setIsMenuOpen(false);
  };

  const handleBackToChats = () => setShowUserProfile(false);

  useEffect(() => {
    // Check if user is authenticated using the Zustand store
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FEFEFF] dark:bg-[#202021]">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen text-black dark:text-white bg-[#FEFEFF] dark:bg-[#202021]">
      <ChatSidebar
        isMenuOpen={isMenuOpen}
        showUserProfile={showUserProfile}
        toggleMenu={toggleMenu}
        handleUserClick={handleUserClick}
        handleBackToChats={handleBackToChats}
      />
      <MainContent showUserProfile={showUserProfile} />
    </div>
  );
}
