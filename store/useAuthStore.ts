import { create } from "zustand";

interface User {
  country: string;
  phone: string;
}

interface StoreState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
