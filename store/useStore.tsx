import create from 'zustand';

interface VideoState {
  playing: boolean;
  currentTime: number;
  duration: number;
  seeking: boolean;
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setSeeking: (seeking: boolean) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  playing: false,
  currentTime: 0,
  duration: 0,
  seeking: false,
  setPlaying: (playing) => set({ playing }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setSeeking: (seeking) => set({ seeking }),
}));
