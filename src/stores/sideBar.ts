import { create } from "zustand";

interface SideBarStore {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const useSideBarStore = create<SideBarStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}));