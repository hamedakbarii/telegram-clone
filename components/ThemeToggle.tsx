// Path: components/ThemeToggle.tsx
"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // This prevents the click from reaching parent elements
    toggleTheme();
  };

  return (
    <div onClick={handleClick} className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer">
      <button
        className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <FiMoon size={20} className="mr-2 w-5 h-5" />
        ) : (
          <IoSunnyOutline size={20} className="mr-2 w-5 h-5" />
        )}
      </button>
    </div>

  );
}