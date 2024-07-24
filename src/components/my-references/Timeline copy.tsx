import React from "react";

interface TimelineProps {
  currentTime: number;
  duration: number;
  onSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeekMouseDown: () => void;
  onSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  duration,
  onSeekChange,
  onSeekMouseDown,
  onSeekMouseUp,
}) => {
  return (
    <div className="w-full">
      <input
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100}
        onChange={onSeekChange}
        onMouseDown={onSeekMouseDown}
        onMouseUp={onSeekMouseUp}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-blue-500 dark:bg-blue-700"
      />
    </div>
  );
};

export default Timeline;
