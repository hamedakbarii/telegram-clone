// Path: components/ProfileHeader.tsx
"use client";

import React from "react";
import { BsPhone } from "react-icons/bs";

const contactInfo = [
  {
    icon: <BsPhone size={18} className="text-gray-500" />,
    label: "Phone",
    value: "+98 911 222 3333",
  },
  {
    icon: <span className="text-lg text-gray-500">@</span>,
    label: "Username",
    value: "@amiriii01",
  },
  {
    icon: <span className="text-lg text-gray-500">ⓘ</span>,
    label: "Bio",
    value: (
      <span className="text-white flex items-center gap-1">
        NEXTJS DEVELOPER
        <span className="text-blue-400">
          <img
            src="https://emojicdn.elk.sh/%F0%9F%90%A2"
            width={25}
            height={25}
            alt="🐢"
          />
        </span>
      </span>
    ),
  },
  {
    icon: <span className="text-lg text-gray-500">📅</span>,
    label: "Date of Birth",
    value: "July 13",
  },
];

export default function ProfileHeader() {
  return (
    <div className="p-6 text-center border-b border-[#2d2d2d]">
      <div className="relative inline-block mb-4">
        <img
          src="/assets/avatar/belami.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mx-auto cursor-pointer"
          onClick={() => alert("Sorry! This is for test")}
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-1">Amir.</h2>
      <p className="text-sm text-gray-400 mb-4">last seen just now</p>

      {/* Contact Info */}
      <div className="space-y-3 text-left">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-gray-300 cursor-pointer"
            onClick={() => alert("Sorry! This is for test")}
          >
            {info.icon}
            <div>
              <p className="text-sm text-gray-400">{info.label}</p>
              <div className="text-white">
                {typeof info.value === "string" ? (
                  <p>{info.value}</p>
                ) : (
                  info.value
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
