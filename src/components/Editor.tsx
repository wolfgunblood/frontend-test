"use client"
import React from 'react';
import Admaker from './Admaker';
import VideoPlayer from './VideoPlayer';
import Timeline from './Timeline';
import { useVideoStore } from 'store/useStore';

const Editor: React.FC = () => {
  const { currentTime, duration, setCurrentTime, setDuration, setSeeking } = useVideoStore();

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeeking(true);
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    setCurrentTime(newTime);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    const newTime = (parseFloat(e.currentTarget.value) / 100) * duration;
    setCurrentTime(newTime);
  };

  return (
    <div className='space-y-5'>
      <div className='flex gap-5'>
        <Admaker />
        <VideoPlayer />
      </div>
      <Timeline
        currentTime={currentTime}
        duration={duration}
        onSeekChange={handleSeekChange}
        onSeekMouseDown={handleSeekMouseDown}
        onSeekMouseUp={handleSeekMouseUp}
      />
    </div>
  );
};

export default Editor;
