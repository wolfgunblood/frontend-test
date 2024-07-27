import { useEffect } from "react";
import { useAdStore } from "~/store/useStore";

function useSaveChanges() {
  const { saveChanges } = useAdStore();
  useEffect(() => {
    const handleSaveChanges = async () => {
      try {
        await saveChanges();
        console.log("Changes have been saved successfully.");
      } catch (error) {
        console.error("Failed to save Ads", error);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSaveChanges().catch((error) => {
          console.error("Failed to delete Ads", error);
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [saveChanges]);

  return null;
}

export default useSaveChanges;
