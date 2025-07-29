// Path: components/SearchInput.tsx
"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  return (
    <div className="flex-1 relative cursor-text">
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 border-[#2d2d2d] dark:border-[#2d2d2d] bg-[#2d2d2d] dark:bg-[#2d2d2d] rounded-3xl focus:outline-none"
      />
      <FiSearch
        size={20}
        className="absolute left-3 top-2.5 text-gray-500"
      />
    </div>
  );
}