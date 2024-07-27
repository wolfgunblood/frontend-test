"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Admaker from "../Admaker";
import VideoPlayer from "./VideoPlay";
import Timeline from "../Timeline";
import { useVideoStore } from "~/store/useStore";

const Editor: React.FC = () => {
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

  const [markerZIndex, setMarkerZIndex] = useState(5);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleJumpStart = () => {
    playerRef.current?.seekTo(0);
    setPlaying(true);
  };

  const handleJumpEnd = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getDuration(), "seconds");
      setPlaying(false);
    }
  };

  const handleFastForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() + 10,
        "seconds",
      );
      setPlaying(true);
    }
  };

  const handleRewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        Math.max(playerRef.current.getCurrentTime() - 10, 0),
        "seconds",
      );
      setPlaying(true);
    }
  };

  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      const currentDuration = player.getDuration();
      if (currentDuration) {
        setDuration(currentDuration);
      }
    }
  }, [playerRef.current]);

  const onProgress = (data: { playedSeconds: number }) => {
    if (!seeking) {
      setCurrentTime(data.playedSeconds);
    }
  };

  // const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSeeking(true);
  //     const newTime = (parseFloat(e.target.value) / 100) * duration;
  //     setCurrentTime(newTime);
  // };

  // const handleSeekMouseDown = () => {
  //     setSeeking(true);
  // };

  // const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
  //     setSeeking(false);
  //     const newTime = (parseFloat(e.currentTarget.value) / 100) * duration;
  //     playerRef.current?.seekTo(newTime, 'seconds');
  //     setPlaying(true);
  // };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    setCurrentTime(newTime);
    if (!seeking) {
      // This check might be unnecessary or incorrectly placed depending on logic
      playerRef.current?.seekTo(newTime, "seconds"); // Ensure this happens on mouse up instead
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
    setMarkerZIndex(-5);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    const newTime = (parseFloat(e.currentTarget.value) / 100) * duration;
    setCurrentTime(newTime);
    playerRef.current?.seekTo(newTime, "seconds");
    setPlaying(true); // You might want to conditionally set playing based on previous state
    setMarkerZIndex(5);
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-5">
        <Admaker />
        <VideoPlayer
          url="https://utfs.io/f/37835069-4b3e-48e8-97b5-da654c1de85b-m0d2yz.mp4"
          playing={playing}
          onPlayPause={handlePlayPause}
          onJumpStart={handleJumpStart}
          onJumpEnd={handleJumpEnd}
          onRewind={handleRewind}
          onFastForward={handleFastForward}
          onProgress={onProgress}
        />
      </div>
      <Timeline
        currentTime={currentTime}
        duration={duration}
        onSeekChange={handleSeekChange}
        onSeekMouseDown={handleSeekMouseDown}
        onSeekMouseUp={handleSeekMouseUp}
        markerZIndex={markerZIndex}
      />
    </div>
  );
};

export default Editor;
