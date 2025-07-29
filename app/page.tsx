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

  const user = useStore((state) => state.user);
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("login");
  //   }
  // }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleUserClick = () => {
    setShowUserProfile(true);
    setIsMenuOpen(false);
  };
  
  const handleBackToChats = () => setShowUserProfile(false);

  return (
    <div className="flex h-screen text-black dark:text-white bg-[#FEFEFF] dark:bg-[#202021]">
      <ChatSidebar
        isMenuOpen={isMenuOpen}
        showUserProfile={showUserProfile}
        toggleMenu={toggleMenu}
        handleUserClick={handleUserClick}
        handleBackToChats={handleBackToChats}
      />
      <MainContent />
      {/* <MainContent showUserProfile={showUserProfile} /> */}
    </div>
  );
}