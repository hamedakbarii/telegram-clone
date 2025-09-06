// Path: components/ChatSidebar.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { chats } from "@/lib/mocks/chat";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineMenu } from "react-icons/md";
import SearchInput from "./SearchInput";
import DropdownMenu from "./DropdownMenu";
import UserProfile from "./UserProfile";
import ChatList from "./ChatList";
import ContactList from "./ContactList";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean | null;
  isPinned: boolean | null;
  messageStatus: string | null;
  isArchive?: boolean;
}

interface SearchResult extends Chat {
  matchType: "name" | "message" | "both";
  relevanceScore: number;
}

interface ChatSidebarProps {
  isMenuOpen: boolean;
  showUserProfile: boolean;
  toggleMenu: () => void;
  handleUserClick: () => void;
  handleBackToChats: () => void;
  onChatSelect?: (chatId: string) => void;
  onBackToChatList?: () => void;
  currentPath?: string;
}

// Simple search function (you can replace this with the advanced one from searchUtils.ts)
const searchChats = (chats: Chat[], query: string): SearchResult[] => {
  if (!query.trim()) {
    return chats.map((chat) => ({
      ...chat,
      matchType: "name" as const,
      relevanceScore: 0,
    }));
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results = [];

  for (const chat of chats) {
    const nameMatch = chat.name.toLowerCase().includes(normalizedQuery);
    const messageMatch = chat.lastMessage
      .toLowerCase()
      .includes(normalizedQuery);

    if (nameMatch || messageMatch) {
      let matchType: "name" | "message" | "both" = "message";
      let relevanceScore = 0;

      if (nameMatch && messageMatch) {
        matchType = "both";
        relevanceScore = 100;
      } else if (nameMatch) {
        matchType = "name";
        relevanceScore = 80;
      } else {
        matchType = "message";
        relevanceScore = 60;
      }

      // Boost pinned chats
      if (chat.isPinned) relevanceScore += 10;
      if (chat.unreadCount > 0) relevanceScore += 5;

      results.push({
        ...chat,
        matchType,
        relevanceScore,
      });
    }
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

export default function ChatSidebar({
  isMenuOpen,
  showUserProfile,
  toggleMenu,
  handleUserClick,
  handleBackToChats,
  onChatSelect,
}: // onBackToChatList,
// currentPath = '/chats'
ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showContacts, setShowContacts] = useState(false); // Added state for contacts
  const [isMobile, setIsMobile] = useState(false);

  // Filter chats based on search query with enhanced search
  const filteredChats = useMemo(() => {
    return searchChats(chats, searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle chat click for navigation
  const handleChatClick = (chatId: number) => {
    if (onChatSelect) {
      onChatSelect(chatId.toString());
    }
  };

  // Handle contact click
  const handleContactClick = () => {
    setShowContacts(true);
    toggleMenu(); // Close the dropdown menu
  };

  // Handle back from contacts
  const handleBackFromContacts = () => {
    setShowContacts(false);
  };

  // Determine which view to show
  const getCurrentView = () => {
    if (showContacts) {
      return <ContactList onBackToChats={handleBackFromContacts} />;
    } else if (showUserProfile) {
      return <UserProfile />;
    } else {
      // Default chat list view
      return (
        <>
          {/* Search Results Info */}
          {searchQuery && (
            <div className="p-3 border-b border-[#2d2d2d] bg-[#1a1a1a]">
              <p className="text-sm text-gray-400">
                {filteredChats.length > 0
                  ? `Found ${filteredChats.length} chat${
                      filteredChats.length !== 1 ? "s" : ""
                    }`
                  : "No chats found"}
              </p>
            </div>
          )}

          {/* Chat List */}
          {filteredChats.length > 0 ? (
            <ChatList
              chats={filteredChats}
              searchQuery={searchQuery}
              onChatClick={handleChatClick}
            />
          ) : searchQuery ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-lg font-medium mb-2">No chats found</p>
              <p className="text-sm text-center px-8">
                Try searching for a different name or message
              </p>
            </div>
          ) : (
            <ChatList
              chats={chats.map((chat) => ({
                ...chat,
                matchType: "name" as const,
                relevanceScore: 0,
              }))}
              onChatClick={handleChatClick}
            />
          )}
        </>
      );
    }
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // If showing contacts, return the contact view directly
  if (showContacts) {
    return <ContactList onBackToChats={handleBackFromContacts} />;
  }

  return (
    <div
      className={`${
        isMobile ? "w-full" : "w-96"
      } border-r border-transparent flex flex-col`}
    >
      {/* Header */}
      <div className="p-3 border-b border-transparent flex items-center gap-2">
        {/* Back button for user profile or Menu button */}
        <div className="relative">
          {showUserProfile ? (
            <button
              onClick={handleBackToChats}
              className="p-2 rounded-full hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer"
            >
              <FiArrowLeft size={20} />
            </button>
          ) : (
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer"
            >
              <MdOutlineMenu size={20} />
            </button>
          )}

          <DropdownMenu
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            handleUserClick={handleUserClick}
            handleSettingClick={handleUserClick}
            handleContactClick={handleContactClick} // Pass the contact handler
          />
        </div>

        <SearchInput
          onSearch={handleSearch}
          placeholder={showUserProfile ? "Search settings" : "Search chats"}
        />
      </div>

      {/* Dynamic content area */}
      <div className="flex-1 overflow-y-auto">{getCurrentView()}</div>
    </div>
  );
}
