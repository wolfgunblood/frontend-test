import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { DisplayTime } from "~/helpers/timeformat";
import { useAdStore } from "~/store/useStore";

const markerUrls = {
  AUTO: "/ad2.svg",
  STATIC: "/ad3.svg",
  AB: "/ad1.svg",
};

function useTimeline(duration: number) {
  const [controlValue, setControlValue] = useState(0);
  const [bottomSliderWidth, setBottomSliderWidth] = useState(100);
  const [isLoading, setLoading] = useState(false);
  const [ticks, setTicks] = useState<Array<{ left: string }>>([]);

  const { markers, editMarker } = useAdStore();

  const timelineRef = useRef<HTMLDivElement>(null);

  const computedMarkers = useMemo(
    () =>
      markers.map((marker) => {
        const leftPercentage = (marker.timestamp / duration) * 100;
        return {
          ...marker,
          url: markerUrls[marker.type],
          left: `${leftPercentage}%`,
        };
      }),
    [markers, duration],
  );

  const calculateTicks = useCallback(() => {
    if (timelineRef.current) {
      const timelineWidth = timelineRef.current.offsetWidth;
      const numberOfTicks = Math.floor(timelineWidth / 50);

      const newTicks = Array.from({ length: numberOfTicks }, (_, index) => {
        const time = (index / numberOfTicks) * duration;
        const leftPercentage = (time / duration) * 100;
        return { left: `${leftPercentage}%` };
      });

      setTicks(newTicks);
    }
  }, [duration]);

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
    setBottomSliderWidth(100 + newControlValue * 10);
  };

  return {
    controlValue,
    setControlValue,
    bottomSliderWidth,
    setBottomSliderWidth,
    isLoading,
    setLoading,
    computedMarkers,
    ticks,
    handleControlChange,
    timelineRef,
    timestamps,
    calculateTicks,
  };
}

export default useTimeline;
