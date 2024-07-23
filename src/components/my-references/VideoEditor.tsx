"use client"
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '../ui/button';
import { Play, Pause, ArrowLeftToLine, ArrowRightToLine, Rewind, FastForward, History } from 'lucide-react';
import { useVideoStore } from 'store/useStore';
import Timeline from '../Timeline';
import Admaker from '../Admaker';
import Image from 'next/image';
import TimelineTest from './TimelineTest';

const darkIconStyle = { fill: '#27272A' };

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
        // console.log(data)
        // console.log(data.playedSeconds)
        if (!seeking) {
            setCurrentTime(data.playedSeconds);

        }
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeeking(true);
        // console.log(e.target.value)
        // const newTime = (parseFloat(e.target.value) / 100) * duration;
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
    };

    const handleSeekMouseDown = () => {
        setSeeking(true);
    };

    const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
        // const newTime = (parseFloat(e.currentTarget.value) / 100) * duration;
        const newTime = parseFloat(e.currentTarget.value);
        // console.log(e.currentTarget.value)
        // console.log(newTime)
        setSeeking(false);
        playerRef.current?.seekTo(newTime, 'seconds');

        // setPlaying(true);

        // Set to false temporarily to stabilize updates
        setPlaying(false);
        setTimeout(() => {
            setPlaying(true);
        }, 100);
    };

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex gap-8'>
                <Admaker />
                <div className='p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-4'>
                    <div className="rounded-lg overflow-hidden ">
                        <ReactPlayer
                            ref={playerRef}
                            // url='https://utfs.io/f/37835069-4b3e-48e8-97b5-da654c1de85b-m0d2yz.mp4'
                            url='https://www.youtube.com/watch?v=V0ej29G7ZGg&t=1694s'
                            controls={true}
                            playing={playing}
                            onProgress={onProgress}
                            // progressInterval={500}
                            width='100%'
                            heigth='100%'
                        />
                    </div>
                    <div className='p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-center gap-4'>
                        <Button className='inline-flex gap-2' variant="ghost" onClick={handleJumpStart} aria-label='jump to start'>
                            <div className="w-8 h-8 gap-0 rounded-full border border-zinc-300 flex items-center justify-center">
                                <Image
                                    src="/ArrowLineLeft.svg"
                                    alt='Jump to Start'
                                    width={16}
                                    height={16}
                                />
                            </div>
                            <span className='text-sm text-muted-foreground font-semibold font-manrope'>Jump to start</span>

                        </Button>
                        <div className='flex justify-between items-center'>
                            <Button className='inline-flex gap-2' variant="ghost" onClick={handleRewind} aria-label='Rewind'>
                                <Image
                                    src="/ClockAntiClockwise.svg"
                                    alt="rewind"
                                    width={20}
                                    height={20}
                                    quality={100}
                                />
                                <span className='text-sm text-muted-foreground font-semibold font-manrope'>10s</span>
                            </Button>
                            <Button variant="ghost" onClick={handleRewind} aria-label='Rewind'>
                                {/* <Image
                                    src="/Rewind.svg"
                                    alt="rewind"
                                    width={20}
                                    height={20}
                                    quality={100}
                                    /> */}
                                <Rewind size={20} style={darkIconStyle} />
                            </Button>
                            <Button variant="ghost" onClick={handlePlayPause} aria-label='Play/Pause'>
                                {
                                    playing ?
                                        <Pause size={32} style={darkIconStyle} />
                                        :
                                        <Play size={32} style={darkIconStyle} />
                                    //Some reason width and heigth getting over rid
                                    // <Image
                                    //     src="/Play.svg"
                                    //     alt="Play"
                                    //     width={32}
                                    //     height={32}
                                    //     quality={100}
                                    // />
                                }
                            </Button>
                            <Button variant="ghost" onClick={handleFastForward} aria-label='Fast Forward'>
                                {/* <Image
                                    src="/FastForward.svg"
                                    alt="Fast Forward"
                                    width={20}
                                    height={20}
                                    quality={100}
                                /> */}
                                <FastForward size={20} style={darkIconStyle} />
                            </Button>
                            <Button className='inline-flex gap-2' variant="ghost" onClick={handleFastForward} aria-label='Fast Forward'>
                                <span className='text-sm text-muted-foreground font-semibold font-manrope'>10s</span>
                                <Image
                                    src="/ClockClockwise.svg"
                                    alt="fast forward"
                                    width={20}
                                    height={20}
                                    quality={100}
                                />
                            </Button>
                        </div>

                        <Button className='inline-flex gap-2' variant="ghost" onClick={handleJumpEnd} aria-label='Jump to Start'>
                            <span className='text-sm text-muted-foreground font-semibold font-manrope'>Jump to end</span>
                            <div className="w-8 h-8 gap-0 rounded-full border border-zinc-300 flex items-center justify-center">
                                <Image
                                    src="/ArrowLineLeft.svg"
                                    alt='Jump to End'
                                    width={16}
                                    height={16}
                                    className="transform rotate-180"

                                />
                            </div>
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
            {/* <TimelineTest
                currentTime={currentTime}
                duration={duration}
                onSeekChange={handleSeekChange}
                onSeekMouseDown={handleSeekMouseDown}
                onSeekMouseUp={handleSeekMouseUp}
            /> */}
        </div>
    );
};

export default VideoEditor;