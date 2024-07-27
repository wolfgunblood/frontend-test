import { create } from "zustand";
import { string } from "zod";
import {
  type Marker,
  type AdStoreState,
  type ModalState,
  type VideoState,
} from "~/lib/types";

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

const useModalStore = create<ModalState>((set, get) => ({
  step: 1,
  selections: {
    stepOne: "AUTO",
    stepTwo: [],
    stepThree: "",
  },
  selectionCount: 0,
  options: [],
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  setOptions: (options) => set({ options }),
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  previousStep: () =>
    set((state) => ({ step: state.step > 1 ? state.step - 1 : 1 })),
  setSelection: (step, value) =>
    set((state) => ({
      selections: { ...state.selections, [step]: value },
    })),
  setStepOneType: (type) =>
    set((state) => ({
      selections: { ...state.selections, stepOne: type },
    })),
  toggleSelection: (option) =>
    set((state) => {
      const newSelections = state.selections.stepTwo.some(
        (item) => item.id === option.id,
      )
        ? state.selections.stepTwo.filter((item) => item.id !== option.id)
        : [...state.selections.stepTwo, option];
      return {
        selections: { ...state.selections, stepTwo: newSelections },
        selectionCount: newSelections.length,
      };
    }),
  reset: () =>
    set({ step: 1, selections: { stepOne: "", stepTwo: [], stepThree: "" } }),
}));

export default useModalStore;

export const useAdStore = create<AdStoreState>((set, get) => ({
  markers: [],
  undoStack: [],
  redoStack: [],

  addMarker: async (timestamp, type) => {
    const { markers, undoStack } = get();
    const newMarker = {
      type,
      timestamp,
    };

    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMarker),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const savedMarker = (await response.json()) as Marker;

      set({
        markers: [...markers, savedMarker],
        undoStack: [...undoStack, markers],
        redoStack: [],
      });

      console.log("Ads successfully added");
    } catch (error) {
      console.error("Failed to add ads:", error);
    }
  },

  deleteMarker: async (index) => {
    const { markers, undoStack } = get();
    // const newMarkers = markers.filter((_, i) => i !== index);
    try {
      console.log("hi");
      const response = await fetch("/api/ads", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(markers[index]),
      });

      const data = (await response.json()) as Marker[];

      set({
        markers: data,
        undoStack: [...undoStack, markers],
        redoStack: [],
      });
    } catch (error) {
      console.log("something went wrong", error);
    }
  },

  editMarker: async (index, newTime) => {
    const { markers, undoStack } = get();
    // const newMarkers = markers.map((marker, i) => {
    //   if (i === index) {
    //     return { ...marker, time: newTime };
    //   }
    //   return marker;
    // });
    const bodyData = {
      id: markers[index]?.id,
      updatedTime: newTime,
    };
    try {
      const response = await fetch("/api/ads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = (await response.json()) as Marker[];

      set({
        markers: data,
        undoStack: [...undoStack, markers],
        redoStack: [],
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  },

  undo: () => {
    const { markers, undoStack, redoStack } = get();
    if (undoStack.length === 0) return;
    // const previousState = undoStack[undoStack.length - 1];
    const previousState = undoStack.pop();

    set({
      markers: previousState,
      // undoStack: undoStack.slice(0, undoStack.length - 1),
      undoStack: [...undoStack],
      redoStack: [...redoStack, markers],
    });
  },

  redo: () => {
    const { markers, undoStack, redoStack } = get();
    if (redoStack.length === 0) return;
    // const nextState = redoStack[redoStack.length - 1];
    const nextState = redoStack.pop();
    set({
      markers: nextState,
      undoStack: [...undoStack, markers],
      // redoStack: redoStack.slice(0, redoStack.length - 1),
      redoStack: [...redoStack],
    });
  },

  initializeMarkers: (defaultMarkers) => {
    set({ markers: defaultMarkers, undoStack: [], redoStack: [] });
  },
  saveChanges: async () => {
    const { markers } = get();

    try {
      const response = await fetch("/api/save", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markers }),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      console.log("Changes successfully saved");
      // set({ undoStack: [], redoStack: [] });
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  },
}));
