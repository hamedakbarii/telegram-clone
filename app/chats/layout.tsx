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
  const [isMobile, setIsMobile] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on a specific chat page
  const isOnChatPage = pathname.startsWith('/chats/') && pathname !== '/chats';
  const isOnMainChatList = pathname === '/chats';

  // Handle window resize for responsive design
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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

  // Determine sidebar visibility based on screen size and current page
  const shouldShowSidebar = () => {
    if (!isMobile) {
      // Desktop: always show sidebar
      return true;
    } else {
      // Mobile: show sidebar only on main chat list page
      return isOnMainChatList;
    }
  };

  return (
    <div className="flex h-screen text-black dark:text-white bg-[#FEFEFF] dark:bg-[#202021]">
      {/* ChatSidebar - conditionally rendered based on responsive logic */}
      <div className={`${shouldShowSidebar() ? 'block' : 'hidden'} ${isMobile ? 'w-full' : 'w-96'}`}>
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
      </div>
      
      {/* Main content with transition effect */}
      <main 
        className={`transition-opacity duration-150 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        } ${
          // On mobile, when showing sidebar, hide main content
          // On desktop, always show main content alongside sidebar
          isMobile 
            ? (shouldShowSidebar() ? 'hidden' : 'flex-grow w-full')
            : 'flex-grow'
        }`}
      >
        {children}
      </main>
    </div>
  );
}