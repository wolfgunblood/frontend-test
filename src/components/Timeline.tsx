// Timeline component
import React, { useEffect, useState } from "react";
import "../styles/Timeline.css";
import "../styles/Slider.css";
import TimelineHead from "./TimelineHead";
import Timestamps from "./Timestamps";
import { useAdStore } from "~/store/useStore";
import useTimeline from "~/app/hooks/timeline";
import { type TimelineProps } from "~/lib/types";

const Timeline = ({
  currentTime,
  duration,
  markerZIndex,
  onSeekChange,
  onSeekMouseDown,
  onSeekMouseUp,
}: TimelineProps) => {
  const sliderValue = currentTime;

  // const [controlValue, setControlValue] = useState(0);
  // const [bottomSliderWidth, setBottomSliderWidth] = useState(100);
  const [isLoading, setLoading] = useState(false);

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

  const { markers, editMarker } = useAdStore();

  // Ticks calculation

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

  const handleDragStart = (
    e: React.DragEvent<HTMLImageElement>,
    index: number,
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setLoading(true);

    const index = parseInt(e.dataTransfer.getData("text/plain"), 10);

    if (!timelineRef.current) {
      console.log("Timeline reference is not set");
      return;
    }

    const timelineWidth = timelineRef.current.scrollWidth;

    const scrollLeft = timelineRef.current.scrollLeft;

    const mouseX =
      e.clientX - timelineRef.current.getBoundingClientRect().left + scrollLeft;
    const newLeft = Math.min(Math.max(mouseX, 0), timelineWidth);

    const newLeftPercentage = (newLeft / timelineWidth) * 100;

    const newTime = Math.round((newLeftPercentage / 100) * duration);

    await editMarker(index, newTime)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Something went wrong", error);
        setLoading(false);
      });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

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
