import { create } from "zustand";

type RingMenuState = {
  isOpen: boolean;
  position: [number, number, number];
  openMenu: (position: [number, number, number]) => void;
  closeMenu: () => void;
  setPosition: (position: [number, number, number]) => void;
};

const useRingMenuStore = create<RingMenuState>((set) => ({
  isOpen: false,
  position: [-1000, -1000, 0],
  openMenu: (position: [number, number, number]) =>
    set({ isOpen: true, position }),
  closeMenu: () => set({ isOpen: false }),
  setPosition: (position: [number, number, number]) => set({ position }),
}));

export default useRingMenuStore;
