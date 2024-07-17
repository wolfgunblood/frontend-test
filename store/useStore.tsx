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
interface Option {
  id: string;
  name: string;
  createdOn: string;
  picture : string,
  createdBy: {
    picture: string;
    name: string;
  };
  badge: {
    category: string;
    subCategory: string;
  };
}


interface ModalState {
  step: number;
  selections: {
    stepOne: string;
    stepTwo: Option[];
    stepThree: string;
  };
  selectionCount: number; 
  options: Option[];
  searchTerm: string; 
  setSearchTerm: (term: string) => void; 
  setOptions: (options: Option[]) => void;
  setStepOneType : (type : string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setSelection: (step: keyof ModalState['selections'], value: string | Option[]) => void;
  toggleSelection: (option: Option) => void;
  reset: () => void;
}

const useModalStore = create<ModalState>((set, get) => ({
  step: 1,
  selections: {
    stepOne: '',
    stepTwo: [],
    stepThree: ''
  },
  selectionCount: 0,
  options: [],
  searchTerm: '', 
  setSearchTerm: (term) => set({ searchTerm: term }),
  setOptions: (options) => set({ options }),
  setStep: (step) => set({ step }),
  nextStep: () => set(state => ({ step: state.step + 1 })),
  previousStep: () => set(state => ({ step: state.step > 1 ? state.step - 1 : 1 })),
  setSelection: (step, value) => set(state => ({
    selections: { ...state.selections, [step]: value }
  })),
  setStepOneType: (type) => set(state => ({
    selections: { ...state.selections, stepOne: type }
  })),
  toggleSelection: (option) => set(state => {
    const newSelections = state.selections.stepTwo.some(item => item.id === option.id)
        ? state.selections.stepTwo.filter(item => item.id !== option.id)
        : [...state.selections.stepTwo, option];
    return {
      selections: { ...state.selections, stepTwo: newSelections },
      selectionCount: newSelections.length  
    };
  }),
  reset: () => set({ step: 1, selections: { stepOne: '', stepTwo: [], stepThree: '' } })
}));

export default useModalStore;