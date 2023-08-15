import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTheme = create(
  persist(
    (set) => ({
      theme: "cupcake",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme",
    }
  )
);
