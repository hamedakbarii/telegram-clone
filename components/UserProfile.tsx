// Path: components/UserProfile.tsx
"use client";

import React from "react";
import { BsDisplay, BsFolder, BsChat } from "react-icons/bs";
import {
  MdNotifications,
  MdStorage,
  MdSecurity,
  MdLanguage,
  MdHelpOutline,
  MdPrivacyTip,
} from "react-icons/md";
import { FaStar, FaGift } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { RiEmojiStickerLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import ProfileHeader from "./ProfileHeader";
import SettingsSection from "./SettingsSection";

const settingsItems = [
  { icon: CiSettings, label: "General Settings" },
  { icon: BsDisplay, label: "Animations and Performance" },
  { icon: MdNotifications, label: "Notifications" },
  { icon: MdStorage, label: "Data and Storage" },
  { icon: MdSecurity, label: "Privacy and Security" },
  { icon: BsFolder, label: "Chat Folders" },
  { icon: BsDisplay, label: "Active Sessions", value: "11" },
  { icon: MdLanguage, label: "Language", value: "English" },
  { icon: RiEmojiStickerLine, label: "Stickers and Emoji" },
];

const additionalItems = [
  {
    icon: FaStar,
    label: "My Stars",
    value: "69",
    iconColor: "text-yellow-500",
  },
  { icon: FaGift, label: "Send a Gift" },
];

const helpItems = [
  { icon: BsChat, label: "Ask a Question" },
  { icon: MdHelpOutline, label: "Telegram FAQ" },
  { icon: MdPrivacyTip, label: "Privacy Policy" },
  { icon: CiLogout, label: "Logout" },
  { icon: CiLogout, label: "" },
];

export default function UserProfile() {
  return (
    <div className="h-screen flex flex-col bg-[#1a1a1a] dark:bg-[#1a1a1a]">
      {/* Settings Menu */}
      <div className="flex-1">
        <ProfileHeader />

        <div className="py-2 bg-[#1a1a1a]">
          <SettingsSection items={settingsItems} />

          <div className="border-t border-[#2d2d2d] my-2"></div>
          <SettingsSection items={additionalItems} />

          <div className="border-t border-[#2d2d2d] my-2"></div>
          <SettingsSection items={helpItems} />
        </div>
      </div>
    </div>
  );
}
