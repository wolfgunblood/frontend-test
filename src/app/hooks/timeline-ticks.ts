import { useState, useEffect, useCallback } from "react";

function useTimelineTicks(
  duration: number,
  timelineRef: React.RefObject<HTMLDivElement>,
) {
  const [ticks, setTicks] = useState<Array<{ left: string }>>([]);

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
  }, [duration, timelineRef]);

  useEffect(() => {
    calculateTicks();
    window.addEventListener("resize", calculateTicks);

    return () => {
      window.removeEventListener("resize", calculateTicks);
    };
  }, [calculateTicks]);

  return ticks;
}

export default useTimelineTicks;
