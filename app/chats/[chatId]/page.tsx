// app/chats/[chatId]/page.tsx
"use client";

import React, { JSX, useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  IoSend,
  IoCall,
  IoArrowBack,
  IoClose,
  IoHandRightOutline,
} from "react-icons/io5";
import { FaRegCheckCircle, FaRegSmile, FaSearch } from "react-icons/fa";
import { FaMicrophone, FaPaperclip } from "react-icons/fa6";
import { HiDotsVertical, HiOutlineVideoCamera } from "react-icons/hi";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { MdAlternateEmail, MdDeleteOutline } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiEdit2, FiGift } from "react-icons/fi";
import { BiVolumeMute } from "react-icons/bi";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { formatPhoneNumber } from "@/lib/utils/formatPhone";
import { getInitials, getAvatarColor } from "@/lib/utils/avatarUtils";
import { useChatStore } from "@/store/useChatStore";
import { useChatSimulation } from "@/lib/utils/chatSimulation";

type Params = {
  chatId: string;
};

export default function SingleChat(): JSX.Element {
  const params = useParams() as Params;
  const router = useRouter();
  const { chatId } = params;

  const [inputMessage, setInputMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Zustand store with enhanced functionality
  const {
    getChatMessages,
    getChat,
    addMessage,
    updateMessageStatus,
    setSelectedChat,
    initializeStore,
    setTypingStatus,
    markMessagesAsRead,
  } = useChatStore();

  // Chat simulation for realistic behavior
  const { startSimulation, stopSimulation } = useChatSimulation();

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize store and simulation on mount - but only once
  useEffect(() => {
    if (!isClient) return;

    // Initialize store only once when client is ready
    initializeStore();

    const simulation = startSimulation();

    return () => {
      stopSimulation();
    };
  }, [isClient]); // Remove dependencies to prevent re-initialization

  // Get data from store with real-time updates - only after client hydration
  const messages = isClient ? getChatMessages(parseInt(chatId)) : [];
  const chatInfo = isClient ? getChat(parseInt(chatId)) : null;

  // Check if avatar is valid (not empty or incomplete URL)
  const hasValidAvatar = (avatarUrl: string) => {
    return avatarUrl &&
      avatarUrl !== "" &&
      avatarUrl !== "http://localhost:3000/assets/avatar/" &&
      !avatarUrl.endsWith("assets/avatar/");
  };

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isClient) {
      scrollToBottom();
    }
  }, [messages, isTyping, isClient]);

  // Handle emoji selection
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  // Check if mobile
  useEffect(() => {
    if (!isClient) return;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [isClient]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isClient]);

  // Set selected chat and mark as read on mount
  useEffect(() => {
    if (!isClient) return;

    const chatIdNum = parseInt(chatId);
    setSelectedChat(chatIdNum);
    markMessagesAsRead(chatIdNum);
  }, [chatId, isClient, setSelectedChat, markMessagesAsRead]);

  // Handle back navigation
  const handleBackToChats = () => {
    router.push("/chats");
  };

  // Toggle user info panel
  const toggleUserInfo = () => {
    // Don't show user info for Saved Messages (chat ID 5)
    const chatIdNum = parseInt(chatId);
    if (chatIdNum === 5) {
      return; // Exit early, don't toggle user info
    }
    setShowUserInfo(!showUserInfo);
  };

  // Enhanced chat-specific responses with more variety
  const getChatSpecificResponse = (chatIdNum: number, userMessage: string) => {
    if (!isClient) return "Hello!";

    const chat = getChat(chatIdNum);
    const chatName = chat?.name || "";

    const hasQuestion = /^(hi|hello|hey|سلام|چطوری|how|what|when|where|why|who|is|are|do|does|did|can|could|will|would)/i.test(userMessage);
    const isShortMessage = userMessage.split(" ").length < 5;

    if (chatName.includes("Telegram")) {
      const responses = [
        "This is an automated message from Telegram.",
        "Your login code is " + Math.floor(100000 + Math.random() * 900000) + ". Don't share it with anyone.",
        "New feature update: Voice messages 2.0 is now available!",
        "Telegram Premium now includes 4GB file uploads.",
        "Security alert: New login detected. Was this you?",
        "Your account security has been upgraded.",
        "Channel recommendations updated based on your interests.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (chatName.includes("Belami")) {
      const responses = [
        "سفارش شما در حال پردازش است.",
        "از خرید شما متشکریم!",
        "محصول مورد نظر شما موجود شد.",
        "پیگیری سفارش: " + Math.floor(100000 + Math.random() * 900000),
        "آیا از خدمات ما راضی هستید؟",
        "تخفیف ویژه برای مشتریان وفادار!",
        "محصولات جدید به فروشگاه اضافه شد.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (chatName.includes("Hamed")) {
      const responses = [
        "پسرم چطوری؟",
        "فامیل ها سلام رسوندن.",
        "بیا خونه ما مهمون داریم.",
        "پدرت رو دیدی؟",
        "امشب شام چی درست کنم؟",
        "یادت نره فردا جلسه داریم.",
        "پروژه چطور پیش میره؟",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (chatName.includes("Amir")) {
      const responses = [
        "Hey, did you finish the project?",
        "When can we meet to discuss the details?",
        "I sent you the files, did you get them?",
        "Let me know if you need any help.",
        "Check out this new framework I found!",
        "The deadline is approaching, how's progress?",
        "Code review meeting at 2 PM tomorrow.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (chatName.includes("eldrÃƒ  cu")) {
      const responses = [
        "همیشه سلامت باشی رفیق!",
        "چطوری کاری که گفتم انجام شد؟",
        "یادت نره فردا قراره بریم فوتسال.",
        "پروژه جدیدم رو دیدی؟ نظرت چیه؟",
        "امیدوارم همیشه کامن های گیت هابتون با پول سبز باشه",
        "کدهای جدیدت خیلی تمیز شدن.",
        "فردا میتونی بیای دفترمون؟",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Context-aware responses
    if (hasQuestion) {
      const questionResponses = [
        "That's a good question!",
        "I'm not sure, what do you think?",
        "Let me think about that...",
        "I'd need more information to answer that.",
        "Why do you ask?",
        "Interesting question!",
        "What made you curious about that?",
      ];
      return questionResponses[Math.floor(Math.random() * questionResponses.length)];
    }

    if (isShortMessage) {
      const shortResponses = [
        "Okay!",
        "Got it.",
        "Thanks!",
        "Nice!",
        "Cool! 😎",
        "Interesting...",
        "I see.",
        "Understandable.",
        "Absolutely!",
        "For sure!",
      ];
      return shortResponses[Math.floor(Math.random() * shortResponses.length)];
    }

    // Enhanced generic responses
    const genericResponses = [
      "That's interesting! Tell me more.",
      "I understand. How can I help you with that?",
      "Thanks for sharing that with me.",
      "That sounds great! What's next?",
      "I see. Is there anything else you'd like to discuss?",
      "Noted! Let me know if you need any assistance.",
      "سلام! چطور می‌تونم کمکتون کنم؟",
      "باشه، فهمیدم. چیز دیگه‌ای هم هست؟",
      "عالیه! ادامه بدید.",
      "حله، گرفتم. چیز دیگه‌ای می‌خوای؟",
      "ممنون که اشتراک گذاشتید.",
      "جالبه! بیشتر توضیح بدید.",
      "Hi there! 😊",
      "I appreciate your message!",
      "You're the best! 🌟",
      "How was your day?",
      "What are you up to?",
      "Hope you're doing well!",
      "That makes sense to me.",
      "I'm glad you reached out!",
    ];
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  // Enhanced message sending with better status simulation
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !isClient) return;

    const chatIdNum = parseInt(chatId);

    // Add user message with immediate status
    addMessage(chatIdNum, {
      text: inputMessage,
      sender: "user",
      status: "sent",
    });

    const currentInput = inputMessage;
    setInputMessage("");

    // Simulate realistic message delivery progression
    setTimeout(() => {
      const userMessages = getChatMessages(chatIdNum).filter(m => m.sender === "user");
      const lastUserMessage = userMessages[userMessages.length - 1];
      if (lastUserMessage) {
        updateMessageStatus(lastUserMessage.id, "delivered");
      }
    }, 500 + Math.random() * 1000); // Random delay 0.5-1.5s

    setTimeout(() => {
      const userMessages = getChatMessages(chatIdNum).filter(m => m.sender === "user");
      const lastUserMessage = userMessages[userMessages.length - 1];
      if (lastUserMessage) {
        updateMessageStatus(lastUserMessage.id, "read");
      }
    }, 1500 + Math.random() * 2000); // Random delay 1.5-3.5s

    // Don't generate AI response for Saved Messages (chat ID 5)
    if (chatIdNum === 5) return;

    // Simulate typing indicator with realistic timing
    setTimeout(() => {
      setTypingStatus(chatIdNum, true);
      setIsTyping(true);
    }, 1000 + Math.random() * 2000);

    // Generate response after variable delay (2-6 seconds)
    const responseDelay = 2000 + Math.random() * 4000;
    setTimeout(() => {
      setIsTyping(false);
      setTypingStatus(chatIdNum, false);

      addMessage(chatIdNum, {
        text: getChatSpecificResponse(chatIdNum, currentInput),
        sender: "ai",
      });
    }, responseDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Enhanced message status rendering
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

  // Enhanced time formatting
  const formatTime = (timestamp: Date) => {
    if (!isClient) return "now";

    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes < 1 ? "now" : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return messageTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else if (diffInDays < 7) {
      return diffInDays < 2 ? "Yesterday" :
        messageTime.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return messageTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  // URL detection helper
  const isUrl = (text: string) => {
    try {
      new URL(text.split("\n")[0]);
      return true;
    } catch {
      return false;
    }
  };

  // Enhanced message rendering with better URL handling
  const renderMessage = (message: any) => {
    if (message.sender === "user" && isUrl(message.text)) {
      const lines = message.text.split("\n");
      const url = lines[0];
      const title = lines[2] || "Link";
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

  // Loading state for SSR
  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full bg-[#101010]">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!chatInfo) {
    return (
      <div className="flex items-center justify-center h-full bg-[#101010]">
        <div className="text-gray-400">Chat not found...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-[#101010] text-white">
      {/* Main Chat Area */}
      <div
        className={`flex flex-col h-full ${showUserInfo ? "w-2/3" : "w-full"
          } transition-all duration-300`}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 h-14 bg-[#212121] border-b border-[#212121]">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={toggleUserInfo}
          >
            {/* Back button for mobile */}
            {isMobile && (
              <button
                onClick={handleBackToChats}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer mr-2"
              >
                <IoArrowBack className="w-5 h-5 text-gray-400" />
              </button>
            )}

            {/* Avatar with fallback to initials */}
            {hasValidAvatar(chatInfo?.avatar) ? (
              <div className="relative">
                <img
                  src={chatInfo?.avatar}
                  alt={chatInfo?.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                {/* Hidden fallback - will be shown if image fails */}
                <div
                  className={`w-10 h-10 rounded-full hidden items-center justify-center text-white font-semibold absolute top-0 left-0 ${getAvatarColor(
                    chatInfo?.name || ""
                  )}`}
                >
                  {getInitials(chatInfo?.name || "")}
                </div>
              </div>
            ) : (
              // Show initials directly for chats without valid avatars
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                  chatInfo?.name || ""
                )}`}
              >
                {getInitials(chatInfo?.name || "")}
              </div>
            )}

            <div>
              <h1 className="text-lg font-medium">{chatInfo?.name}</h1>
              <p className="text-sm text-gray-400">
                {isTyping || chatInfo?.isTyping
                  ? "typing..."
                  : chatInfo?.isOnline
                    ? "online"
                    : "offline"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
              onClick={() =>
                alert("Sorry! Search feature is not available yet.")
              }
            >
              <FaSearch className="w-5 h-5 text-gray-400" />
            </button>
            <button
              className="p-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
              onClick={() => alert("Sorry! Call feature is not available yet.")}
            >
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
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
                      onClick={() =>
                        alert("Sorry! Edit feature is not available yet.")
                      }
                    >
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <FiEdit2 />
                      </span>
                      Edit
                    </button>

                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
                      onClick={() =>
                        alert("Sorry! Video Call feature is not available yet.")
                      }
                    >
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <HiOutlineVideoCamera />
                      </span>
                      Video Call
                    </button>

                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
                      onClick={() =>
                        alert("Sorry! Mute feature is not available yet.")
                      }
                    >
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <BiVolumeMute />
                      </span>
                      Mute...
                    </button>

                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
                      onClick={() =>
                        alert(
                          "Sorry! Select messages feature is not available yet."
                        )
                      }
                    >
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <FaRegCheckCircle />
                      </span>
                      Select messages
                    </button>

                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
                      onClick={() =>
                        alert(
                          "Sorry! Send a Gift feature is not available yet."
                        )
                      }
                    >
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <FiGift />
                      </span>
                      Send a Gift
                    </button>

                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
                      onClick={() =>
                        alert("Sorry! Block user feature is not available yet.")
                      }
                    >
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <IoHandRightOutline />
                      </span>
                      Block user
                    </button>

                    <div className="border-t border-gray-700 my-1 text-red-500"></div>

                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
                      onClick={() =>
                        alert(
                          "Sorry! Delete chat feature is not available yet."
                        )
                      }
                    >
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <MdDeleteOutline />
                      </span>
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
              // Safe timestamp comparison
              const currentTimestamp = message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp);
              const previousTimestamp = index > 0 && messages[index - 1]
                ? (messages[index - 1].timestamp instanceof Date
                  ? messages[index - 1].timestamp
                  : new Date(messages[index - 1].timestamp))
                : null;

              const showTime = index === 0 ||
                (previousTimestamp && Math.abs(currentTimestamp.getTime() - previousTimestamp.getTime()) > 300000); // 5 minutes

              return (
                <div key={message.id} className="space-y-1">
                  {showTime && (
                    <div className="flex justify-center">
                      <span className="text-xs text-gray-500 px-2">
                        {formatTime(currentTimestamp)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                      }`}
                  >
                    {renderMessage(message)}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white rounded-2xl p-3 max-w-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input Area */}
        <div className="p-4 border-0 bg-transparent backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer" onClick={() => alert("Sorry! Send file feature is not available yet.")}>
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
              <button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
              >
                <FaRegSmile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-14 right-0 z-50">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={Theme.DARK}
                    lazyLoadEmojis
                  />
                </div>
              )}
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
                className={`cursor-pointer absolute inset-0 p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-0 disabled:cursor-not-allowed rounded-full transition-all duration-200 ease-in-out transform ${inputMessage.trim()
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
                {/* Avatar with fallback to initials in sidebar */}
                {hasValidAvatar(chatInfo?.avatar) ? (
                  <div className="relative">
                    <img
                      src={chatInfo?.avatar}
                      alt={chatInfo?.name}
                      className="w-full h-full rounded-none object-cover mb-0"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    {/* Hidden fallback - will be shown if image fails */}
                    <div
                      className={`w-full h-full rounded-none hidden items-center justify-center text-white font-bold text-6xl absolute top-0 left-0 ${getAvatarColor(
                        chatInfo?.name || ""
                      )} min-h-[200px]`}
                    >
                      {getInitials(chatInfo?.name || "")}
                    </div>
                  </div>
                ) : (
                  // Show initials directly for chats without valid avatars
                  <div
                    className={`w-full h-full rounded-none flex items-center justify-center text-white font-bold text-6xl ${getAvatarColor(
                      chatInfo?.name || ""
                    )} min-h-[200px]`}
                  >
                    {getInitials(chatInfo?.name || "")}
                  </div>
                )}
                <div className="absolute p-4 bottom-0 flex flex-col justify-end w-full min-h-[100px] text-white bg-gradient-to-t from-black/50 to-transparent">
                  <h3 className="text-xl font-bold">{chatInfo?.name}</h3>
                  <p className="text-gray-400">
                    {chatInfo?.isOnline ? "online" : "offline"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            {chatInfo?.number && (
              <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
                <div className="mr-3 p-2">
                  <IoCall className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white">+{formatPhoneNumber(chatInfo.number.toString())}</span>
                  <span className="text-sm font-medium text-gray-400">Phone</span>
                </div>
              </div>
            )}

            {chatInfo?.userName && (
              <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
                <div className="mr-3 p-2">
                  <MdAlternateEmail className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white">@{chatInfo?.userName}</span>
                  <span className="text-sm font-medium text-gray-400">Username</span>
                </div>
              </div>
            )}

            {chatInfo?.bio && (
              <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
                <div className="mr-3 p-2">
                  <LuInfo className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white">{chatInfo?.bio}</span>
                  <span className="text-sm font-medium text-gray-400">Bio</span>
                </div>
              </div>
            )}

            <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
              <div className="mr-3 p-2">
                <IoIosNotificationsOutline className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <span className="text-sm text-white">Notifications</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
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