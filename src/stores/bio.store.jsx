import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../services/api";

export const useBio = create(
  persist(
    (set) => ({
      bio: false,
      fetch: async () => {
        const bio = await api.getBio();
        set({ bio });
      },
    }),
    {
      name: "bio",
    }
  )
);
