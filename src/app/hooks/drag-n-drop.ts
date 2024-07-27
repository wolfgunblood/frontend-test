import { useCallback, useState } from "react";
import { useAdStore } from "~/store/useStore";

function useDragAndDrop(
  timelineRef: React.RefObject<HTMLDivElement>,
  duration: number,
) {
  const { markers, editMarker } = useAdStore();
  const [isLoading, setLoading] = useState(false);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLImageElement>, index: number) => {
      e.dataTransfer.setData("text/plain", index.toString());
    },
    [],
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setLoading(true);

      const index = parseInt(e.dataTransfer.getData("text/plain"), 10);

      if (!timelineRef.current) {
        console.log("Timeline reference is not set");
        setLoading(false);
        return;
      }

      const timelineWidth = timelineRef.current.scrollWidth;
      const scrollLeft = timelineRef.current.scrollLeft;
      const mouseX =
        e.clientX -
        timelineRef.current.getBoundingClientRect().left +
        scrollLeft;
      const newLeft = Math.min(Math.max(mouseX, 0), timelineWidth);
      const newLeftPercentage = (newLeft / timelineWidth) * 100;
      const newTime = Math.round((newLeftPercentage / 100) * duration);

      try {
        await editMarker(index, newTime);
      } catch (error) {
        console.error("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    },
    [timelineRef, editMarker, duration, setLoading],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return { isLoading, setLoading, handleDragStart, handleDrop, handleDragOver };
}

export default useDragAndDrop;
