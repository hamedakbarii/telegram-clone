// Path: app/page.tsx
"use client";

import { useEffect } from "react";
// import { useStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function HomePage() {
  // const user = useStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("auth-storage");

    if (storedUser) {
      // console.log("storedUser: " + storedUser);
      router.push("chats");
    } else {
      router.push("/login");
    }
  }, []);
}
