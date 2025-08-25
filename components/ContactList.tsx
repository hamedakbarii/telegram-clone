// Path: components/ContactList.tsx
"use client";

import React, { useState, useMemo } from "react";
import { contacts } from "@/lib/mocks/contact";
import { FiSearch, FiX } from "react-icons/fi";

interface ContactListProps {
  onBackToChats: () => void;
}

// Function to format last seen time
const formatLastSeen = (lastSeenString: string): string => {
  const lastSeen = new Date(lastSeenString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    return "last seen recently";
  } else if (diffInHours < 24) {
    return `last seen ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays === 1) {
    return "last seen yesterday";
  } else if (diffInDays < 7) {
    return `last seen ${diffInDays} days ago`;
  } else {
    return `last seen ${lastSeen.toLocaleDateString()}`;
  }
};

// Function to get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Function to generate a consistent color based on name
const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500'
  ];
  
  const nameHash = name.split('').reduce((hash, char) => {
    return char.charCodeAt(0) + ((hash << 5) - hash);
  }, 0);
  
  return colors[Math.abs(nameHash) % colors.length];
};

export default function ContactList({ onBackToChats }: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      clearSearch();
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
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
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
            className={`absolute left-3 top-2.5 transition-colors duration-200 ${
              searchQuery ? "text-blue-400" : "text-gray-500"
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
                ? `Found ${filteredContacts.length} contact${
                    filteredContacts.length !== 1 ? "s" : ""
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
                onClick={() => alert(`Starting chat with ${contact.name}`)}
              >
                <button className="w-full p-3 flex items-center gap-3 hover:bg-[#151515] transition-colors cursor-pointer">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(contact.name)}`}>
                    {getInitials(contact.name)}
                  </div>

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