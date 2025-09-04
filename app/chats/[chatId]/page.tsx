// path: app/chats/[chatId]/page.tsx
"use client";

import React, { JSX, useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoSend, IoCall, IoArrowBack, IoClose } from "react-icons/io5";
import { FaRegSmile, FaSearch, FaUser } from "react-icons/fa";
import { FaMicrophone, FaPaperclip } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { chats } from "@/lib/mocks/chat";
import { MdAlternateEmail } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";

type Params = {
  chatId: string;
};

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  status?: "sent" | "delivered" | "read" | "succeeded" | null;
  isEdited?: boolean;
}

interface ChatInfo {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean | null;
  lastSeen?: string;
}

export default function SingleChat(): JSX.Element {
  const params = useParams() as Params;
  const router = useRouter();
  const { chatId } = params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle back navigation
  const handleBackToChats = () => {
    router.push('/chats');
  };

  // Toggle user info panel
  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  // Random AI responses
  const getRandomAIResponse = () => {
    const responses = [
      "That's interesting! Tell me more.",
      "I understand. How can I help you with that?",
      "Thanks for sharing that with me.",
      "That sounds great! What's next?",
      "I see. Is there anything else you'd like to discuss?",
      "Noted! Let me know if you need any assistance.",
      "سلام! چطور می‌توونم کمکتون کنم؟",
      "باشه، فهمیدم. چیز دیگه‌ای هم هست؟",
      "عالیه! ادامه بدید.",
      "حله، گرفتم. چیز دیگه‌ای می‌خواید؟",
      "ممنون که اشتراک گذاشتید.",
      "جالبه! بیشتر توضیح بدید.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Load chat info and messages
  const loadChatMessages = async (chatId: string) => {
    setIsLoading(true);

    const chatIdNum = parseInt(chatId);

    // Get chat info from your mock data
    const chat = chats.find((c) => c.id === chatIdNum);
    if (chat) {
      setChatInfo({
        id: chat.id,
        name: chat.name,
        avatar: chat.avatar,
        isOnline: chat.isOnline,
        lastSeen: chat.id === 2 ? "last seen recently" : undefined,
      });
    }

    // Simulate API call - Simple welcome message for all chats
    setTimeout(() => {
      if (!chat) {
        setMessages([]);
        setIsLoading(false);
        return;
      }

      // Simple welcome message for all chats
      const welcomeMessage: Message = {
        id: "1",
        text: `Hello! Welcome to chat with ${chat.name}. How can I help you today?`,
        sender: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      };

      setMessages([welcomeMessage]);
      setIsLoading(false);
    }, 300);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Simulate delivery and read status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 1500);

    // Generate random AI response after 2 seconds
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomAIResponse(),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageStatus = (status: string | null | undefined) => {
    switch (status) {
      case "sent":
        return <BsCheck className="w-4 h-4 text-gray-300" />;
      case "delivered":
        return <BsCheckAll className="w-4 h-4 text-gray-300" />;
      case "read":
        return <BsCheckAll className="w-4 h-4 text-blue-400" />;
      case "succeeded":
        return <BsCheck className="w-4 h-4 text-green-400" />;
      default:
        return null;
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const isUrl = (text: string) => {
    try {
      new URL(text.split("\n")[0]);
      return true;
    } catch {
      return false;
    }
  };

  const renderMessage = (message: Message) => {
    if (message.sender === "user" && isUrl(message.text)) {
      const lines = message.text.split("\n");
      const url = lines[0];
      const title = lines[2] || "Google";
      const description = lines[3] || "";

      return (
        <div className="bg-purple-500 text-white rounded-2xl p-3 max-w-sm">
          <div className="bg-white/10 rounded-lg p-3 mb-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-blue-500 font-bold text-xs">G</span>
              </div>
              <div>
                <div className="font-medium text-sm">{title}</div>
                <div className="text-xs text-white/70">{url}</div>
              </div>
            </div>
            <div className="text-xs text-white/80">{description}</div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>{formatTime(message.timestamp)}</span>
            {renderMessageStatus(message.status)}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`rounded-2xl p-3 max-w-sm ${message.sender === "user"
          ? "bg-purple-500 text-white"
          : "bg-gray-700 text-white"
          }`}
      >
        <div className="break-words">{message.text}</div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1 text-xs opacity-70">
            <span>{formatTime(message.timestamp)}</span>
            {message.isEdited && <span>edited</span>}
          </div>
          {message.sender === "user" && (
            <div className="ml-2">{renderMessageStatus(message.status)}</div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    loadChatMessages(chatId);
  }, [chatId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#101010]">
        <div className="text-gray-400">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-[#101010] text-white">
      {/* Main Chat Area */}
      <div className={`flex flex-col h-full ${showUserInfo ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 h-14 bg-[#212121] border-b border-[#212121]">
          <div className="flex items-center gap-3 cursor-pointer" onClick={toggleUserInfo}>
            {/* Back button for mobile */}
            {isMobile && (
              <button
                onClick={handleBackToChats}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer mr-2"
              >
                <IoArrowBack className="w-5 h-5 text-gray-400" />
              </button>
            )}

            <img
              src={chatInfo?.avatar || "/api/placeholder/40/40"}
              alt={chatInfo?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-lg font-medium">{chatInfo?.name}</h1>
              <p className="text-sm text-gray-400">
                {chatInfo?.isOnline ? "online" : chatInfo?.lastSeen || "offline"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer">
              <FaSearch className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer">
              <IoCall className="w-5 h-5 text-gray-400" />
            </button>

            {/* Three-dot menu button */}
            <div className="relative" ref={menuRef}>
              <button
                className="p-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <HiDotsVertical className="w-5 h-5 text-gray-400" />
              </button>

              {/* Menu dropdown */}
              {isMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-[#212121] rounded-lg shadow-lg z-50 border border-gray-700 overflow-hidden">
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3">✏️</span>
                      Edit
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3">🎥</span>
                      Video Call
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3">🔇</span>
                      Mute...
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3">☑️</span>
                      Select messages
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3">🎁</span>
                      Send a Gift
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3">🚫</span>
                      Block user
                    </button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3">🗑️</span>
                      Delete chat
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[url(/assets/image/chat-bg-br.png)] dark:bg-[url(/assets/image/chat-bg-pattern-dark.png)]">
          <div className="flex flex-col space-y-1">
            {/* Today divider */}
            <div className="flex justify-center my-4">
              <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-sm">
                Today
              </span>
            </div>

            {messages.map((message, index) => {
              const showTime =
                index === 0 ||
                Math.abs(
                  message.timestamp.getTime() -
                  messages[index - 1].timestamp.getTime()
                ) > 300000; // 5 minutes

              return (
                <div key={message.id} className="space-y-1">
                  {showTime && (
                    <div className="flex justify-center">
                      <span className="text-xs text-gray-500 px-2">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    {renderMessage(message)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Input Area */}
        <div className="p-4 border-0 bg-transparent backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <FaPaperclip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message"
                className="w-full p-3 pr-12 border-0 bg-[#212121] dark:bg-[#212121] rounded-2xl resize-none focus:outline-none text-white dark:text-white placeholder-[#a2acb4] dark:placeholder-[#a2acb4]"
                rows={1}
                style={{ maxHeight: "120px", minHeight: "44px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
              />

              {/* Emoji button inside input */}
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
                <FaRegSmile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Animated Send/Voice Button */}
            <div className="relative w-10 h-10">
              {/* Voice/Mic Button */}
              <button
                className={`absolute inset-0 p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-all duration-200 ease-in-out transform ${inputMessage.trim()
                  ? "opacity-0 scale-75 rotate-45"
                  : "opacity-100 scale-100 rotate-0"
                  }`}
                disabled={inputMessage.trim() !== ""}
              >
                <FaMicrophone className="w-6 h-6 text-white" />
              </button>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`absolute inset-0 p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-0 disabled:cursor-not-allowed rounded-full transition-all duration-200 ease-in-out transform ${inputMessage.trim()
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 -rotate-45"
                  }`}
              >
                <IoSend className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Sidebar */}
      {showUserInfo && (
        <div className="w-1/3 bg-[#212121] border-l border-gray-700 overflow-y-auto transition-all duration-300">
          <div className="p-4 h-14 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-medium">User Info</h2>
            <button
              onClick={toggleUserInfo}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            >
              <IoClose className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="p-0">
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <img
                  src={chatInfo?.avatar || "/api/placeholder/100/100"}
                  alt={chatInfo?.name}
                  className="w-full h-full rounded-none object-cover mb-0"
                />
                <div className="absolute p-4 bottom-0 flex flex-col justify-end w-full min-h-[100px] text-white bg-gradient-to-t from-black/50 to-transparent">
                  <h3 className="text-xl font-bold">{chatInfo?.name}</h3>
                  <p className="text-gray-400">{chatInfo?.isOnline ? "online" : "offline"}</p>
                </div>
              </div>
            </div>

            {/* List Item */}

            <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
              <div className="mr-3 p-2">
                <IoCall className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-white">+98 937 000 0000</span>
                <span className="text-sm font-medium text-gray-400">Phone</span>
              </div>
            </div>

            <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
              <div className="mr-3 p-2">
                <MdAlternateEmail className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-white">@amiri</span>
                <span className="text-sm font-medium text-gray-400">Username</span>
              </div>
            </div>

            <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
              <div className="mr-3 p-2">
                <LuInfo className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-white">Developer</span>
                <span className="text-sm font-medium text-gray-400">Bio</span>
              </div>
            </div>

            <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
              <div className="mr-3 p-2">
                <IoIosNotificationsOutline className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <span className="text-sm text-white">Notifications</span>
                {/* Toggle Button */}
                <label
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-transparent rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#8774E1] dark:peer-checked:bg-[#8774E1]"></div>
                </label>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}