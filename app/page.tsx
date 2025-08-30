// Path: app/page.tsx
"use client";

import React, { useEffect } from "react";
// import { useStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function HomePage() {
  // const user = useStore((state) => state.user);
  const storedUser = localStorage.getItem("auth-storage");
  const router = useRouter();

  useEffect(() => {
    if (storedUser) {
      console.log("storedUser: " + storedUser);
      router.push("chats");
    } else {
      router.push("/login");
    }
  }, []);
}
