// Path: app/chat/page.tsx
"use client";

import React, { useState } from 'react';
import { chats } from '@/lib/mocks/chat';
import { FiMoon, FiPlusCircle, FiSearch } from 'react-icons/fi';
import { MdMotionPhotosOn, MdOutlineMenu } from 'react-icons/md';
import { FaPlus, FaRegEdit, FaUserCircle } from 'react-icons/fa';
import { TbPin } from 'react-icons/tb';
import { IoSunnyOutline } from 'react-icons/io5';
import { CiBookmark, CiSettings, CiUser } from 'react-icons/ci';
import { LuLogOut } from 'react-icons/lu';
import { BsPlus, BsQuestionCircleFill } from 'react-icons/bs';
import { FaBug, FaK } from 'react-icons/fa6';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function ChatListPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="flex h-screen text-black dark:text-white bg-[#FEFEFF] dark:bg-[#202021]"
    >
      {/* Left sidebar - Chat list */}
      <div className="w-96 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
          {/* Menu button with dropdown */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer"
            >
              <MdOutlineMenu size={20} />
            </button>

            {/* Dropdown menu */}
            {isMenuOpen && (
              // <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700 backdrop-blur-md">
              <div
                className={`fixed inset-0 z-10 mx-2.5 border-0 transition-opacity duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                onClick={toggleMenu}
              >
                <div
                  className={`py-1 absolute top-12 left-1.5 mt-2 w-56 bg-[#212121dd] dark:bg-[#212121dd] rounded-2xl shadow-2xl z-20 border border-[#212121dd] dark:border-[#212121dd] backdrop-blur-md overflow-hidden transition-all duration-200 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                    }`}
                >
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <FaUserCircle size={20} className="mr-2" />
                    User
                  </button>
                  <hr className="w-full text-[#ffffffa1] h-2.5 opacity-5" />
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <BsPlus size={20} className="mr-2" />
                    Add Account
                  </button>
                  <hr className="w-full text-[#ffffffa1] h-2.5 opacity-5" />
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <CiBookmark size={20} className="mr-2" />
                    Save Message
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <CiUser size={20} className="mr-2" />
                    Contact
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <MdMotionPhotosOn size={20} className="mr-2" />
                    My Stories
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <CiSettings size={20} className="mr-2" />
                    Settings
                  </button>
                    <ThemeToggle />
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <BsQuestionCircleFill size={20} className="mr-2" />
                    Telegram Features
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <FaBug size={20} className="mr-2" />
                    Report A Bug
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <FaK size={20} className="mr-2" />
                    Switch to K Version
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
                    <FiPlusCircle size={20} className="mr-2" />
                    Install APP
                  </button>

                  {/* <button className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] text-red-500">
                    <LuLogOut size={20} className="mr-2" />
                    Log Out
                  </button> */}
                  <div className="text-sm text-center text-[#aaaaaa] py-2.5 cursor-auto">
                    <p>Telegram Web A 10.9.57</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 relative cursor-text">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border-[#2d2d2d] dark:border-[#2d2d2d] bg-[#2d2d2d] dark:bg-[#2d2d2d] rounded-3xl focus:outline-none"
              />
              <FiSearch
                size={20}
                className="absolute left-3 top-2.5 text-gray-500"
              />
          </div>
          {/* <button className="p-2 rounded-full hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
            <FaRegEdit size={20} />
          </button> */}
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="border-b border-gray-200 dark:border-gray-800"
            >
              <button className="w-full p-3 flex items-center gap-3 hover:bg-[#151515] dark:hover:bg-[#151515] transition-colors cursor-pointer">
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
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#0F0F0F] bg-[url(/assets/image/chat-bg-br.png)] dark:bg-[url(/assets/image/chat-bg-pattern-dark.png)] relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/your-image.svg')] before:bg-repeat before:bg-[top_right] bg-[length:510px_auto] before:mix-blend-overlay">
        <p className="text-gray-500 dark:text-gray-400">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  );
}
