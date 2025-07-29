// Path: components/ChatItem.tsx
"use client";

import React from "react";
import { TbPin } from "react-icons/tb";

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

interface ChatItemProps {
  chat: Chat;
}

export default function ChatItem({ chat }: ChatItemProps) {
  return (
    <div className="border-b border-transparent">
      <button className="w-full p-3 flex items-center gap-3 hover:bg-[#151515] dark:hover:bg-[#151515] transition-colors cursor-pointer">
        <div className="relative">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {chat.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0 text-left">
          <div className="flex justify-start items-center min-w-0">
            <div className="flex">
              <h3 className="font-medium truncate">{chat.name}</h3>
            </div>
            <div className="grow min-w-2"></div>
            <div className="flex mr-0.5">
              <span className="text-xs text-gray-100 whitespace-nowrap">
                {chat.lastMessageTime}
              </span>
            </div>
          </div>
          
          <div className="flex justify-start items-center min-w-0">
            <p className="text-sm text-gray-500 truncate text-left grow pr-1">
              {chat.lastMessage}
            </p>
            {chat.unreadCount > 0 && (
              <span className="bg-blue-500 text-xs rounded-full w-5 h-5 flex items-center justify-center px-2">
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