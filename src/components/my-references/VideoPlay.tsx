import React from 'react';
import ReactPlayer from 'react-player';
import { Button } from '../ui/button';
import { Play, Pause, ArrowLeftToLine, ArrowRightToLine, Rewind, FastForward } from 'lucide-react';

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
    onProgress
}) => {
    return (
        <div className='flex flex-col items-center gap-5 p-10'>
            <ReactPlayer
                url={url}
                controls={true}
                playing={playing}
                onProgress={onProgress}
                progressInterval={500}
            />
            <div className='w-full py-5 flex justify-between'>
                <Button variant="ghost" onClick={onJumpStart}>
                    <ArrowLeftToLine />
                    Jump to start
                </Button>
                <div>
                    <Button variant="ghost" onClick={onRewind}>
                        <Rewind />
                        Rewind 10s
                    </Button>
                    <Button variant="ghost" onClick={onPlayPause}>
                        {playing ? <Pause /> : <Play />}
                    </Button>
                    <Button variant="ghost" onClick={onFastForward}>
                        <FastForward />
                        Fast Forward 10s
                    </Button>
                </div>
                <Button variant="ghost" onClick={onJumpEnd}>
                    <ArrowRightToLine />
                    Jump to end
                </Button>
            </div>
        </div>
    );
};

export default VideoPlayer;
