// Path: app/chat/page.tsx
"use client";

import React, { useState } from "react";
import { chats } from "@/lib/mocks/chat";
import { FiPlusCircle, FiSearch, FiArrowLeft } from "react-icons/fi";
import {
  MdMotionPhotosOn,
  MdOutlineMenu,
  MdNotifications,
  MdStorage,
  MdSecurity,
  MdLanguage,
  MdHelpOutline,
  MdPrivacyTip,
} from "react-icons/md";
import { FaUserCircle, FaStar, FaGift } from "react-icons/fa";
import { TbPin } from "react-icons/tb";
import { CiBookmark, CiSettings, CiUser } from "react-icons/ci";
import {
  BsPlus,
  BsQuestionCircleFill,
  BsPhone,
  BsFolder,
  BsDisplay,
  BsChat,
} from "react-icons/bs";
import { FaBug, FaK } from "react-icons/fa6";
import { RiEmojiStickerLine } from "react-icons/ri";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ChatListPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleUserClick = () => {
    setShowUserProfile(true);
    setIsMenuOpen(false);
  };
  const handleBackToChats = () => setShowUserProfile(false);

  return (
    <div className="flex h-screen text-black dark:text-white bg-[#FEFEFF] dark:bg-[#202021]">
      {/* Left sidebar - Chat list */}
      <div className="w-96 border-r border-transparent flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-transparent flex items-center gap-2">
          {/* Back button for user profile or Menu button */}
          <div className="relative">
            {showUserProfile ? (
              <button
                onClick={handleBackToChats}
                className="p-2 rounded-full hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer"
              >
                <FiArrowLeft size={20} />
              </button>
            ) : (
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer"
              >
                <MdOutlineMenu size={20} />
              </button>
            )}

            {/* Dropdown menu */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 z-10 mx-2.5 border-0 transition-opacity duration-200 opacity-100"
                onClick={toggleMenu}
              >
                <div className="py-1 absolute top-12 left-1.5 mt-2 w-56 bg-[#212121dd] dark:bg-[#212121dd] rounded-2xl shadow-2xl z-20 border border-[#212121dd] backdrop-blur-md overflow-hidden transition-all duration-200 translate-y-0 opacity-100">
                  <button
                    onClick={handleUserClick}
                    className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer"
                  >
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
        </div>

        {/* Dynamic content area */}
        <div className="flex-1 overflow-y-auto">
          {showUserProfile ? (
            // User profile view
            <div className="h-full flex flex-col bg-[#1a1a1a] dark:bg-[#1a1a1a]">
              {/* Profile Header */}
              <div className="p-6 text-center border-b border-[#2d2d2d]">
                <div className="relative inline-block mb-4">
                  <img
                    src="/assets/avatar/belami.jpg"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
                </div>
                <h2 className="text-xl font-semibold text-white mb-1">Amir.</h2>
                <p className="text-sm text-gray-400 mb-4">last seen just now</p>

                {/* Contact Info */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-gray-300">
                    <BsPhone size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white">+98 939 222 3333</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-lg text-gray-500">@</span>
                    <div>
                      <p className="text-sm text-gray-400">Username</p>
                      <p className="text-white">@amiriii01</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-lg text-gray-500">ⓘ</span>
                    <div>
                      <p className="text-sm text-gray-400">Bio</p>
                      <p className="text-white flex items-center gap-1">
                        NEXTJS DEVELOPER
                        <span className="text-blue-400">✓</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-lg text-gray-500">📅</span>
                    <div>
                      <p className="text-sm text-gray-400">Date of Birth</p>
                      <p className="text-white">September 23</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Menu */}
              <div className="flex-1 ">
                <div className="py-2">
                  {/* Settings Section */}
                  <div className="mb-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <CiSettings size={20} className="text-gray-400" />
                      <span className="text-white">General Settings</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <BsDisplay size={20} className="text-gray-400" />
                      <span className="text-white">
                        Animations and Performance
                      </span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <MdNotifications size={20} className="text-gray-400" />
                      <span className="text-white">Notifications</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <MdStorage size={20} className="text-gray-400" />
                      <span className="text-white">Data and Storage</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <MdSecurity size={20} className="text-gray-400" />
                      <span className="text-white">Privacy and Security</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <BsFolder size={20} className="text-gray-400" />
                      <span className="text-white">Chat Folders</span>
                    </button>

                    <button className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <div className="flex items-center gap-3">
                        <BsDisplay size={20} className="text-gray-400" />
                        <span className="text-white">Active Sessions</span>
                      </div>
                      <span className="text-sm text-gray-400">11</span>
                    </button>

                    <button className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <div className="flex items-center gap-3">
                        <MdLanguage size={20} className="text-gray-400" />
                        <span className="text-white">Language</span>
                      </div>
                      <span className="text-sm text-gray-400">English</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <RiEmojiStickerLine size={20} className="text-gray-400" />
                      <span className="text-white">Stickers and Emoji</span>
                    </button>
                  </div>

                  <div className="border-t border-[#2d2d2d] my-2"></div>

                  {/* Additional Options */}
                  <div className="mb-2">
                    <button className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <div className="flex items-center gap-3">
                        <FaStar size={20} className="text-yellow-500" />
                        <span className="text-white">My Stars</span>
                      </div>
                      <span className="text-sm text-gray-400">0</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <FaGift size={20} className="text-gray-400" />
                      <span className="text-white">Send a Gift</span>
                    </button>
                  </div>

                  <div className="border-t border-[#2d2d2d] my-2"></div>

                  {/* Help Section */}
                  <div>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <BsChat size={20} className="text-gray-400" />
                      <span className="text-white">Ask a Question</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <MdHelpOutline size={20} className="text-gray-400" />
                      <span className="text-white">Telegram FAQ</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors">
                      <MdPrivacyTip size={20} className="text-gray-400" />
                      <span className="text-white">Privacy Policy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Chat list view
            chats.map((chat) => (
              <div key={chat.id} className="border-b border-transparent">
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
            ))
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#0F0F0F] bg-[url(/assets/image/chat-bg-br.png)] dark:bg-[url(/assets/image/chat-bg-pattern-dark.png)]">
        <p className="text-gray-500 dark:text-gray-400">
          {showUserProfile
            ? "User profile view"
            : "Select a chat to start messaging"}
        </p>
      </div>
    </div>
  );
}
