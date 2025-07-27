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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center">
        <img
          src="assets/avatar/telegram.jpg"
          alt="Telegram icon"
          className="rounded-full w-32 my-4"
        />

        <h1 className="text-2xl font-bold text-center text-black mb-2">
          Telegram
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Please confirm your country code and enter your phone number.
        </p>

        {/* Inputs */}
        <div className="flex flex-col justify-center items-center gap-2 mb-2">
          {/* Country Input */}
          <div className="flex flex-col justify-center items-start">
            <label htmlFor="country" className="text-sm text-gray-500">
              country
            </label>
            <input
              type="text"
              name="country"
              defaultValue={"Iran"}
              id="country"
              className="border rounded-sm text-sm p-1 w-[250px]"
              placeholder="Iran"
            />
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col justify-center items-start">
            <label htmlFor="phoneNumber" className="text-sm text-gray-500">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="border rounded-sm text-sm p-1 w-[250px]"
              placeholder="+98 9377550980"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold my-4 py-2 rounded-md transition"
        >
          Login
        </button>

        <span
          className="text-blue-300 mt-4 cursor-pointer"
          onClick={() => {
            alert("Sorry! This is for test");
          }}
        >
          LOG IN BY QR CODE
        </span>
      </div>
    </div>
  );
}
