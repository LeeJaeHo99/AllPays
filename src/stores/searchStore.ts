import { create } from "zustand";

export const useSearchStore = create<{
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
}>((set) => ({
    searchValue: "",
    setSearchValue: (searchValue) => set({ searchValue }),
}));