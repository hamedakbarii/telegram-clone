"use client";

import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdMotionPhotosOn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { CiBookmark, CiSettings, CiUser } from "react-icons/ci";
import { BsPlus, BsQuestionCircleFill } from "react-icons/bs";
import { FaBug, FaK } from "react-icons/fa6";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";

interface DropdownMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  handleUserClick: () => void;
  handleSettingClick: () => void;
  handleContactClick?: () => void;
}

const menuItems = [
  { icon: FaUserCircle, label: "User", action: "user" },
  {
    icon: BsPlus,
    label: "Add Account",
    action: "add_account",
    separator: true,
  },
  {
    icon: CiBookmark,
    label: "Saved Messages",
    action: "save_message",
    separator: true,
  },
  { icon: CiUser, label: "Contact", action: "contact" },
  { icon: MdMotionPhotosOn, label: "My Stories", action: "stories" },
  { icon: CiSettings, label: "Settings", action: "settings" },
  {
    icon: BsQuestionCircleFill,
    label: "Telegram Features",
    action: "features",
  },
  { icon: FaBug, label: "Report A Bug", action: "bug" },
  { icon: FaK, label: "Switch to K Version", action: "k_version" },
  { icon: FiPlusCircle, label: "Install APP", action: "install" },
];

export default function DropdownMenu({
  isMenuOpen,
  toggleMenu,
  handleUserClick,
  // handleSettingClick,
  handleContactClick,
}: DropdownMenuProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  if (!isMenuOpen) return null;

  const handleMenuItemClick = (action: string) => {
    setLoadingAction(action);

    setTimeout(() => {
      if (action === "user") {
        handleUserClick();
      } else if (action === "save_message") {
        router.push("/chats/5");
      } else if (action === "contact") {
        if (handleContactClick) handleContactClick();
      } else if (action === "settings") {
        handleUserClick();
      } else {
        alert("Sorry! This is for test.");
      }
      setLoadingAction(null);
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-10 border-0 transition-opacity duration-200 opacity-100"
      onClick={toggleMenu}
    >
      <div className="py-1 absolute top-12 left-1.5 mt-2 w-56 bg-[#212121dd] dark:bg-[#212121dd] rounded-2xl shadow-2xl z-20 border border-[#212121dd] backdrop-blur-md overflow-hidden transition-all duration-200 translate-y-0 opacity-100">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.action}>
            {index > 0 && item.separator && (
              <hr className="w-full text-[#ffffffa1] h-2.5 opacity-5" />
            )}
            <button
              onClick={() => handleMenuItemClick(item.action)}
              className="flex items-center px-4 py-2 text-sm font-medium transition duration-300 w-full text-left hover:bg-[#151515] dark:hover:bg-[#151515] cursor-pointer"
            >
              {loadingAction === item.action ? (
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                  Loading...
                </div>
              ) : (
                <>
                  <item.icon size={20} className="mr-2" />
                  {item.label}
                </>
              )}
            </button>
          </React.Fragment>
        ))}

        <hr className="w-full text-[#ffffffa1] h-2.5 opacity-5" />
        <ThemeToggle />

        <div className="text-sm text-center text-[#aaaaaa] py-2.5 cursor-auto">
          <p>Telegram Web A 10.9.57</p>
        </div>
      </div>
    </div>
  );
}
