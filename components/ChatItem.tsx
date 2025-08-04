// Path: components/ChatItem.tsx
"use client";

import React from "react";
import { BiCheckDouble } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { TbPin } from "react-icons/tb";

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
  matchType?: "name" | "message" | "both";
  relevanceScore?: number;
}

interface ChatItemProps {
  chat: SearchResult;
  searchQuery?: string;
}

// Function to highlight matching text
const highlightText = (text: string, query: string): React.ReactElement => {
  if (!query || !query.trim()) {
    return <span>{text}</span>;
  }

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();
  const index = normalizedText.indexOf(normalizedQuery);

  if (index === -1) {
    return <span>{text}</span>;
  }

  const beforeMatch = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const afterMatch = text.slice(index + query.length);

  return (
    <span>
      {beforeMatch}
      <mark className="bg-yellow-200 dark:bg-yellow-600 text-black dark:text-white px-0.5 rounded">
        {match}
      </mark>
      {highlightText(afterMatch, query)}
    </span>
  );
};

export default function ChatItem({ chat, searchQuery }: ChatItemProps) {
  return (
    <div className="border-b border-transparent">
      <button className="w-full p-3 flex items-center gap-3 hover:bg-[#151515] dark:hover:bg-[#151515] transition-colors cursor-pointer">
        <div className="relative">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {chat.isOnline === true && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
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
            <div className="flex mr-0.5">
              <span className="flex items-center text-xs text-gray-100 whitespace-nowrap">
                {chat.messageStatus === "read" && (
                  <BiCheckDouble fontSize={20} />
                )}
                {chat.messageStatus === "succeeded" && <FaCheck />}
                <p
                  className={`${chat.messageStatus === "succeeded" && "ml-1"}`}
                >
                  {chat.isArchive ? null : chat.lastMessageTime}
                </p>
              </span>
            </div>
          </div>

          <div className="flex justify-start items-center min-w-0">
            <p
              className={`text-sm text-gray-500 truncate text-left grow pr-1 ${
                chat.isArchive && "font-bold"
              }`}
            >
              {searchQuery
                ? highlightText(chat.lastMessage, searchQuery)
                : chat.lastMessage}
            </p>
            {chat.unreadCount > 0 && (
              <span
                className={`text-xs rounded-full w-5 h-5 flex items-center justify-center p-3 ${
                  chat.isArchive ? "bg-gray-600 p-3.5" : "bg-blue-500 p-2"
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
