// Path: lib/mocks/message.ts
export interface Message {
  id: number;
  chatId: number;
  senderId: number;
  senderName: string;
  text: string;
  timestamp: string;
  isOwnMessage: boolean;
  status: 'sending' | 'succeeded' | 'read' | 'failed';
  type: 'text' | 'image' | 'file';
  mediaUrl?: string;
  fileName?: string;
}

export const messages: Message[] = [
  // Archived Chats (id: 0)
  {
    id: 1,
    chatId: 0,
    senderId: 1,
    senderName: "Pavel Durov",
    text: "Welcome to Telegram!",
    timestamp: "12:25 PM",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },
  {
    id: 2,
    chatId: 0,
    senderId: 2,
    senderName: "BotFather",
    text: "Hello! I can help you create and manage bots.",
    timestamp: "12:26 PM",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },
  {
    id: 3,
    chatId: 0,
    senderId: 3,
    senderName: "FoxNews",
    text: "Breaking news: Latest updates from around the world.",
    timestamp: "12:28 PM",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },

  // Belami (id: 1)
  {
    id: 4,
    chatId: 1,
    senderId: 4,
    senderName: "Belami",
    text: "سلام، چطور میتونم کمک کنم؟",
    timestamp: "12:20 PM",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },
  {
    id: 5,
    chatId: 1,
    senderId: 0, // current user
    senderName: "You",
    text: "یک مدل خاص رو میخواستم",
    timestamp: "12:25 PM",
    isOwnMessage: true,
    status: 'read',
    type: 'text'
  },
  {
    id: 6,
    chatId: 1,
    senderId: 4,
    senderName: "Belami",
    text: "سفارش با موفقیت ثبت شد ✅",
    timestamp: "12:30 PM",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },

  // Hamed Akbari (id: 2)
  {
    id: 7,
    chatId: 2,
    senderId: 5,
    senderName: "Hamed Akbari",
    text: "Salam Pesar",
    timestamp: "11:10 AM",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },
  {
    id: 8,
    chatId: 2,
    senderId: 0, // current user
    senderName: "You",
    text: "Salam! Chetori?",
    timestamp: "11:12 AM",
    isOwnMessage: true,
    status: 'read',
    type: 'text'
  },
  {
    id: 9,
    chatId: 2,
    senderId: 5,
    senderName: "Hamed Akbari",
    text: "Khoobam Merci! To chetor?",
    timestamp: "11:15 AM",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },

  // Telegram (id: 3)
  {
    id: 10,
    chatId: 3,
    senderId: 6,
    senderName: "Telegram",
    text: "Login code: 46619. Do not give this code to anyone, even if they say they are from Telegram!",
    timestamp: "Yesterday",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },

  // Amir Rahemi (id: 4)
  {
    id: 11,
    chatId: 4,
    senderId: 7,
    senderName: "Amir Rahemi",
    text: "Hey, did you finish the project?",
    timestamp: "Yesterday",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },
  {
    id: 12,
    chatId: 4,
    senderId: 0, // current user
    senderName: "You",
    text: "Not yet, I need two more days",
    timestamp: "Yesterday",
    isOwnMessage: true,
    status: 'read',
    type: 'text'
  },

  // Saved Messages (id: 5)
  {
    id: 13,
    chatId: 5,
    senderId: 0, // current user
    senderName: "You",
    text: "Remember to buy groceries",
    timestamp: "Mon",
    isOwnMessage: true,
    status: 'succeeded',
    type: 'text'
  },
  {
    id: 14,
    chatId: 5,
    senderId: 0, // current user
    senderName: "You",
    text: "Anbari",
    timestamp: "Mon",
    isOwnMessage: true,
    status: 'succeeded',
    type: 'text'
  },

  // eldràcu (id: 6)
  {
    id: 15,
    chatId: 6,
    senderId: 8,
    senderName: "eldràcu",
    text: "چطوری رفیق؟",
    timestamp: "Jul 27",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  },
  {
    id: 16,
    chatId: 6,
    senderId: 0, // current user
    senderName: "You",
    text: "خوبم تو چطوری؟",
    timestamp: "Jul 27",
    isOwnMessage: true,
    status: 'read',
    type: 'text'
  },
  {
    id: 17,
    chatId: 6,
    senderId: 8,
    senderName: "eldràcu",
    text: "امیدوارم همیشه چمن های گیت هابتون با پول سبز باشه",
    timestamp: "Jul 27",
    isOwnMessage: false,
    status: 'read',
    type: 'text'
  }
];