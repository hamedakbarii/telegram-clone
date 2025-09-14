# Telegram Clone

A modern Telegram web application clone built with Next.js, TypeScript, and Zustand for state management. This project replicates the core functionality and user interface of Telegram with responsive design and real-time chat simulation.

## 🚀 Features

### Core Chat Features
- Real-time Messaging: Send and receive messages with realistic delivery status indicators
- Message Status Tracking: Visual indicators for sent, delivered, and read messages
- Typing Indicators: Live typing status display during conversations
- Chat Sorting: Automatic chat reordering based on last message timestamp
- Pinned Chats: Pin important conversations to the top of the chat list
- Unread Message Counter: Track unread messages with badge indicators

### User Interface
- Responsive Design: Fully responsive layout that works on desktop, tablet, and mobile  devices
- Dark Theme: Modern dark theme UI matching Telegram's design language
- Emoji Support: Integrated emoji picker for message composition
- User Avatars: Profile pictures with fallback to initials and color-coded backgrounds
- Chat Search: Search functionality for finding specific chats (UI ready)
- User Info Panel: Detailed user information sidebar with contact details

### Chat Management
- Multiple Chat Types: Support for individual chats, groups, and special chats (Saved Messages, Archived Chats)
- Contact Management: Built-in contact list with 50+ mock contacts
- Online Status: Real-time online/offline status indicators
- Message Timestamps: Smart timestamp display (now, minutes ago, time, date, etc.)
- Chat Context Menu: Comprehensive chat options (edit, mute, delete, etc.)

### Advanced Features
- Saved Messages: Personal space for saving important messages
- Archived Chats: Archive functionality for organizing conversations
- Persistent Storage: State persistence using Zustand with localStorage

### Technical Features
- Mock Data Simulation: Realistic chat behavior with automated responses
- State Management: Robust state management with Zustand store
- TypeScript: Full TypeScript support for type safety
- SSR Compatible: Server-side rendering support with proper hydration
- Performance Optimized: Efficient rendering and memory management

## 🛠 Tech Stack

- Framework: Next.js 15
- Language: TypeScript
- State Management: Zustand with persistence
- Styling: Tailwind CSS
- Icons: React Icons (Ionicons, Heroicons, etc.)
- Emoji Picker: emoji-picker-react
- Authentication Store: Zustand-based auth management

## 📸 Screenshot

![Telegram Clone Main Interface](screenshot.png)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/telegram-clone.git
cd telegram-clone
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open in your browser.
```
http://localhost:3000
```

## 🌐 Live Demo

Experience the application live:

[![Vercel](https://img.shields.io/badge/Vercel-Live_Demo-black?style=for-the-badge&logo=vercel)](https://telegram-clone-three-lyart.vercel.app/)
<!-- [![Netlify](https://img.shields.io/badge/Netlify-Live_Demo-blue?style=for-the-badge&logo=netlify)](https://your-netlify-app.netlify.app) -->

Main Deployment: [https://telegram-clone-three-lyart.vercel.app/](https://telegram-clone-three-lyart.vercel.app/)

*Note: The live demo contains mock data and simulated chat features.*

## 🏗️ Project Structure
```bash
├── app/
│   ├── chats/
│   │   ├── [chatId]/
│   │   │   └── page.tsx       # Individual chat page
│   │   ├── layout.tsx         # Chat layout with sidebar
│   │   └── page.tsx           # Chat list page
│   └── layout.tsx             # Root layout
├── components/
│   ├── ChatSidebar.tsx        # Main chat sidebar component
│   └── MainContent.tsx        # Chat list main content
├── store/
│   ├── useChatStore.ts        # Main chat state management
│   └── useAuthStore.ts        # Authentication state
├── lib/
│   └── utils/                 # Utility functions
└── public/
    └── assets/                # Static assets (avatars, images)
```

## 🎯 Usage

### Navigation
- Desktop: Sidebar is always visible alongside the main content
- Mobile: Responsive navigation with slide-in sidebar
- Chat Selection: Click on any chat to start messaging

### Messaging
- Send Messages: Type in the input field and press Enter or click send button
- Emoji: Click the smile icon to open emoji picker
- Voice Messages: Voice button appears when input is empty (UI placeholder)
- File Attachments: Paperclip icon for file uploads (UI placeholder)

### Chat Management
- Pin Chats: Use the context menu to pin important conversations
- User Info: Click on chat header to view user details
- Search: Use the search icon to find specific chats
- Archive: Move chats to archived section

## 🔧 Configuration

### Mock Data
The application uses comprehensive mock data including:
- 7 initial chats with varied content (English/Persian)
- 50+ mock contacts with realistic names and avatars
- Pre-populated message history
- Simulated online/offline status

## 📱 Responsive Design

- Mobile: Full-screen chat interface with slide navigation
- Tablet: Adaptive layout with collapsible sidebar
- Desktop: Traditional two-panel layout with persistent sidebar

## 🔄 State Management

The application uses Zustand for state management with:
- Persistent Storage: Chat data persists across browser sessions
- Real-time Updates: Immediate UI updates for all chat operations
- Type Safety: Full TypeScript integration
- Devtools Support: Redux DevTools integration for debugging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 👥 Team

This project is collaboratively developed by our frontend development team:

- [Amir Rahemi] - [@amirrahemi01](https://github.com/amirrahemi01)
- [Hamed Akbari] - [@hamedakbarii](https://github.com/hamedakbarii)

Shared Responsibilities:
- Frontend Development
- UI/UX Design  
- State Management
- Component Architecture

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Telegram for the inspiration and design reference
- Next.js team for the amazing framework
- Zustand for the excellent state management solution
- React Icons for the comprehensive icon library

## 📞 Contact

For questions or collaboration inquiries:

- [Hamed Akbari] - [@HamedAkbarii](https://linkedin.com/in/hamedakbarii) - hamedakbariwork@gmail.com
- [Amir Rahemi] - [@AmirRahemi](https://linkedin.com/in/amirrahemi) - amirrahemi01@gmail.com

Project Link: [https://github.com/hamedakbarii/telegram-clone/](https://github.com/hamedakbarii/telegram-clone/)

---

Note: This is a demonstration project and not affiliated with Telegram. All trademarks belong to their respective owners.