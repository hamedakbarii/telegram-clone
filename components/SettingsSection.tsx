// Path: components/SettingsSection.tsx

import { useStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";

interface SettingsItem {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value?: string;
  iconColor?: string;
}

interface SettingsSectionProps {
  items: SettingsItem[];
}

export default function SettingsSection({ items }: SettingsSectionProps) {
  const logOut = useStore((state) => state.logout);
  const router = useRouter();

  const logOutHandler = () => {
    // console.log("logOut Clicked");
    logOut();
    router.push("login");
  };

  return (
    <div className="mb-2">
      {items.map((item, index) => (
        <button
          key={index}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#2d2d2d] transition-colors cursor-pointer"
          onClick={
            item.label === "Logout"
              ? logOutHandler
              : () => alert("Sorry! This is for test")
          }
        >
          <div className="flex items-center gap-3">
            <item.icon
              size={20}
              className={item.iconColor || "text-gray-400"}
            />
            <span className="text-white">{item.label}</span>
          </div>

          {item.value && (
            <span className="text-sm text-gray-400">{item.value}</span>
          )}
        </button>
      ))}
    </div>
  );
}
