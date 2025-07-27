"use client";

import { useStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const user = useStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("login");
    }
  }, []);

  return <div className="">Home page</div>;
}