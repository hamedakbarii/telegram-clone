"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const login = useStore((state) => state.login);
  const router = useRouter();

  const handleLogin = () => {
    if (!username.trim()) return;
    login(username.trim());
    router.push("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please enter your username to continue
        </p>

        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
