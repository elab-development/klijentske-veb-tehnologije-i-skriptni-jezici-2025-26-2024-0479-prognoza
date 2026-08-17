import { create } from 'zustand';
import type { SelectedLocation } from '../types/location';

type LocationState = {
  location: SelectedLocation | null;
  setLocation: (loc: SelectedLocation) => void;
  clearLocation: () => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  setLocation: (loc) => set({ location: loc }),
  clearLocation: () => set({ location: null }),
}));