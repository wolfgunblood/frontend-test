"use client"
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Button } from './ui/button';
import { Play, Pause, ArrowLeftToLine, ArrowRightToLine, Rewind, FastForward, History } from 'lucide-react';
import { useVideoStore } from 'store/useStore';
import Timeline from './Timeline';
import Admaker from './Admaker';
import Image from 'next/image';

const darkIconStyle = { fill: '#000' };

const VideoEditor: React.FC = () => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const { playing, currentTime, duration, seeking, setPlaying, setCurrentTime, setDuration, setSeeking } = useVideoStore();
    // const [playing, setPlaying] = useState<boolean>(false);

    // const [currentTime, setCurrentTime] = useState<number>(0);
    // const [duration, setDuration] = useState<number>(0);
    // const [seeking, setSeeking] = useState<boolean>(false); 

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleJumpStart = () => {
        playerRef.current?.seekTo(0);
        setPlaying(true);
    };

    const handleJumpEnd = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getDuration(), 'seconds');
            setPlaying(false);
        }
    };

    const handleFastForward = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, 'seconds');
            setPlaying(true);
        }
    };

    const handleRewind = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(Math.max(playerRef.current.getCurrentTime() - 10, 0), 'seconds');
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
        playerRef.current?.seekTo(newTime, 'seconds');
        setPlaying(true);
    };

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex gap-8'>
                <Admaker />
                <div className='p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col gap-4'>
                    <div className="w-[724px] h-[408px] rounded-lg overflow-hidden ">
                        <ReactPlayer
                            ref={playerRef}
                            url='https://utfs.io/f/37835069-4b3e-48e8-97b5-da654c1de85b-m0d2yz.mp4'
                            controls={true}
                            playing={playing}
                            onProgress={onProgress}
                            progressInterval={500}
                            width='100%'
                            heigth='100%'
                        />
                    </div>
                    <div className='p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-center gap-4'>
                        <Button className='inline-flex gap-2' variant="ghost" onClick={handleJumpStart}>
                            <ArrowLeftToLine size={16} />
                            <p className='text-sm text-muted-foreground font-semibold font-manrope'>Jump to start</p>

                        </Button>
                        <div className='flex justify-between items-center'>
                            <Button className='inline-flex gap-2' variant="ghost" onClick={handleRewind}>
                                <Image
                                    src="/ClockAntiClockwise.svg"
                                    alt="rewind"
                                    width={20}
                                    height={20}
                                    quality={100}
                                />
                                <p className='text-sm text-muted-foreground font-semibold font-manrope'>10s</p>
                            </Button>
                            <Button variant="ghost" onClick={handleRewind}>
                                <Rewind size={20} style={darkIconStyle} />
                            </Button>
                            <Button variant="ghost" onClick={handlePlayPause}>
                                {playing ? <Pause size={32} style={darkIconStyle} /> : <Play size={32} style={darkIconStyle} />}
                            </Button>
                            <Button variant="ghost" onClick={handleFastForward}>
                                <FastForward size={20} style={darkIconStyle} />
                            </Button>
                            <Button className='inline-flex gap-2' variant="ghost" onClick={handleFastForward}>
                                <p className='text-sm text-muted-foreground font-semibold font-manrope'>10s</p>
                                <Image
                                    src="/ClockClockwise.svg"
                                    alt="rewind"
                                    width={20}
                                    height={20}
                                    quality={100}
                                />
                            </Button>
                        </div>

                        <Button variant="ghost" onClick={handleJumpEnd}>
                            <p className='text-sm text-muted-foreground font-semibold font-manrope'>Jump to end</p>
                            <ArrowRightToLine size={16} />
                        </Button>
                    </div>
                </div>
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

export default VideoEditor;
