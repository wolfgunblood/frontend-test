import React, { useEffect, useMemo } from "react";
import { useAdStore } from "~/store/useStore";

const useUnsavedChangesWarning = () => {
  const { undoStack, redoStack } = useAdStore();

  const hasUnsavedChanges = useMemo(
    () => undoStack.length > 0 || redoStack.length > 0,
    [undoStack, redoStack],
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes! Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);
};

export default useUnsavedChangesWarning;
