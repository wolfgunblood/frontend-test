// Timeline component
import React, { useEffect, useState } from "react";
import "../styles/Timeline.css";
import "../styles/Slider.css";
import TimelineHead from "./TimelineHead";
import Timestamps from "./Timestamps";
import useTimeline from "~/app/hooks/timeline";
import { type TimelineProps } from "~/lib/types";
import useDragAndDrop from "~/app/hooks/drag-n-drop";

const Timeline = ({
  currentTime,
  duration,
  markerZIndex,
  onSeekChange,
  onSeekMouseDown,
  onSeekMouseUp,
}: TimelineProps) => {
  const sliderValue = currentTime;

  const {
    controlValue,
    setControlValue,
    bottomSliderWidth,
    setBottomSliderWidth,
    computedMarkers,
    handleControlChange,
    timelineRef,
    timestamps,
  } = useTimeline(duration);

  // Ticks calculation

  // const ticks = useTimelineTicks(duration, timelineRef);

  const [ticks, setTicks] = useState<Array<{ left: string }>>([]);

  const calculateTicks = () => {
    if (timelineRef.current) {
      const timelineWidth = timelineRef.current.offsetWidth;
      const numberOfTicks = Math.floor(timelineWidth / 2);

      const newTicks = Array.from({ length: numberOfTicks }, (_, index) => {
        const time = (index / numberOfTicks) * duration;
        const leftPercentage = (time / duration) * 100;
        return { left: `${leftPercentage}%` };
      });

      setTicks(newTicks);
    }
  };

  useEffect(() => {
    calculateTicks();
    window.addEventListener("resize", calculateTicks);

    return () => {
      window.removeEventListener("resize", calculateTicks);
    };
  }, [duration]);

  // Ad Marker Dragging logic

  const { isLoading, handleDragStart, handleDrop, handleDragOver } =
    useDragAndDrop(timelineRef, duration);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-8 pb-12 shadow-sm">
      <TimelineHead
        currentTime={currentTime}
        controlValue={controlValue}
        handleControlChange={handleControlChange}
        setControlValue={setControlValue}
        setBottomSliderWidth={setBottomSliderWidth}
      />

      <div
        ref={timelineRef}
        className="custom-scrollbar h-128px relative w-full overflow-x-auto overflow-y-visible pb-16 pt-16"
      >
        <div
          className={`timeline-slider relative z-10 h-full w-full ${isLoading ? "blur" : "blur-none"} transition-all ease-in-out`}
          style={{
            width: `${bottomSliderWidth}%`,
            padding: "0 16px",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="range"
            min={0}
            max={duration}
            value={sliderValue}
            onChange={onSeekChange}
            onMouseDown={onSeekMouseDown}
            onMouseUp={onSeekMouseUp}
            className={`h-2 w-full cursor-pointer appearance-none`}
            // style={{ transition: `left ${transitionDuration} ease-in-out` }}
            // style={{ marginBottom: '16px' }}
          />
          {computedMarkers.map((marker, index) => (
            <img
              key={index}
              className="absolute"
              src={marker.url}
              alt="Timeline marker"
              style={{
                left: marker.left,
                bottom: "0",
                height: "100%",
                zIndex: markerZIndex,
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              // onDragEnd={handleDragEnd}
            />
          ))}
          {ticks.map(
            (tick, index) =>
              index % 2 !== 0 && (
                <div
                  key={index}
                  className="tick"
                  style={{ left: tick.left }}
                ></div>
              ),
          )}

          <Timestamps timestamps={timestamps} />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
