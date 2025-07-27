// Path: app/chat/page.tsx
'use client';

import React, { useState } from 'react';
import { IconSearch, IconMenu2, IconEdit, IconDotsVertical, IconPin, IconSun, IconMoon, IconSettings, IconLogout, IconPlus } from '@tabler/icons-react';
import { chats } from '@/lib/mocks/chat';

export default function ChatListPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex h-screen text-black dark:text-white bg-gray-100 dark:bg-gray-900`}>
      {/* Left sidebar - Chat list */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
          {/* Menu button with dropdown */}
          <div className="relative">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
            >
              <IconMenu2 size={20} />
            </button>
            
            {/* Dropdown menu */}
            {isMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700 backdrop-blur-md">
                <div className="py-1 flex flex-col items-center">
                  <button>User</button>
                  <div className="flex"><button className="flex max-w-5 mx-[0.5rem] me-[1.25rem] mr-8"> <IconPlus /> Add Account</button></div>
                  <button>Save Message</button>
                  <button>Contact</button>
                  <button>My Stories</button>
                  <button className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                    <IconSettings size={16} className="mr-2" />
                    Settings
                  </button>
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {darkMode ? (
                      <>
                        <IconSun size={16} className="mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <IconMoon size={16} className="mr-2" />
                        Night Mode
                      </>
                    )}
                  </button>
                  <button>Animation</button>
                  <button>Telegram Features</button>
                  <button>Report A Bug</button>
                  <button>Switch to K Version</button>
                  <button>Install APP</button>
                  <div className="footer">
                    <p>Telegram Web A 10.9.57</p>
                  </div>

                  <button className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">
                    <IconLogout size={16} className="mr-2" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 relative cursor-text">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none"
            />
            <IconSearch size={16} className="absolute left-3 top-2.5 text-gray-500" />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
            <IconEdit size={20} />
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div key={chat.id} className="border-b border-gray-200 dark:border-gray-800">
              <button className="w-full p-3 flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                {/* Avatar with online indicator */}
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

                {/* Chat info */}
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
                    <p className="text-sm text-gray-500 truncate text-left grow pr-1">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-500 text-xs rounded-full w-5 h-5 flex items-center justify-center px-2">
                        {chat.unreadCount}
                      </span>
                    )}
                    {chat.isPinned && <IconPin size={16} className="text-gray-500 ml-0.5" />}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">Select a chat to start messaging</p>
      </div>
    </div>
  );
}