import { create } from 'zustand';

interface AudioState {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playTactileClick: () => void;
  playSuccessChime: () => void;
  playRunwayWhoosh: () => void;
}

export const useAudioStore = create<AudioState>(() => ({
  isSoundEnabled: false,
  toggleSound: () => {},
  playTactileClick: () => {},
  playSuccessChime: () => {},
  playRunwayWhoosh: () => {},
}));

