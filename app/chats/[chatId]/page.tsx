// path: app/chats/[chatId]/page.tsx
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
import { FaRegCheckCircle, FaRegSmile, FaSearch, FaUser } from "react-icons/fa";
import { FaMicrophone, FaPaperclip } from "react-icons/fa6";
import { HiDotsVertical, HiOutlineVideoCamera } from "react-icons/hi";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { chats } from "@/lib/mocks/chat";
import {
  messages as mockMessages,
  Message as MockMessage,
} from "@/lib/mocks/message";
import { MdAlternateEmail, MdDeleteOutline } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiEdit2, FiGift } from "react-icons/fi";
import { BiVolumeMute } from "react-icons/bi";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

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
  isTyping?: boolean;
  number: number;
  userName: string;
  bio: string;
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
  const [isTyping, setIsTyping] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  // Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
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
    router.push("/chats");
  };

  // Toggle user info panel
  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  // Convert mock messages to our component's message format
  const convertMockMessages = (
    mockMessages: MockMessage[],
    chatIdNum: number
  ): Message[] => {
    return mockMessages
      .filter((msg) => msg.chatId === chatIdNum)
      .map((msg) => ({
        id: msg.id.toString(),
        text: msg.text,
        sender: msg.isOwnMessage ? "user" : "ai",
        timestamp: new Date(Date.now() - Math.random() * 100000000), // Random recent time
        status:
          msg.status === "succeeded"
            ? "succeeded"
            : msg.status === "read"
            ? "read"
            : "delivered",
        isEdited: false,
      }));
  };

  // Get chat-specific responses
  const getChatSpecificResponse = (chatIdNum: number, userMessage: string) => {
    const chat = chats.find((c) => c.id === chatIdNum);
    const chatName = chat?.name || "";

    // Check if message contains questions
    const hasQuestion =
      /^(hi|hello|hey|سلام|چطوری|how|what|when|where|why|who|is|are|do|does|did|can|could|will|would)/i.test(
        userMessage
      );

    // Check if message is short (likely a quick response)
    const isShortMessage = userMessage.split(" ").length < 5;

    if (chatName.includes("Telegram")) {
      const responses = [
        "This is an automated message from Telegram.",
        "Your login code is 123456. Don't share it with anyone.",
        "New feature update: Voice messages 2.0 is now available!",
        "Telegram Premium now includes 4GB file uploads.",
        "Security alert: New login detected. Was this you?",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (chatName.includes("Belami")) {
      const responses = [
        "سفارش شما در حال پردازش است.",
        "از خرید شما متشکریم!",
        "محصول مورد نظر شما موجود شد.",
        "پیگیری سفارش: 123456",
        "آیا از خدمات ما راضی هستید؟",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (chatName.includes("Hamed")) {
      const responses = [
        "پسرم چطوری؟",
        "فامیل ها سلام رسوندن.",
        "بیا خونه ما مهمون داریم.",
        "پدرت رو دیدی؟",
        "امشب شام چی درست کنم؟",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (chatName.includes("Amir")) {
      const responses = [
        "Hey, did you finish the project?",
        "When can we meet to discuss the details?",
        "I sent you the files, did you get them?",
        "Let me know if you need any help.",
        "Check out this new framework I found!",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (chatName.includes("eldràcu")) {
      const responses = [
        "همیشه سلامت باشی رفیق!",
        "چطوری کاری که گفتم انجام شد؟",
        "یادت نره فردا قراره بریم فوتسال.",
        "پروژه جدیدم رو دیدی؟ نظرت چیه؟",
        "امیدوارم همیشه چمن های گیت هابتون با پول سبز باشه",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default contextual responses
    if (hasQuestion) {
      const questionResponses = [
        "That's a good question!",
        "I'm not sure, what do you think?",
        "Let me think about that...",
        "I'd need more information to answer that.",
        "Why do you ask?",
      ];
      return questionResponses[
        Math.floor(Math.random() * questionResponses.length)
      ];
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
      ];
      return shortResponses[Math.floor(Math.random() * shortResponses.length)];
    }

    // Generic responses
    const genericResponses = [
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
      "Hi there! 😊",
      "I appreciate your message!",
      "You're the best! 🌟",
      "How was your day?",
      "What are you up to?",
      "Thinking of you! 💭",
      "You make me smile! 😄",
      "Miss you! 💕",
      "Can't wait to see you! ⏳",
      "You're amazing! ✨",
      "Sending hugs! 🤗",
      "You're my favorite person! 🥰",
    ];
    return genericResponses[
      Math.floor(Math.random() * genericResponses.length)
    ];
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
        number: parseInt(chat.number),
        userName: chat.userName,
        bio: chat.bio,
      });
    }

    // Simulate API call with variable delay
    const delay = 300 + Math.random() * 700; // 300-1000ms for more realistic loading
    setTimeout(() => {
      if (!chat) {
        setMessages([]);
        setIsLoading(false);
        return;
      }

      // Get messages from mock data
      const chatMessages = convertMockMessages(mockMessages, chatIdNum);

      // Sort messages by timestamp
      chatMessages.sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
      );

      setMessages(chatMessages);
      setIsLoading(false);
    }, delay);
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

      // Don't generate AI response for Saved Messages (chat ID 5)
      const chatIdNum = parseInt(chatId);
      if (chatIdNum === 5) return;

      // Simulate typing indicator
      setIsTyping(true);

      // Generate random AI response after variable delay (1-4 seconds)
      const delay = 1000 + Math.random() * 3000;
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getChatSpecificResponse(chatIdNum, inputMessage),
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, delay);
    }, 1500);
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
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours =
      (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      return messageTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
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
        className={`rounded-2xl p-3 max-w-sm ${
          message.sender === "user"
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
      <div
        className={`flex flex-col h-full ${
          showUserInfo ? "w-2/3" : "w-full"
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

            <img
              src={chatInfo?.avatar || "/api/placeholder/40/40"}
              alt={chatInfo?.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <h1 className="text-lg font-medium">{chatInfo?.name}</h1>
              <p className="text-sm text-gray-400">
                {isTyping
                  ? "typing..."
                  : chatInfo?.isOnline
                  ? "online"
                  : chatInfo?.lastSeen || "offline"}
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
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <FiEdit2 />
                      </span>
                      Edit
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <HiOutlineVideoCamera />
                      </span>
                      Video Call
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <BiVolumeMute />
                      </span>
                      Mute...
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <FaRegCheckCircle />
                      </span>
                      Select messages
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <FiGift />
                      </span>
                      Send a Gift
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                      <span className="icon mr-3 text-[#AAAAAA] text-2xl">
                        <IoHandRightOutline />
                      </span>
                      Block user
                    </button>
                    <div className="border-t border-gray-700 my-1 text-red-500"></div>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
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
                    className={`flex ${
                      message.sender === "user"
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
              <button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
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
                className={`absolute inset-0 p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-all duration-200 ease-in-out transform ${
                  inputMessage.trim()
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
                className={`absolute inset-0 p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-0 disabled:cursor-not-allowed rounded-full transition-all duration-200 ease-in-out transform ${
                  inputMessage.trim()
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
                  <p className="text-gray-400">
                    {chatInfo?.isOnline ? "online" : "offline"}
                  </p>
                </div>
              </div>
            </div>

            {/* List Item */}

            {chatInfo?.number ? (
              <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
                <div className="mr-3 p-2">
                  <IoCall className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white">{chatInfo?.number}</span>
                  <span className="text-sm font-medium text-gray-400">
                    Phone
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}

            {chatInfo?.userName ? (
              <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
                <div className="mr-3 p-2">
                  <MdAlternateEmail className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white">
                    @{chatInfo?.userName}
                  </span>
                  <span className="text-sm font-medium text-gray-400">
                    Username
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}

            {chatInfo?.bio ? (
              <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
                <div className="mr-3 p-2">
                  <LuInfo className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white">{chatInfo?.bio}</span>
                  <span className="text-sm font-medium text-gray-400">Bio</span>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex items-center min-h-12 px-4 py-3 m-2 hover:bg-[#2C2C2C] cursor-pointer rounded-2xl">
              <div className="mr-3 p-2">
                <IoIosNotificationsOutline className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <span className="text-sm text-white">Notifications</span>
                {/* Toggle Button */}
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
