// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  region: "US" | "EU";
  currency: "USD" | "EUR";
  setRegion: (region: "US" | "EU") => void;
  setCurrency: (currency: "USD" | "EUR") => void;
}

export const useSettingsStore = create(
  persist<SettingsState>(
    (set) => ({
      region: "US",
      currency: "USD",
      setRegion: (region) => {
        set({
          region,
          currency: region === "US" ? "USD" : "EUR", // default currency by region
        });
      },
      setCurrency: (currency) => set({ currency }),
    }),
    { name: "user-settings" }
  ) // saved in localStorage
);
