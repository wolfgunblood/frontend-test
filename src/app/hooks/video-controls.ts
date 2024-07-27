import { useState, useCallback, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useVideoStore } from "~/store/useStore";

function useVideoControls() {
  const playerRef = useRef<ReactPlayer | null>(null);
  const {
    playing,
    currentTime,
    duration,
    seeking,
    setPlaying,
    setCurrentTime,
    setDuration,
    setSeeking,
  } = useVideoStore();
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [markerZIndex, setMarkerZIndex] = useState(5);

  const handlePlayPause = useCallback(() => {
    setPlaying(!playing);
  }, []);

  const handleJumpStart = useCallback(() => {
    playerRef.current?.seekTo(0);
    setPlaying(true);
  }, []);

  const handleJumpEnd = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getDuration(), "seconds");
      setPlaying(false);
    }
  }, []);

  const increasePlaybackRate = useCallback(() => {
    setPlaybackRate((prev) => Math.min(prev + 0.5, 2));
  }, []);

  const decreasePlaybackRate = useCallback(() => {
    setPlaybackRate((prev) => Math.max(prev - 0.5, 0.5));
  }, []);

  const handleForwardTenSeconds = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() + 10,
        "seconds",
      );
      setPlaying(true);
    }
  }, []);

  const handleBackwardTenSeconds = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        Math.max(playerRef.current.getCurrentTime() - 10, 0),
        "seconds",
      );
      setPlaying(true);
    }
  }, []);

  const handleSeekChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSeeking(true);
      setCurrentTime(parseFloat(e.target.value));
    },
    [],
  );

  const handleSeekMouseDown = useCallback(() => {
    setSeeking(true);
    setMarkerZIndex(-5);
  }, []);

  const handleSeekMouseUp = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = parseFloat(e.currentTarget.value);
      setSeeking(false);
      playerRef.current?.seekTo(newTime, "seconds");
      setPlaying(false);
      setTimeout(() => {
        setPlaying(true);
      }, 100);
      setMarkerZIndex(5);
    },
    [],
  );

  return {
    playerRef,
    markerZIndex,
    setMarkerZIndex,
    playing,
    setPlaying,
    playbackRate,
    setPlaybackRate,
    currentTime,
    setCurrentTime,
    seeking,
    setSeeking,
    duration,
    setDuration,
    handlePlayPause,
    handleJumpStart,
    handleJumpEnd,
    increasePlaybackRate,
    decreasePlaybackRate,
    handleForwardTenSeconds,
    handleBackwardTenSeconds,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
  };
}

export default useVideoControls;
