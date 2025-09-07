// Path: components/ChatList.tsx
"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import ChatItem from "./ChatItem";

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

interface ChatListProps {
  chats: SearchResult[];
  searchQuery?: string;
  onChatClick?: (chatId: number) => void;
}

export default function ChatList({
  chats,
  searchQuery,
  onChatClick,
}: ChatListProps) {
  const { setSelectedChat, markMessagesAsRead } = useChatStore();

  const handleChatClick = (chatId: number) => {
    // Update store when chat is selected
    setSelectedChat(chatId);
    markMessagesAsRead(chatId);

    // Call parent handler if provided
    if (onChatClick) {
      onChatClick(chatId);
    }
  };

  // Organize chats: Archived first, then pinned, then regular chats
  const organizedChats = React.useMemo(() => {
    if (searchQuery) {
      // If searching, maintain relevance order
      return chats;
    }

    // Separate into categories
    const archivedChats = chats.filter((chat) => chat.isArchive);
    const pinnedChats = chats.filter(
      (chat) => chat.isPinned && !chat.isArchive
    );
    const regularChats = chats.filter(
      (chat) => !chat.isPinned && !chat.isArchive
    );

    return [...archivedChats, ...pinnedChats, ...regularChats];
  }, [chats, searchQuery]);

  return (
    <div className="divide-y divide-transparent">
      {organizedChats.map((chat, index) => {
        // Check if we need to show section headers
        const showArchivedHeader =
          !searchQuery && index === 0 && chat.isArchive;

        const showPinnedHeader =
          !searchQuery &&
          organizedChats.findIndex((c) => c.isPinned && !c.isArchive) ===
            index &&
          organizedChats.some((c) => c.isPinned && !c.isArchive);

        const showRegularHeader =
          !searchQuery &&
          organizedChats.findIndex((c) => !c.isPinned && !c.isArchive) ===
            index &&
          organizedChats.some((c) => !c.isPinned && !c.isArchive);

        return (
          <div key={chat.id}>
            {/* Archived Chats Header */}
            {showArchivedHeader && (
              <div className="hidden px-4 py-2 text-xs text-gray-500 uppercase tracking-wide font-medium bg-[#0f0f0f]">
                Archived
              </div>
            )}

            {/* Pinned Chats Header */}
            {showPinnedHeader && (
              <div className="hidden px-4 py-2 text-xs text-gray-500 uppercase tracking-wide font-medium bg-[#0f0f0f] border-t border-gray-800">
                Pinned
              </div>
            )}

            {/* Regular Chats Header */}
            {showRegularHeader && (
              <div className="hidden px-4 py-2 text-xs text-gray-500 uppercase tracking-wide font-medium bg-[#0f0f0f] border-t border-gray-800">
                All Chats
              </div>
            )}

            <ChatItem
              chat={chat}
              searchQuery={searchQuery}
              onChatClick={handleChatClick}
            />
          </div>
        );
      })}

      {chats.length === 0 && !searchQuery && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="text-4xl mb-4">💬</div>
          <p className="text-lg font-medium mb-2">No chats yet</p>
          <p className="text-sm text-center px-8">
            Start a conversation to see your chats here
          </p>
        </div>
      )}
    </div>
  );
}
