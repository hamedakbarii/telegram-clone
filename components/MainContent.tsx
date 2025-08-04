// Path: components/MainContent.tsx
"use client";

import React from "react";

interface MainContentProps {
  showUserProfile: boolean;
}

export default function MainContent({ showUserProfile }: MainContentProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#0F0F0F] bg-[url(/assets/image/chat-bg-br.png)] dark:bg-[url(/assets/image/chat-bg-pattern-dark.png)]">
      {/* <p className="text-gray-500 dark:text-gray-400">
        {showUserProfile
          ? "User profile view"
          : "Select a chat to start messaging"}
      </p> */}
      <p className="text-gray-500 dark:text-gray-400">
        Select a chat to start messaging
      </p>
    </div>
  );
}
