// Path: lib/utils/chatSimulation.ts
import { useChatStore } from "@/store/useChatStore";

export class ChatSimulation {
  private static instance: ChatSimulation;
  private intervals: NodeJS.Timeout[] = [];
  private store: any;
  private isInitialized = false;

  constructor() {
    // We'll get the store instance when needed
  }

  static getInstance(): ChatSimulation {
    if (!ChatSimulation.instance) {
      ChatSimulation.instance = new ChatSimulation();
    }
    return ChatSimulation.instance;
  }

  // Initialize realistic behaviors - only once
  initialize(store: any) {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    this.store = store;
    this.isInitialized = true;
    
    // Start simulations with slight delays to prevent immediate execution
    setTimeout(() => this.startOnlineStatusSimulation(), 5000);
    setTimeout(() => this.startRandomMessages(), 10000);
    setTimeout(() => this.startTypingSimulation(), 8000);
  }

  // Simulate random online/offline status changes
  private startOnlineStatusSimulation() {
    if (typeof window === 'undefined') return;
    
    const interval = setInterval(() => {
      try {
        const chats = this.store.getState().chats;
        const activeChats = chats.filter((chat: any) => chat.id !== 0 && chat.id !== 5); // Exclude archived and saved messages

        if (activeChats.length > 0) {
          const randomChat = activeChats[Math.floor(Math.random() * activeChats.length)];
          const currentStatus = randomChat.isOnline;
          const newStatus = Math.random() > 0.7 ? !currentStatus : currentStatus;
          
          this.store.getState().setOnlineStatus(randomChat.id, newStatus);
        }
      } catch (error) {
        console.warn('Online status simulation error:', error);
      }
    }, 30000); // Every 30 seconds

    this.intervals.push(interval);
  }

  // Simulate random incoming messages
  private startRandomMessages() {
    if (typeof window === 'undefined') return;
    
    const interval = setInterval(() => {
      try {
        const chats = this.store.getState().chats;
        const activeChats = chats.filter((chat: any) => 
          chat.id !== 0 && chat.id !== 5 && Math.random() > 0.85 // Only 15% chance
        );

        if (activeChats.length > 0) {
          const randomChat = activeChats[Math.floor(Math.random() * activeChats.length)];
          this.simulateIncomingMessage(randomChat.id);
        }
      } catch (error) {
        console.warn('Random message simulation error:', error);
      }
    }, 90000); // Every 1.5 minutes (increased from 1 minute)

    this.intervals.push(interval);
  }

  // Simulate typing indicators
  private startTypingSimulation() {
    if (typeof window === 'undefined') return;
    
    const interval = setInterval(() => {
      try {
        const chats = this.store.getState().chats;
        const onlineChats = chats.filter((chat: any) => chat.isOnline && Math.random() > 0.92); // Only 8% chance

        onlineChats.forEach((chat: any) => {
          // Start typing
          this.store.getState().setTypingStatus(chat.id, true);
          
          // Stop typing after 2-5 seconds
          setTimeout(() => {
            try {
              this.store.getState().setTypingStatus(chat.id, false);
              
              // Sometimes send a message after typing (30% chance)
              if (Math.random() > 0.7) {
                setTimeout(() => {
                  this.simulateIncomingMessage(chat.id);
                }, 1000 + Math.random() * 2000);
              }
            } catch (error) {
              console.warn('Typing simulation cleanup error:', error);
            }
          }, 2000 + Math.random() * 3000);
        });
      } catch (error) {
        console.warn('Typing simulation error:', error);
      }
    }, 60000); // Every minute (increased from 45 seconds)

    this.intervals.push(interval);
  }

  // Simulate an incoming message
  private simulateIncomingMessage(chatId: number) {
    try {
      if (!this.store || typeof window === 'undefined') return;
      
      const messages = this.getRandomMessages(chatId);
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      this.store.getState().addMessage(chatId, {
        text: randomMessage,
        sender: "ai",
      });
    } catch (error) {
      console.warn('Simulate incoming message error:', error);
    }
  }

  // Get random messages based on chat type
  private getRandomMessages(chatId: number): string[] {
    try {
      const chat = this.store.getState().getChat(chatId);
      if (!chat) return ["Hello!"];

      if (chat.name.includes("Telegram")) {
        return [
          "New security feature available!",
          "Your account is secure.",
          "Update available for better experience.",
          "Premium features unlocked!",
          "New stickers pack added!",
          "Voice messages 2.0 is now available!",
          "Channel recommendations updated.",
        ];
      }

      if (chat.name.includes("Belami")) {
        return [
          "محصول جدید اضافه شد!",
          "تخفیف ویژه برای شما",
          "سفارش شما در حال پردازش است",
          "کیفیت محصولات بررسی شد ✅",
          "پشتیبانی 24 ساعته در خدمت شما",
          "تشکر از انتخاب ما 🙏",
          "محصولات پیشنهادی برای شما",
        ];
      }

      if (chat.name.includes("Hamed")) {
        return [
          "Hey, how's it going?",
          "Did you see the latest updates?",
          "Want to grab coffee later?",
          "Working on something cool!",
          "Check this out when you have time",
          "How's the project coming along?",
          "Let's catch up soon!",
        ];
      }

      if (chat.name.includes("Amir")) {
        return [
          "The project is coming along nicely",
          "Need your input on this feature",
          "Meeting at 3 PM tomorrow?",
          "Code review ready",
          "Found an interesting solution",
          "Let's discuss the requirements",
          "Good progress on the frontend",
        ];
      }

      if (chat.name.includes("eldrÃ  cu")) {
        return [
          "همیشه سلامت باشی رفیق!",
          "چطوری کاری که گفتم انجام شد؟",
          "یادت نره فردا قراره بریم فوتسال.",
          "پروژه جدیدم رو دیدی؟ نظرت چیه؟",
          "کدهای جدیدت خیلی تمیز شدن.",
          "فردا میتونی بیای دفترمون؟",
          "امیدوارم همیشه موفق باشی 💚",
        ];
      }

      // Default messages
      return [
        "Hey! How are you?",
        "What's up?",
        "Hope you're having a great day!",
        "How's everything going?",
        "Long time no talk!",
        "Miss our conversations",
        "Thinking of you!",
      ];
    } catch (error) {
      console.warn('Get random messages error:', error);
      return ["Hello!"];
    }
  }

  // Clean up intervals
  destroy() {
    this.intervals.forEach(interval => {
      try {
        clearInterval(interval);
      } catch (error) {
        console.warn('Clear interval error:', error);
      }
    });
    this.intervals = [];
    this.isInitialized = false;
  }

  // Manually trigger a random activity
  triggerRandomActivity() {
    try {
      if (!this.store || typeof window === 'undefined') return;
      
      const chats = this.store.getState().chats;
      const activeChats = chats.filter((chat: any) => chat.id !== 0 && chat.id !== 5);
      
      if (activeChats.length > 0) {
        const randomChat = activeChats[Math.floor(Math.random() * activeChats.length)];
        
        const activities = [
          () => this.simulateIncomingMessage(randomChat.id),
          () => this.store.getState().setOnlineStatus(randomChat.id, !randomChat.isOnline),
          () => {
            this.store.getState().setTypingStatus(randomChat.id, true);
            setTimeout(() => {
              this.store.getState().setTypingStatus(randomChat.id, false);
            }, 3000);
          }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        randomActivity();
      }
    } catch (error) {
      console.warn('Trigger random activity error:', error);
    }
  }
}

// Hook to use the chat simulation - with better error handling
export const useChatSimulation = () => {
  const store = useChatStore;
  
  const startSimulation = () => {
    try {
      if (typeof window === 'undefined') {
        return null;
      }
      
      const simulation = ChatSimulation.getInstance();
      simulation.initialize(store);
      return simulation;
    } catch (error) {
      console.warn('Start simulation error:', error);
      return null;
    }
  };

  const stopSimulation = () => {
    try {
      const simulation = ChatSimulation.getInstance();
      simulation.destroy();
    } catch (error) {
      console.warn('Stop simulation error:', error);
    }
  };

  const triggerRandomActivity = () => {
    try {
      const simulation = ChatSimulation.getInstance();
      simulation.triggerRandomActivity();
    } catch (error) {
      console.warn('Trigger activity error:', error);
    }
  };

  return {
    startSimulation,
    stopSimulation,
    triggerRandomActivity
  };
};