"use client";

import React from "react";
import { useStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const page = () => {
  const login = useStore((state) => state.login);
  const router = useRouter();

  const handleLogin = () => {
    //code
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div>Hi, This is login page</div>
    </div>
  );
};

export default page;
