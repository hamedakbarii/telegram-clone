// Path: components/ChatItem.tsx
"use client";

import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { IoMdPin } from "react-icons/io";
import { getInitials, getAvatarColor } from "@/lib/utils/avatarUtils";
import { TbPin } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { BiCheckDouble } from "react-icons/bi";

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
  lastMessageTimestamp?: Date;
}

interface SearchResult extends Chat {
  matchType?: "name" | "message" | "both";
  relevanceScore?: number;
}

interface ChatItemProps {
  chat: SearchResult;
  searchQuery?: string;
  onChatClick?: (chatId: number) => void;
}

export default function ChatItem({
  chat,
  searchQuery,
  onChatClick,
}: ChatItemProps) {
  // Check if avatar is valid (not empty or incomplete URL)
  const hasValidAvatar = (avatarUrl: string) => {
    return avatarUrl &&
      avatarUrl !== "" &&
      avatarUrl !== "http://localhost:3000/assets/avatar/" &&
      !avatarUrl.endsWith("assets/avatar/");
  };

  const handleClick = () => {
    // Show alert for archived chats
    if (chat.id === 0) {
      alert("Sorry! Archived chats are not available yet.");
      return;
    }

    if (onChatClick) {
      onChatClick(chat.id);
    }
  };

  // Highlight search matches
  const highlightText = (text: string, query?: string) => {
    if (!query?.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="border-b border-transparent">
      <button
        className="w-full p-3 flex items-center gap-3 hover:bg-[#151515] dark:hover:bg-[#151515] transition-colors cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative flex-shrink-0">
          {/* Avatar with fallback to initials */}
          {hasValidAvatar(chat.avatar) ? (
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              {/* Hidden fallback - will be shown if image fails */}
              <div
                className={`w-12 h-12 rounded-full hidden items-center justify-center text-white font-semibold absolute top-0 left-0 ${getAvatarColor(
                  chat.name
                )}`}
              >
                {getInitials(chat.name)}
              </div>
            </div>
          ) : (
            // Show initials directly for chats without valid avatars
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                chat.name
              )}`}
            >
              {getInitials(chat.name)}
            </div>
          )}

          {/* Online indicator */}
          {chat.isOnline && (
            <div className="absolute -bottom-0 -right-0 w-4 h-4 bg-green-500 border-2 border-[#1a1a1a] rounded-full"></div>
          )}
        </div>

        <div className="flex-1 min-w-0 text-left">
          <div className="flex justify-start items-center min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-medium truncate">
                {searchQuery
                  ? highlightText(chat.name, searchQuery)
                  : chat.name}
              </h3>
            </div>
            <div className="grow min-w-2"></div>
          </div>

          <div className="flex justify-start items-center min-w-0">
            <p
              className={`text-sm text-gray-500 truncate text-left grow pr-1 ${chat.isArchive && "font-bold"
                }`}
            >
              {searchQuery
                ? highlightText(chat.lastMessage, searchQuery)
                : chat.lastMessage}
            </p>
            {chat.unreadCount > 0 && (
              <span
                className={`text-xs rounded-full w-5 h-5 flex items-center justify-center p-3 ${chat.isArchive ? "bg-gray-600 p-3.5" : "bg-blue-500 p-2"
                  }`}
              >
                {chat.unreadCount}
              </span>
            )}
            {chat.isPinned && (
              <TbPin size={20} className="text-gray-500 ml-0.5" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}