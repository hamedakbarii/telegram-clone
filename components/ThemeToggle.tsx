// components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

export function ThemeToggle() {
  // Initialize state with undefined to handle SSR
  const [theme, setTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      // Set both class and data-theme attribute for maximum compatibility
      document.documentElement.className = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTheme();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggleTheme();
  };

  // Don't render until theme is initialized (avoid flash of wrong theme)
  if (theme === undefined) {
    return null;
  }

  return (
    <div 
      onClick={handleClick} 
      className="flex items-center justify-between px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer"
    >
      <button
        className="flex rounded-full"
        aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <FiMoon size={20} className="mr-2 w-5 h-5" />
        ) : (
          <IoSunnyOutline size={20} className="mr-2 w-5 h-5" />
        )}
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      {/* Toggle Button */}
      <label className="inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}> 
        <input 
          type="checkbox" 
          checked={theme === "dark"} 
          onChange={handleInputChange}
          className="sr-only peer"
        />
        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-transparent rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#8774E1] dark:peer-checked:bg-[#8774E1]"></div>
      </label>
    </div>
  );
}