// components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Load saved or system-preferred theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);
  }, []);

  // Persist and apply theme
  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  if (!theme) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-between px-4 py-2 text-sm font-medium transition duration-300 w-full cursor-pointer select-none"
    >
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2"
        aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? <FiMoon size={20} /> : <IoSunnyOutline size={20} />}
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 peer-checked:bg-[#8774E1] dark:peer-checked:bg-[#8774E1] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 dark:after:border-gray-600 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full" />
      </label>
    </div>
  );
}
