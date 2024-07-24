import React from "react";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";
import {
  Play,
  Pause,
  ArrowLeftToLine,
  ArrowRightToLine,
  Rewind,
  FastForward,
} from "lucide-react";

// Define the props interface
interface VideoPlayerProps {
  url: string;
  playing: boolean;
  onPlayPause: () => void;
  onJumpStart: () => void;
  onJumpEnd: () => void;
  onRewind: () => void;
  onFastForward: () => void;
  onProgress: (state: { playedSeconds: number }) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  playing,
  onPlayPause,
  onJumpStart,
  onJumpEnd,
  onRewind,
  onFastForward,
  onProgress,
}) => {
  return (
    <div className="flex flex-col items-center gap-5 p-10">
      <ReactPlayer
        url={url}
        controls={true}
        playing={playing}
        onProgress={onProgress}
        progressInterval={500}
      />
      <div className="flex w-full justify-between py-5">
        <Button
          variant="ghost"
          onClick={onJumpStart}
          aria-label="Jump to Start"
        >
          <ArrowLeftToLine />
          Jump to start
        </Button>
        <div>
          <Button variant="ghost" onClick={onRewind} aria-label="Rewind">
            <Rewind />
            Rewind 10s
          </Button>
          <Button variant="ghost" onClick={onPlayPause} aria-label="Play/Pause">
            {playing ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="ghost"
            onClick={onFastForward}
            aria-label="Fast Forward"
          >
            <FastForward />
            Fast Forward 10s
          </Button>
        </div>
        <Button variant="ghost" onClick={onJumpEnd} aria-label="Jump to End">
          <ArrowRightToLine />
          Jump to end
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
