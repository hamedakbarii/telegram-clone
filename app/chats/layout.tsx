// app/chats/layout.tsx
"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import ChatSidebar from "@/components/ChatSidebar";

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleUserClick = () => {
    setShowUserProfile(true);
    setIsMenuOpen(false);
  };
  
  const handleBackToChats = () => setShowUserProfile(false);

  // Handle smooth chat navigation
  const handleChatSelect = (chatId: string) => {
    if (pathname === `/chats/${chatId}`) return; // Already on this chat
    
    setIsTransitioning(true);
    
    // Add a small delay for the wink effect
    setTimeout(() => {
      router.push(`/chats/${chatId}`);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100); // Quick transition after route change
    }, 150);
  };

  // Handle back to main chats page
  const handleBackToChatList = () => {
    if (pathname === '/chats') return; // Already on main page
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      router.push('/chats');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 150);
  };

  return (
    <div className="flex h-screen text-black dark:text-white bg-[#FEFEFF] dark:bg-[#202021]">
      <ChatSidebar
        isMenuOpen={isMenuOpen}
        showUserProfile={showUserProfile}
        toggleMenu={toggleMenu}
        handleUserClick={handleUserClick}
        handleBackToChats={handleBackToChats}
        onChatSelect={handleChatSelect}
        onBackToChatList={handleBackToChatList}
        currentPath={pathname}
      />
      
      {/* Main content with transition effect */}
      <main 
        className={`flex-grow transition-opacity duration-150 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </main>
    </div>
  );
}