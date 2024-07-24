import React, { useState } from "react";
import "../styles/TimelineTest.css";
import Image from "next/image";
import { DisplayTime } from "~/helpers/timeformat";

interface TimelineProps {
  currentTime: number;
  duration: number;
  onSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeekMouseDown: () => void;
  onSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const TimelineTest: React.FC<TimelineProps> = ({
  currentTime,
  duration,
  onSeekChange,
  onSeekMouseDown,
  onSeekMouseUp,
}) => {
  const [sliderValue, setSliderValue] = useState(
    (currentTime / duration) * 100 || 0,
  );
  const [controlValue, setControlValue] = useState(10);
  const [bottomSliderWidth, setBottomSliderWidth] = useState(100);
  const [bottomSliderMax, setBottomSliderMax] = useState(100);

  const handleControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newControlValue = Number(e.target.value);
    setControlValue(newControlValue);
    setBottomSliderWidth(100 + newControlValue * 10);
    setBottomSliderMax(100 + newControlValue * 10);
  };

  return (
    <div className="flex flex-col justify-between gap-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="rounded-md border px-3 py-2">
          <span className="font-manrope text-base font-semibold text-zinc-500">
            {DisplayTime(currentTime)}
          </span>
        </div>
        <div className="custom-range relative h-full w-full">
          <input
            type="range"
            value={controlValue}
            onChange={handleControlChange}
            min="1"
            max="10"
            step="1"
          />
        </div>
      </div>
      <div className="custom-scrollbar h-128px relative w-full overflow-x-auto">
        <div
          className="timeline-slider relative z-10 h-full w-full"
          style={{ width: `${bottomSliderWidth}%` }}
        >
          <input
            type="range"
            min="0"
            max={bottomSliderMax}
            value={sliderValue}
            onChange={onSeekChange}
            onMouseDown={onSeekMouseDown}
            onMouseUp={onSeekMouseUp}
            className="h-2 w-full cursor-pointer appearance-none"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineTest;
