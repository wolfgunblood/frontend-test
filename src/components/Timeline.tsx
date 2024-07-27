// Timeline component
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Timeline.css";
import "../styles/Slider.css";
import { DisplayTime, generateTimeLabels } from "~/helpers/timeformat";
import TimelineHead from "./TimelineHead";
import Image from "next/image";
import Draggable from "react-draggable";
import Timestamps from "./Timestamps";
import { useAdStore } from "~/store/useStore";

// const markers = [
//     { time: 10, url: '/ad2.svg' },
//     { time: 80, url: '/ad3.svg' },
//     { time: 120, url: '/ad1.svg' }
// ];

const markerUrls = {
  AUTO: "/ad2.svg",
  STATIC: "/ad3.svg",
  AB: "/ad1.svg",
};

interface TimelineProps {
  currentTime: number;
  duration: number;
  markerZIndex: number;
  onSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeekMouseDown: () => void;
  onSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const Timeline = ({
  currentTime,
  duration,
  markerZIndex,
  onSeekChange,
  onSeekMouseDown,
  onSeekMouseUp,
}: TimelineProps) => {
  // const sliderValue = (currentTime / duration) * 100 || 0;
  const sliderValue = currentTime;

  const [controlValue, setControlValue] = useState(0);
  const [bottomSliderWidth, setBottomSliderWidth] = useState(100);
  const [isLoading, setLoading] = useState(false);

  // const markers = useAdStore(state => state.markers);
  // const initializeMarkers = useAdStore(state => state.initializeMarkers);
  const { markers, initializeMarkers, editMarker } = useAdStore();

  const timelineRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   initializeMarkers([
  //     { time: 300, type: "AUTO" },
  //     { time: 1500, type: "STATIC" },
  //     { time: 3600, type: "AB" },
  //   ]);
  // }, [initializeMarkers]);

  const computedMarkers = markers.map((marker) => {
    // console.log(marker.time)
    // console.log(duration)
    const leftPercentage = (marker.timestamp / duration) * 100;
    // const leftPercentage = (marker.time / duration) * bottomSliderWidth;
    // console.log(`Marker at ${marker.time}s, Type: ${marker.type}, Calculated Left: ${leftPercentage}%`);
    return {
      ...marker,
      url: markerUrls[marker.type],
      left: `${leftPercentage}%`,
    };
  });

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

  // Timestamp calculations

  const intervals = [
    10 * 60,
    10 * 60,
    10 * 60,
    10 * 60,
    5 * 60,
    5 * 60,
    5 * 60,
    5 * 60,
    5 * 60,
    5 * 60,
    5 * 60,
    60,
  ];
  const interval = intervals[Math.min(controlValue, intervals.length - 1)];

  const timestamps = useMemo(() => {
    const numMarks = Math.floor(duration / interval!);
    return Array.from({ length: numMarks + 1 }, (_, index) => {
      const time = interval! * index;
      return { time: DisplayTime(time), left: `${(time / duration) * 100}%` };
    });
  }, [duration, interval]);

  const handleControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newControlValue = Number(e.target.value);
    setControlValue(newControlValue);
    // console.log(controlValue);
    if (newControlValue === 0) {
      setBottomSliderWidth(100);
    } else {
      const newWidth = 100 + newControlValue * 10;
      setBottomSliderWidth(newWidth);
    }
  };

  // Ad Marker Dragging logic

  const handleDragStart = (
    e: React.DragEvent<HTMLImageElement>,
    index: number,
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
    // e.currentTarget.classList.add("dragging");
  };

  // const handleDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
  //   e.currentTarget.classList.remove("dragging");
  // };

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
