// Path: components/ContactList.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/store/useChatStore";
import { getInitials, getAvatarColor } from "@/lib/utils/avatarUtils"; // You'll need to create this

interface ContactListProps {
  onBackToChats: () => void;
}

// Function to format last seen time
const formatLastSeen = (lastSeenString: string): string => {
  try {
    const lastSeen = new Date(lastSeenString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (isNaN(lastSeen.getTime())) {
      return "last seen recently";
    }

    if (diffInMinutes < 1) {
      return "last seen recently";
    } else if (diffInMinutes < 60) {
      return `last seen ${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `last seen ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return "last seen yesterday";
    } else if (diffInDays < 7) {
      return `last seen ${diffInDays} days ago`;
    } else {
      return `last seen ${lastSeen.toLocaleDateString()}`;
    }
  } catch {
    return "last seen recently";
  }
};

export default function ContactList({ onBackToChats }: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  // Get contacts from Zustand store
  const { 
    contacts, 
    getContacts, 
    createNewChat, 
    getChat,
    setSelectedChat,
    markMessagesAsRead 
  } = useChatStore();

  // Load contacts when component mounts
  useEffect(() => {
    // This ensures contacts are loaded from the store
    getContacts();
  }, [getContacts]);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      clearSearch();
    }
  };

  const handleContactClick = (contact: any) => {
    // Check if chat already exists
    const existingChat = getChat(contact.id);
    
    if (existingChat) {
      // Chat exists, navigate to it
      setSelectedChat(contact.id);
      markMessagesAsRead(contact.id);
      router.push(`/chats/${contact.id}`);
    } else {
      // Create new chat and navigate to it
      createNewChat(contact);
      setSelectedChat(contact.id);
      router.push(`/chats/${contact.id}`);
    }
  };

  return (
    <div className="w-96 border-r border-transparent flex flex-col h-full bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="p-3 border-b border-[#2d2d2d] flex items-center gap-2">
        <button
          onClick={onBackToChats}
          className="p-2 rounded-full hover:bg-[#151515] cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>

        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-10 py-2 border-[#2d2d2d] bg-[#2d2d2d] rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          />

          {/* Search Icon */}
          <FiSearch
            size={20}
            className={`absolute left-3 top-2.5 transition-colors duration-200 ${searchQuery ? "text-blue-400" : "text-gray-500"
              }`}
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition-colors duration-200 p-0.5 rounded-full hover:bg-gray-600"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {/* Search Results Info */}
        {searchQuery && (
          <div className="p-3 border-b border-[#2d2d2d] bg-[#1a1a1a]">
            <p className="text-sm text-gray-400">
              {filteredContacts.length > 0
                ? `Found ${filteredContacts.length} contact${filteredContacts.length !== 1 ? "s" : ""
                }`
                : "No contacts found"}
            </p>
          </div>
        )}

        {/* Contact Items */}
        {filteredContacts.length > 0 ? (
          <div className="divide-y divide-transparent">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="border-b border-transparent"
              >
                <button 
                  className="w-full p-3 flex items-center gap-3 hover:bg-[#151515] transition-colors cursor-pointer"
                  onClick={() => handleContactClick(contact)}
                >
                  {/* Avatar */}
                  {contact.avatar && contact.avatar !== "http://localhost:3000/assets/avatar/" ? (
                    <div>
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextSibling?.removeAttribute('style');
                        }}
                      />
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                          contact.name
                        )} hidden`}
                      >
                        {getInitials(contact.name)}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                        contact.name
                      )}`}
                    >
                      {getInitials(contact.name)}
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-start min-w-0">
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <h3 className="font-medium truncate text-white">
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">
                          {formatLastSeen(contact.lastSeen)}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="text-4xl mb-4">👤</div>
            <p className="text-lg font-medium mb-2">No contacts found</p>
            <p className="text-sm text-center px-8">
              Try searching for a different name
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="text-4xl mb-4">📞</div>
            <p className="text-lg font-medium mb-2">No contacts</p>
            <p className="text-sm text-center px-8">
              Add some contacts to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}