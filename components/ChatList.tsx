// Path: components/ChatList.tsx
"use client";

import React from "react";
import { TbPin } from "react-icons/tb";
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
}

interface ChatListProps {
  chats: Chat[];
}

export default function ChatList({ chats }: ChatListProps) {
  return (
    <>
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </>
  );
}