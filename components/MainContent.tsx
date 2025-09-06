// Path: components/MainContent.tsx
"use client";

import React from "react";

// interface MainContentProps {
//   showUserProfile: boolean;
// }

export default function MainContent() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#0F0F0F] bg-[url(/assets/image/chat-bg-br.png)] dark:bg-[url(/assets/image/chat-bg-pattern-dark.png)]">
      <p className="text-gray-500 dark:text-gray-400 flex justify-center items-center w-full h-screen">
        Select a chat to start messaging
      </p>
    </div>
  );
}
