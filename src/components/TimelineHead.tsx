import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { DisplayTime } from "~/helpers/timeformat";
import "../styles/TimelineHead.css";
import { useAdStore } from "~/store/useStore";
import { type TimelineHeadProps } from "~/lib/types";

const TimelineHead: React.FC<TimelineHeadProps> = ({
  currentTime,
  controlValue,
  handleControlChange,
  setControlValue,
  setBottomSliderWidth,
}) => {
  const { undo, redo, undoStack, redoStack, saveChanges } = useAdStore();

  const showIndicatorDot = undoStack.length > 0 || redoStack.length > 0;

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
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSaveChanges().catch((error) => {
          console.error("Failed to delete Ads", error);
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [saveChanges]); // Dependencies array includes saveChanges to ensure updates

  const handleZoomIn = () => {
    if (controlValue < 10) {
      setControlValue((prev) => prev + 1);
      setBottomSliderWidth(100 + (controlValue + 1) * 10);
    }
  };

  const handleZoomOut = () => {
    if (controlValue > 0) {
      setControlValue((prev) => prev - 1);
      setBottomSliderWidth(100 + (controlValue - 1) * 10);
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* Undo & Redo */}

      <div className="relative flex gap-6">
        {showIndicatorDot && (
          <span className="absolute right-0 top-0 block h-2 w-2 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-zinc-500"></span>
        )}
        <Button
          className="inline-flex gap-3"
          variant="ghost"
          onClick={undo}
          aria-label="Undo"
        >
          <div className="flex h-8 w-8 items-center justify-center gap-0 rounded-full border border-zinc-300">
            <Image
              src="/Undo.svg"
              alt="undo"
              width={16}
              height={16}
              quality={100}
            />
          </div>
          <span className="font-manrope text-sm font-semibold text-muted-foreground">
            Undo
          </span>
        </Button>
        <Button
          className="inline-flex gap-3"
          variant="ghost"
          onClick={redo}
          aria-label="Redo"
        >
          <div className="flex h-8 w-8 items-center justify-center gap-0 rounded-full border border-zinc-300">
            <Image
              src="/Redo.svg"
              alt="redo"
              width={16}
              height={16}
              quality={100}
            />
          </div>
          <span className="font-manrope text-sm font-semibold text-muted-foreground">
            Redo
          </span>
        </Button>
      </div>

      {/* Current Time */}

      <div className="rounded-md border px-3 py-2">
        <span className="font-manrope text-base font-semibold text-zinc-500">
          {DisplayTime(currentTime)}
        </span>
      </div>

      {/* Zoom level */}

      <div className="flex items-center justify-center gap-6">
        <Image
          src="/MagnifyingGlassMinus.svg"
          alt="Zoom Out"
          width={20}
          height={20}
          quality={100}
          onClick={handleZoomOut}
          className="cursor-pointer"
        />
        <div className="custom-range relative h-full w-full">
          <input
            type="range"
            value={controlValue}
            onChange={handleControlChange}
            min="0"
            max="10"
            step="1"
          />
        </div>

        <Image
          src="/MagnifyingGlassPlus.svg"
          alt="Zoom In"
          width={20}
          height={20}
          quality={100}
          onClick={handleZoomIn}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TimelineHead;
