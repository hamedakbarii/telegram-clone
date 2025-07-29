// Path: components/SearchInput.tsx
"use client";

import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchInput({ 
  onSearch, 
  placeholder = "Search" 
}: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
  };

  return (
    <div className="flex-1 relative cursor-text">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full pl-10 pr-10 py-2 border-[#2d2d2d] dark:border-[#2d2d2d] bg-[#2d2d2d] dark:bg-[#2d2d2d] rounded-3xl focus:outline-none transition-all duration-200 ${
          isFocused ? 'ring-2 ring-blue-500/50' : ''
        }`}
      />
      
      {/* Search Icon */}
      <FiSearch
        size={20}
        className={`absolute left-3 top-2.5 transition-colors duration-200 ${
          isFocused || searchQuery ? 'text-blue-400' : 'text-gray-500'
        }`}
      />
      
      {/* Clear Button */}
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition-colors duration-200 p-0.5 rounded-full hover:bg-gray-600"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
}