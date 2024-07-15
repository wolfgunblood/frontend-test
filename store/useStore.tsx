import {create} from 'zustand';

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

interface ModalState {
  step: number;
  selections: {
      stepOne: string;
      stepTwo: string[];
      stepThree: string;
  };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSelection: (step: keyof ModalState['selections'], value: string | string[]) => void;
  toggleSelection: (option: string) => void;
  reset: () => void;
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

const useModalStore = create<ModalState>(set => ({
  step: 1,
  selections: {
      stepOne: '',
      stepTwo: [],
      stepThree: ''
  },
  setStep: (step) => set({ step }),
  nextStep: () => set(state => ({ step: state.step + 1 })),
  prevStep: () => set(state => ({ step: state.step > 1 ? state.step - 1 : 1 })),
  setSelection: (step, value) => set(state => ({
      selections: { ...state.selections, [step]: value }
  })),
  toggleSelection: (option) => set(state => ({
      selections: {
          ...state.selections,
          stepTwo: state.selections.stepTwo.includes(option) ?
              state.selections.stepTwo.filter(item => item !== option) : [...state.selections.stepTwo, option]
      }
  })),
  reset: () => set({ step: 1, selections: { stepOne: '', stepTwo: [], stepThree: '' } })
}));

export default useModalStore;
