// Path: store/useChatStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

// Types
export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatar: string;
  isOnline: boolean | null;
  isPinned: boolean | null;
  messageStatus: "sent" | "delivered" | "read" | "succeeded" | null;
  number: string;
  userName: string;
  bio: string;
  isArchive?: boolean;
  lastMessageTimestamp?: Date;
  isTyping?: boolean;
}

export interface Message {
  id: string;
  chatId: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  status?: "sent" | "delivered" | "read" | "succeeded" | null;
  isEdited?: boolean;
  type?: "text" | "image" | "file";
  mediaUrl?: string;
  fileName?: string;
}

export interface Contact {
  id: number;
  name: string;
  lastSeen: string;
  avatar: string;
  chatUrl: string;
}

interface ChatStore {
  // State
  chats: Chat[];
  messages: Record<number, Message[]>;
  contacts: Contact[];
  selectedChatId: number | null;
  isLoading: boolean;
  onlineStatus: Record<number, boolean>;
  isInitialized: boolean;

  // Actions
  initializeStore: () => void;
  setSelectedChat: (chatId: number) => void;
  addMessage: (
    chatId: number,
    message: Omit<Message, "id" | "chatId" | "timestamp">
  ) => void;
  updateMessageStatus: (messageId: string, status: Message["status"]) => void;
  getChatMessages: (chatId: number) => Message[];
  getChat: (chatId: number) => Chat | undefined;
  sortChatsByLastMessage: () => void;
  updateChatLastMessage: (
    chatId: number,
    message: string,
    timestamp?: Date
  ) => void;
  markMessagesAsRead: (chatId: number) => void;
  createNewChat: (contact: Contact) => void;
  pinChat: (chatId: number, isPinned: boolean) => void;
  deleteChat: (chatId: number) => void;
  setTypingStatus: (chatId: number, isTyping: boolean) => void;
  setOnlineStatus: (chatId: number, isOnline: boolean) => void;
  incrementUnreadCount: (chatId: number) => void;
  getChatsSortedByActivity: () => Chat[];

  // Contact actions
  getContacts: () => Contact[];
  addContact: (contact: Omit<Contact, "id">) => void;
  updateContactLastSeen: (contactId: number, lastSeen: string) => void;
}

// Use fixed timestamps to prevent hydration issues
const baseTime = new Date("2024-01-15T12:00:00Z");

// Enhanced initial data with fixed timestamps
const getInitialChats = (): Chat[] => [
  {
    id: 0,
    name: "Archived Chats",
    lastMessage: "Pavel Durov, BotFather, FoxNews",
    lastMessageTime: "12:30 PM",
    unreadCount: 189,
    avatar: `${APP_URL}/assets/avatar/archive.jpeg`,
    isOnline: false,
    isPinned: false,
    messageStatus: null,
    number: "",
    userName: "",
    bio: "",
    isArchive: true,
    lastMessageTimestamp: new Date(baseTime.getTime() + 30 * 60000),
  },
  {
    id: 1,
    name: "Belami",
    lastMessage: "سفارش با موفقیت ثبت شد ✅",
    lastMessageTime: "12:30 PM",
    unreadCount: 0,
    avatar: `${APP_URL}/assets/avatar/belami.jpg`,
    isOnline: null,
    isPinned: true,
    messageStatus: null,
    number: "989370000000",
    userName: "Belami",
    bio: "",
    lastMessageTimestamp: new Date(baseTime.getTime() + 30 * 60000),
  },
  {
    id: 2,
    name: "Hamed Akbari",
    lastMessage: "Salam Pesar",
    lastMessageTime: "11:15 AM",
    unreadCount: 3,
    avatar: `${APP_URL}/assets/avatar/hamed.jpg`,
    isOnline: true,
    isPinned: true,
    messageStatus: null,
    number: "989370000000",
    userName: "hamed",
    bio: "Developer | Pro Fighter",
    lastMessageTimestamp: new Date(baseTime.getTime() - 45 * 60000),
  },
  {
    id: 3,
    name: "Telegram",
    lastMessage:
      "Login code: 46619. Do not give this code to anyone, even if they say they are from Telegram!",
    lastMessageTime: "Yesterday",
    unreadCount: 2,
    avatar: `${APP_URL}/assets/avatar/telegram.jpg`,
    isOnline: false,
    isPinned: false,
    messageStatus: null,
    number: "42777",
    userName: "",
    bio: "",
    lastMessageTimestamp: new Date(baseTime.getTime() - 24 * 60 * 60000),
  },
  {
    id: 4,
    name: "Amir Rahemi",
    lastMessage: "Not yet, I need two more days",
    lastMessageTime: "Yesterday",
    unreadCount: 2,
    avatar: `${APP_URL}/assets/avatar/amir.jpg`,
    isOnline: false,
    isPinned: false,
    messageStatus: null,
    number: "989370000000",
    userName: "amiri",
    bio: "",
    lastMessageTimestamp: new Date(baseTime.getTime() - 25 * 60 * 60000),
  },
  {
    id: 5,
    name: "Saved Messages",
    lastMessage: "Anbari",
    lastMessageTime: "Mon",
    unreadCount: 0,
    avatar: `${APP_URL}/assets/avatar/save-message.jpeg`,
    isOnline: false,
    isPinned: false,
    messageStatus: "succeeded",
    number: "",
    userName: "",
    bio: "",
    lastMessageTimestamp: new Date(baseTime.getTime() - 7 * 24 * 60 * 60000),
  },
  {
    id: 6,
    name: "eldràcu",
    lastMessage: "امیدوارم همیشه کامن های گیت هابتون با پول سبز باشه",
    lastMessageTime: "Jul 27",
    unreadCount: 0,
    avatar: `${APP_URL}/assets/avatar/eldracu.jpeg`,
    isOnline: false,
    isPinned: false,
    messageStatus: "read",
    number: "989370000000",
    userName: "eldracu",
    bio: "eldràcu",
    lastMessageTimestamp: new Date(baseTime.getTime() - 170 * 24 * 60 * 60000),
  },
];

// Initial messages with fixed timestamps
const getInitialMessages = (): Record<number, Message[]> => ({
  1: [
    {
      id: "msg_1",
      chatId: 1,
      text: "سلام، چطور میتونم کمک کنم؟",
      sender: "ai",
      timestamp: new Date(baseTime.getTime() + 20 * 60000),
      status: "read",
    },
    {
      id: "msg_2",
      chatId: 1,
      text: "یک مدل خاص رو میخواستم",
      sender: "user",
      timestamp: new Date(baseTime.getTime() + 25 * 60000),
      status: "read",
    },
    {
      id: "msg_3",
      chatId: 1,
      text: "سفارش با موفقیت ثبت شد ✅",
      sender: "ai",
      timestamp: new Date(baseTime.getTime() + 30 * 60000),
      status: "read",
    },
  ],
  2: [
    {
      id: "msg_4",
      chatId: 2,
      text: "Salam Pesar",
      sender: "ai",
      timestamp: new Date(baseTime.getTime() - 50 * 60000),
      status: "read",
    },
    {
      id: "msg_5",
      chatId: 2,
      text: "Salam! Chetori?",
      sender: "user",
      timestamp: new Date(baseTime.getTime() - 48 * 60000),
      status: "read",
    },
    {
      id: "msg_6",
      chatId: 2,
      text: "Khoobam Merci! To chetor?",
      sender: "ai",
      timestamp: new Date(baseTime.getTime() - 45 * 60000),
      status: "read",
    },
  ],
  3: [
    {
      id: "msg_7",
      chatId: 3,
      text: "Login code: 46619. Do not give this code to anyone, even if they say they are from Telegram!",
      sender: "ai",
      timestamp: new Date(baseTime.getTime() - 24 * 60 * 60000),
      status: "read",
    },
  ],
  4: [
    {
      id: "msg_8",
      chatId: 4,
      text: "Hey, did you finish the project?",
      sender: "ai",
      timestamp: new Date(baseTime.getTime() - 26 * 60 * 60000),
      status: "read",
    },
    {
      id: "msg_9",
      chatId: 4,
      text: "Not yet, I need two more days",
      sender: "user",
      timestamp: new Date(baseTime.getTime() - 25 * 60 * 60000),
      status: "read",
    },
  ],
  5: [
    {
      id: "msg_10",
      chatId: 5,
      text: "Remember to buy groceries",
      sender: "user",
      timestamp: new Date(baseTime.getTime() - 7 * 24 * 60 * 60000 - 60000),
      status: "succeeded",
    },
    {
      id: "msg_11",
      chatId: 5,
      text: "Anbari",
      sender: "user",
      timestamp: new Date(baseTime.getTime() - 7 * 24 * 60 * 60000),
      status: "succeeded",
    },
  ],
  6: [
    {
      id: "msg_12",
      chatId: 6,
      text: "چطوری رفیق؟",
      sender: "ai",
      timestamp: new Date(baseTime.getTime() - 170 * 24 * 60 * 60000 - 60000),
      status: "read",
    },
    {
      id: "msg_13",
      chatId: 6,
      text: "خوبم تو چطوری؟",
      sender: "user",
      timestamp: new Date(baseTime.getTime() - 170 * 24 * 60 * 60000 - 30000),
      status: "read",
    },
    {
      id: "msg_14",
      chatId: 6,
      text: "امیدوارم همیشه کامن های گیت هابتون با پول سبز باشه",
      sender: "ai",
      timestamp: new Date(baseTime.getTime() - 170 * 24 * 60 * 60000),
      status: "read",
    },
  ],
});

const getInitialContacts = (): Contact[] => [
  {
    id: 1,
    name: "Belami",
    lastSeen: "last seen recently",
    avatar: `${APP_URL}/assets/avatar/belami.jpg`,
    chatUrl: `${APP_URL}/chats/1`,
  },
  {
    id: 2,
    name: "Hamed Akbari",
    lastSeen: "last seen recently",
    avatar: `${APP_URL}/assets/avatar/hamed.jpg`,
    chatUrl: `${APP_URL}/chats/2`,
  },
  {
    id: 3,
    name: "Telegram",
    lastSeen: "last seen recently",
    avatar: `${APP_URL}/assets/avatar/telegram.jpg`,
    chatUrl: `${APP_URL}/chats/3`,
  },
  {
    id: 4,
    name: "Amir Rahemi",
    lastSeen: "last seen recently",
    avatar: `${APP_URL}/assets/avatar/amir.jpg`,
    chatUrl: `${APP_URL}/chats/4`,
  },
  {
    id: 5,
    name: "Saved Messages",
    lastSeen: "last seen recently",
    avatar: `${APP_URL}/assets/avatar/save-message.jpeg`,
    chatUrl: `${APP_URL}/chats/5`,
  },
  {
    id: 6,
    name: "eldràcu",
    lastSeen: "last seen recently",
    avatar: `${APP_URL}/assets/avatar/eldracu.jpeg`,
    chatUrl: `${APP_URL}/chats/6`,
  },
  {
    id: 7,
    name: "Elon Musk",
    lastSeen: "2025-08-25T09:10:00Z",
    avatar: `${APP_URL}/assets/avatar/hamed.jpg`,
    chatUrl: `${APP_URL}/chats/7`,
  },
  {
    id: 8,
    name: "Taylor Swift",
    lastSeen: "2025-08-25T02:45:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/8`,
  },
  {
    id: 9,
    name: "Cristiano Ronaldo",
    lastSeen: "2025-08-24T21:30:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-1.jpeg`,
    chatUrl: `${APP_URL}/chats/9`,
  },
  {
    id: 10,
    name: "Lionel Messi",
    lastSeen: "2025-08-23T15:20:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/10`,
  },
  {
    id: 11,
    name: "Billie Eilish",
    lastSeen: "2025-08-25T07:55:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/11`,
  },
  {
    id: 12,
    name: "Mark Zuckerberg",
    lastSeen: "2025-08-22T19:00:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-2.jpeg`,
    chatUrl: `${APP_URL}/chats/12`,
  },
  {
    id: 13,
    name: "Zendaya",
    lastSeen: "2025-08-24T12:40:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-3.jpeg`,
    chatUrl: `${APP_URL}/chats/13`,
  },
  {
    id: 14,
    name: "Robert Downey Jr.",
    lastSeen: "2025-08-25T10:00:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-4.jpeg`,
    chatUrl: `${APP_URL}/chats/14`,
  },
  {
    id: 15,
    name: "Ariana Grande",
    lastSeen: "2025-08-21T20:30:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/15`,
  },
  {
    id: 16,
    name: "Dwayne Johnson",
    lastSeen: "2025-08-23T11:15:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/16`,
  },
  {
    id: 17,
    name: "Kylie Jenner",
    lastSeen: "2025-08-25T01:00:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-5.jpeg`,
    chatUrl: `${APP_URL}/chats/17`,
  },
  {
    id: 18,
    name: "Selena Gomez",
    lastSeen: "2025-08-24T08:25:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-6.jpeg`,
    chatUrl: `${APP_URL}/chats/18`,
  },
  {
    id: 19,
    name: "Beyoncé",
    lastSeen: "2025-08-25T03:40:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/19`,
  },
  {
    id: 20,
    name: "Justin Bieber",
    lastSeen: "2025-08-22T23:05:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-7.jpeg`,
    chatUrl: `${APP_URL}/chats/20`,
  },
  {
    id: 21,
    name: "Kim Kardashian",
    lastSeen: "2025-08-23T18:50:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/21`,
  },
  {
    id: 22,
    name: "Oprah Winfrey",
    lastSeen: "2025-08-25T09:30:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-8.jpeg`,
    chatUrl: `${APP_URL}/chats/22`,
  },
  {
    id: 23,
    name: "LeBron James",
    lastSeen: "2025-08-24T13:40:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-9.jpeg`,
    chatUrl: `${APP_URL}/chats/23`,
  },
  {
    id: 24,
    name: "Shakira",
    lastSeen: "2025-08-23T16:20:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-10.jpeg`,
    chatUrl: `${APP_URL}/chats/24`,
  },
  {
    id: 25,
    name: "Tom Cruise",
    lastSeen: "2025-08-21T22:00:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/25`,
  },
  {
    id: 26,
    name: "Keanu Reeves",
    lastSeen: "2025-08-22T14:15:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-11.jpeg`,
    chatUrl: `${APP_URL}/chats/26`,
  },
  {
    id: 27,
    name: "Chris Hemsworth",
    lastSeen: "2025-08-25T06:20:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-12.jpeg`,
    chatUrl: `${APP_URL}/chats/27`,
  },
  {
    id: 28,
    name: "Scarlett Johansson",
    lastSeen: "2025-08-24T15:55:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/28`,
  },
  {
    id: 29,
    name: "Angelina Jolie",
    lastSeen: "2025-08-22T17:45:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-13.jpeg`,
    chatUrl: `${APP_URL}/chats/29`,
  },
  {
    id: 30,
    name: "Brad Pitt",
    lastSeen: "2025-08-25T04:10:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/30`,
  },
  {
    id: 31,
    name: "Leonardo DiCaprio",
    lastSeen: "2025-08-23T09:05:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-14.jpeg`,
    chatUrl: `${APP_URL}/chats/31`,
  },
  {
    id: 32,
    name: "Megan Fox",
    lastSeen: "2025-08-24T19:20:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/32`,
  },
  {
    id: 33,
    name: "Post Malone",
    lastSeen: "2025-08-25T08:50:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-15.jpeg`,
    chatUrl: `${APP_URL}/chats/33`,
  },
  {
    id: 34,
    name: "Rihanna",
    lastSeen: "2025-08-21T11:40:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/34`,
  },
  {
    id: 35,
    name: "Ed Sheeran",
    lastSeen: "2025-08-24T22:10:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-16.jpeg`,
    chatUrl: `${APP_URL}/chats/35`,
  },
  {
    id: 36,
    name: "Adele",
    lastSeen: "2025-08-22T13:25:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-17.jpeg`,
    chatUrl: `${APP_URL}/chats/36`,
  },
  {
    id: 37,
    name: "Drake",
    lastSeen: "2025-08-25T05:15:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-18.jpeg`,
    chatUrl: `${APP_URL}/chats/37`,
  },
  {
    id: 38,
    name: "Snoop Dogg",
    lastSeen: "2025-08-23T20:40:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/38`,
  },
  {
    id: 39,
    name: "Eminem",
    lastSeen: "2025-08-22T10:00:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-19.jpeg`,
    chatUrl: `${APP_URL}/chats/39`,
  },
  {
    id: 40,
    name: "Kendrick Lamar",
    lastSeen: "2025-08-24T16:35:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-20.jpeg`,
    chatUrl: `${APP_URL}/chats/40`,
  },
  {
    id: 41,
    name: "Lady Gaga",
    lastSeen: "2025-08-21T15:55:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/41`,
  },
  {
    id: 42,
    name: "Johnny Depp",
    lastSeen: "2025-08-25T07:00:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/42`,
  },
  {
    id: 43,
    name: "Emma Watson",
    lastSeen: "2025-08-23T12:20:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-21.jpeg`,
    chatUrl: `${APP_URL}/chats/43`,
  },
  {
    id: 44,
    name: "Daniel Radcliffe",
    lastSeen: "2025-08-24T18:50:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/44`,
  },
  {
    id: 45,
    name: "Gal Gadot",
    lastSeen: "2025-08-25T02:30:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-22.jpeg`,
    chatUrl: `${APP_URL}/chats/45`,
  },
  {
    id: 46,
    name: "Chris Evans",
    lastSeen: "2025-08-23T21:25:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-23.jpeg`,
    chatUrl: `${APP_URL}/chats/46`,
  },
  {
    id: 47,
    name: "Tom Holland",
    lastSeen: "2025-08-25T00:40:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/47`,
  },
  {
    id: 48,
    name: "Zendaya",
    lastSeen: "2025-08-24T09:50:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-24.jpeg`,
    chatUrl: `${APP_URL}/chats/48`,
  },
  {
    id: 49,
    name: "Miley Cyrus",
    lastSeen: "2025-08-23T17:10:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-25.jpeg`,
    chatUrl: `${APP_URL}/chats/49`,
  },
  {
    id: 50,
    name: "Bruno Mars",
    lastSeen: "2025-08-22T08:15:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-26.jpeg`,
    chatUrl: `${APP_URL}/chats/50`,
  },
  {
    id: 51,
    name: "Shawn Mendes",
    lastSeen: "2025-08-21T23:30:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/51`,
  },
  {
    id: 52,
    name: "Will Smith",
    lastSeen: "2025-08-22T18:40:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/52`,
  },
  {
    id: 53,
    name: "Jaden Smith",
    lastSeen: "2025-08-24T14:05:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-27.jpeg`,
    chatUrl: `${APP_URL}/chats/53`,
  },
  {
    id: 54,
    name: "Kanye West",
    lastSeen: "2025-08-25T03:15:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-28.jpeg`,
    chatUrl: `${APP_URL}/chats/54`,
  },
  {
    id: 55,
    name: "Travis Scott",
    lastSeen: "2025-08-23T08:25:00Z",
    avatar: `${APP_URL}/assets/avatar/`,
    chatUrl: `${APP_URL}/chats/55`,
  },
  {
    id: 56,
    name: "Dua Lipa",
    lastSeen: "2025-08-25T06:55:00Z",
    avatar: `${APP_URL}/assets/avatar/avatar-29.jpeg`,
    chatUrl: `${APP_URL}/chats/56`,
  },
];

// Enhanced utility function to format relative time
const formatRelativeTime = (timestamp: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - timestamp.getTime()) / (1000 * 60)
  );
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInMinutes < 1) return "now";
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24)
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7)
    return timestamp.toLocaleDateString("en-US", { weekday: "short" });
  if (diffInWeeks < 4) return `${diffInWeeks}w`;
  if (diffInDays < 365)
    return timestamp.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  return timestamp.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        chats: [],
        messages: {},
        contacts: [],
        selectedChatId: null,
        isLoading: false,
        onlineStatus: {},
        isInitialized: false,

        // Initialize store with mock data - only once
        initializeStore: () => {
          const state = get();

          // Prevent re-initialization
          if (state.isInitialized && state.chats.length > 0) {
            return;
          }

          const initialChats = getInitialChats();
          const sortedChats = initialChats.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;

            const timeA = a.lastMessageTimestamp?.getTime() || 0;
            const timeB = b.lastMessageTimestamp?.getTime() || 0;
            return timeB - timeA;
          });

          set({
            chats: sortedChats,
            messages: getInitialMessages(),
            contacts: getInitialContacts(),
            onlineStatus: {
              1: false,
              2: true,
              3: false,
              4: false,
              5: false,
              6: false,
            },
            isInitialized: true,
          });
        },

        // Set selected chat
        setSelectedChat: (chatId) => {
          set({ selectedChatId: chatId });
          get().markMessagesAsRead(chatId);
        },

        // Add a new message with real-time chat reordering
        addMessage: (chatId, messageData) => {
          const messageId = `msg_${chatId}_${Date.now()}_${Math.floor(
            Math.random() * 1000
          )}`;
          const newMessage: Message = {
            id: messageId,
            chatId,
            timestamp: new Date(),
            ...messageData,
          };

          set((state) => {
            const updatedMessages = {
              ...state.messages,
              [chatId]: [...(state.messages[chatId] || []), newMessage],
            };

            return { messages: updatedMessages };
          });

          get().updateChatLastMessage(
            chatId,
            messageData.text,
            newMessage.timestamp
          );

          if (messageData.sender === "ai" && get().selectedChatId !== chatId) {
            get().incrementUnreadCount(chatId);
          }
        },

        // Update message status
        updateMessageStatus: (messageId, status) => {
          set((state) => {
            const updatedMessages = { ...state.messages };

            Object.keys(updatedMessages).forEach((chatId) => {
              updatedMessages[Number(chatId)] = updatedMessages[
                Number(chatId)
              ].map((msg) => (msg.id === messageId ? { ...msg, status } : msg));
            });

            return { messages: updatedMessages };
          });
        },

        // Get messages for a specific chat
        getChatMessages: (chatId) => {
          return get().messages[chatId] || [];
        },

        // Get chat by ID
        getChat: (chatId) => {
          return get().chats.find((chat) => chat.id === chatId);
        },

        // Enhanced sorting with pinned chats priority
        sortChatsByLastMessage: () => {
          set((state) => ({
            chats: [...state.chats].sort((a, b) => {
              if (a.isPinned && !b.isPinned) return -1;
              if (!a.isPinned && b.isPinned) return 1;

              const timeA =
                a.lastMessageTimestamp instanceof Date
                  ? a.lastMessageTimestamp.getTime()
                  : a.lastMessageTimestamp
                  ? new Date(a.lastMessageTimestamp).getTime()
                  : 0;
              const timeB =
                b.lastMessageTimestamp instanceof Date
                  ? b.lastMessageTimestamp.getTime()
                  : b.lastMessageTimestamp
                  ? new Date(b.lastMessageTimestamp).getTime()
                  : 0;
              return timeB - timeA;
            }),
          }));
        },

        // Update chat's last message and reorder chats in real-time
        updateChatLastMessage: (chatId, message, timestamp = new Date()) => {
          set((state) => {
            const updatedChats = state.chats.map((chat) => {
              if (chat.id === chatId) {
                return {
                  ...chat,
                  lastMessage: message,
                  lastMessageTime: formatRelativeTime(timestamp),
                  lastMessageTimestamp: timestamp,
                };
              }
              return chat;
            });

            return {
              chats: updatedChats.sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;

                const timeA =
                  a.lastMessageTimestamp instanceof Date
                    ? a.lastMessageTimestamp.getTime()
                    : a.lastMessageTimestamp
                    ? new Date(a.lastMessageTimestamp).getTime()
                    : 0;
                const timeB =
                  b.lastMessageTimestamp instanceof Date
                    ? b.lastMessageTimestamp.getTime()
                    : b.lastMessageTimestamp
                    ? new Date(b.lastMessageTimestamp).getTime()
                    : 0;
                return timeB - timeA;
              }),
            };
          });
        },

        // Mark messages as read and clear unread count
        markMessagesAsRead: (chatId) => {
          set((state) => {
            const updatedChats = state.chats.map((chat) =>
              chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
            );

            const updatedMessages = {
              ...state.messages,
              [chatId]: (state.messages[chatId] || []).map((msg) => ({
                ...msg,
                status: msg.sender === "ai" ? "read" : msg.status,
              })),
            };

            return { chats: updatedChats, messages: updatedMessages };
          });
        },

        // Create new chat from contact
        createNewChat: (contact) => {
          const chatExists = get().chats.find((chat) => chat.id === contact.id);
          if (chatExists) return;

          const newChat: Chat = {
            id: contact.id,
            name: contact.name,
            lastMessage: "",
            lastMessageTime: "now",
            unreadCount: 0,
            avatar: contact.avatar,
            isOnline: null,
            isPinned: false,
            messageStatus: null,
            number: "",
            userName: "",
            bio: "",
            lastMessageTimestamp: new Date(),
          };

          set((state) => ({
            chats: [newChat, ...state.chats],
            messages: {
              ...state.messages,
              [contact.id]: [],
            },
          }));
        },

        // Pin/unpin chat
        pinChat: (chatId, isPinned) => {
          set((state) => {
            const updatedChats = state.chats.map((chat) =>
              chat.id === chatId ? { ...chat, isPinned } : chat
            );

            return {
              chats: updatedChats.sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;

                const timeA =
                  a.lastMessageTimestamp instanceof Date
                    ? a.lastMessageTimestamp.getTime()
                    : a.lastMessageTimestamp
                    ? new Date(a.lastMessageTimestamp).getTime()
                    : 0;
                const timeB =
                  b.lastMessageTimestamp instanceof Date
                    ? b.lastMessageTimestamp.getTime()
                    : b.lastMessageTimestamp
                    ? new Date(b.lastMessageTimestamp).getTime()
                    : 0;
                return timeB - timeA;
              }),
            };
          });
        },

        // Delete chat
        deleteChat: (chatId) => {
          set((state) => {
            const updatedMessages = { ...state.messages };
            delete updatedMessages[chatId];

            return {
              chats: state.chats.filter((chat) => chat.id !== chatId),
              messages: updatedMessages,
              selectedChatId:
                state.selectedChatId === chatId ? null : state.selectedChatId,
            };
          });
        },

        // Set typing status for a chat
        setTypingStatus: (chatId, isTyping) => {
          set((state) => ({
            chats: state.chats.map((chat) =>
              chat.id === chatId ? { ...chat, isTyping } : chat
            ),
          }));
        },

        // Set online status for a chat
        setOnlineStatus: (chatId, isOnline) => {
          set((state) => ({
            chats: state.chats.map((chat) =>
              chat.id === chatId ? { ...chat, isOnline } : chat
            ),
            onlineStatus: {
              ...state.onlineStatus,
              [chatId]: isOnline,
            },
          }));
        },

        // Increment unread count
        incrementUnreadCount: (chatId) => {
          set((state) => ({
            chats: state.chats.map((chat) =>
              chat.id === chatId
                ? { ...chat, unreadCount: chat.unreadCount + 1 }
                : chat
            ),
          }));
        },

        // Get chats sorted by activity (for sidebar display)
        getChatsSortedByActivity: () => {
          const { chats } = get();
          return [...chats].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;

            const timeA =
              a.lastMessageTimestamp instanceof Date
                ? a.lastMessageTimestamp.getTime()
                : a.lastMessageTimestamp
                ? new Date(a.lastMessageTimestamp).getTime()
                : 0;
            const timeB =
              b.lastMessageTimestamp instanceof Date
                ? b.lastMessageTimestamp.getTime()
                : b.lastMessageTimestamp
                ? new Date(b.lastMessageTimestamp).getTime()
                : 0;
            return timeB - timeA;
          });
        },

        getContacts: () => {
          return get().contacts;
        },

        addContact: (contactData) => {
          const newContact: Contact = {
            id: Math.max(0, ...get().contacts.map((c) => c.id)) + 1,
            ...contactData,
          };

          set((state) => ({
            contacts: [...state.contacts, newContact],
          }));
        },

        updateContactLastSeen: (contactId, lastSeen) => {
          set((state) => ({
            contacts: state.contacts.map((contact) =>
              contact.id === contactId ? { ...contact, lastSeen } : contact
            ),
          }));
        },
      }),
      {
        name: "telegram-chat-store",
        partialize: (state) => ({
          chats: state.chats.map((chat) => ({
            ...chat,
            lastMessageTimestamp:
              chat.lastMessageTimestamp instanceof Date
                ? chat.lastMessageTimestamp.toISOString()
                : chat.lastMessageTimestamp,
          })),
          messages: Object.fromEntries(
            Object.entries(state.messages).map(([chatId, messages]) => [
              chatId,
              messages.map((msg) => ({
                ...msg,
                timestamp:
                  msg.timestamp instanceof Date
                    ? msg.timestamp.toISOString()
                    : msg.timestamp,
              })),
            ])
          ),
          contacts: state.contacts,
          isInitialized: state.isInitialized,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Convert string timestamps back to Date objects
            state.chats = state.chats.map((chat) => ({
              ...chat,
              lastMessageTimestamp:
                chat.lastMessageTimestamp &&
                typeof chat.lastMessageTimestamp === "string"
                  ? new Date(chat.lastMessageTimestamp)
                  : chat.lastMessageTimestamp,
            }));

            state.messages = Object.fromEntries(
              Object.entries(state.messages).map(([chatId, messages]) => [
                chatId,
                messages.map((msg) => ({
                  ...msg,
                  timestamp:
                    msg.timestamp && typeof msg.timestamp === "string"
                      ? new Date(msg.timestamp)
                      : msg.timestamp,
                })),
              ])
            );
          }
        },
      }
    ),
    {
      name: "chat-store",
    }
  )
);
