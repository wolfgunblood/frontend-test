export interface VideoState {
  playing: boolean;
  currentTime: number;
  duration: number;
  seeking: boolean;
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setSeeking: (seeking: boolean) => void;
}

export interface Option {
  id: string;
  name: string;
  createdOn: string;
  picture: string;
  createdBy: {
    picture: string;
    name: string;
  };
  badge: {
    category: string;
    subCategory: string;
  };
}

export interface ModalState {
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
  setStepOneType: (type: string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setSelection: (
    step: keyof ModalState["selections"],
    value: string | Option[],
  ) => void;
  toggleSelection: (option: Option) => void;
  reset: () => void;
}

export interface Marker {
  id: string;
  type: "AUTO" | "STATIC" | "AB";
  timestamp: number;
  createdOn: Date;
}

export interface AdStoreState {
  markers: Marker[];
  undoStack: Marker[][];
  redoStack: Marker[][];
  addMarker: (time: number, type: "AUTO" | "STATIC" | "AB") => Promise<void>;
  deleteMarker: (index: number) => Promise<void>;
  editMarker: (index: number, newTime: number) => Promise<void>;
  undo: () => void;
  redo: () => void;
  initializeMarkers: (defaultMarkers: Marker[]) => void;
  saveChanges: () => Promise<void>;
}

export interface Ad {
  type: "AUTO" | "STATIC" | "AB";
  timestamp: number;
}

export interface UpdateAd {
  updateTime: number;
  id: string;
}

export interface TimelineHeadProps {
  currentTime: number;
  controlValue: number;
  setControlValue: React.Dispatch<React.SetStateAction<number>>;
  setBottomSliderWidth: React.Dispatch<React.SetStateAction<number>>;
  handleControlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Timestamp {
  time: string;
  left: string;
}

export interface TimestampProps {
  timestamps: Timestamp[];
}
