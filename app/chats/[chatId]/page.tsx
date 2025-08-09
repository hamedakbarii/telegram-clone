// Path: app/chat/[chatId]/page.tsx
import { ThemeToggle } from "@/components/ThemeToggle";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

export default function Page({ params }: Props) {
  // const { chatId } = params;

  return (
    <div className="bg-white dark:bg-slate-300 p-4 min-h-screen">
      <p className="text-black dark:text-white">page: </p>
      <ThemeToggle />
    </div>
  );
}
