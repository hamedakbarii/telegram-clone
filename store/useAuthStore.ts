import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  country: string;
  phone: string;
}

interface StoreState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
