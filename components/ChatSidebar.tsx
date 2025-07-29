// Path: components/ChatSidebar.tsx
"use client";

import React from "react";
import { chats } from "@/lib/mocks/chat";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineMenu } from "react-icons/md";
import SearchInput from "./SearchInput";
import DropdownMenu from "./DropdownMenu";
import UserProfile from "./UserProfile";
import ChatList from "./ChatList";

interface ChatSidebarProps {
  isMenuOpen: boolean;
  showUserProfile: boolean;
  toggleMenu: () => void;
  handleUserClick: () => void;
  handleBackToChats: () => void;
}

export default function ChatSidebar({
  isMenuOpen,
  showUserProfile,
  toggleMenu,
  handleUserClick,
  handleBackToChats,
}: ChatSidebarProps) {
  return (
    <div className="w-96 border-r border-transparent flex flex-col">
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
          />
        </div>

        <SearchInput />
      </div>

      {/* Dynamic content area */}
      <div className="flex-1 overflow-y-auto">
        {showUserProfile ? (
          <UserProfile />
        ) : (
          <ChatList chats={chats} />
        )}
      </div>
    </div>
  );
}