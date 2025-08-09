"use client";

import React, { JSX, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { FaMicrophone, FaPaperclip } from "react-icons/fa6";

type Params = {
  chatId: string;
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function SingleChat(): JSX.Element {
  const params = useParams() as Params;
  const { chatId } = params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock function to load chat messages - replace with your actual API call
  const loadChatMessages = async (chatId: string) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockMessages: Message[] = [
        {
          id: '1',
          text: `Welcome to chat ${chatId}! How can I help you today?`,
          sender: 'ai',
          timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
        },
        {
          id: '2',
          text: 'Hello! I have some questions about the project.',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 3) // 3 minutes ago
        },
        {
          id: '3',
          text: 'I\'d be happy to help with your project questions. What specifically would you like to know?',
          sender: 'ai',
          timestamp: new Date(Date.now() - 1000 * 60 * 2) // 2 minutes ago
        }
      ];
      setMessages(mockMessages);
      setIsLoading(false);
    }, 300);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'm processing your request...",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    loadChatMessages(chatId);
  }, [chatId]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div>
          <h1 className="text-xl font-semibold">Chat {chatId}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Active conversation</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500 dark:text-gray-400">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                Start a new conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Send a message to begin chatting in Chat {chatId}
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user'
                    ? 'text-blue-100'
                    : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
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
              className="w-full p-3 pr-12 border-0 bg-gray-100 dark:bg-gray-700 rounded-2xl resize-none focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
              style={{ maxHeight: '120px', minHeight: '44px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
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
                  ? 'opacity-0 scale-75 rotate-45'
                  : 'opacity-100 scale-100 rotate-0'
                }`}
              disabled={inputMessage.trim() !== ''}
            >
              <FaMicrophone className="w-6 h-6 text-white" />
            </button>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`absolute inset-0 p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-0 disabled:cursor-not-allowed rounded-full transition-all duration-200 ease-in-out transform ${inputMessage.trim()
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-75 -rotate-45'
                }`}
            >
              <IoSend className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}