// Path: components/ChatList.tsx
"use client";

import React from "react";
import ChatItem from "./ChatItem";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  isPinned: boolean;
  messageStatus: string;
  isArchive: boolean;
}

interface SearchResult extends Chat {
  matchType?: 'name' | 'message' | 'both';
  relevanceScore?: number;
}

interface ChatListProps {
  chats: SearchResult[];
  searchQuery?: string;
}

export default function ChatList({ chats, searchQuery }: ChatListProps) {
  return (
    <div className="divide-y divide-transparent">
      {chats.map((chat) => (
        <ChatItem 
          key={chat.id} 
          chat={chat} 
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}