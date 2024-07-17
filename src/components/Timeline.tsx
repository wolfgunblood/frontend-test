// Timeline component
import React, { useState } from 'react';
import "../styles/Timeline.css"
import { ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import "../styles/Slider.css"
import { DisplayTime } from '~/helpers/timeformat';


interface TimelineProps {
    currentTime: number;
    duration: number;
    onSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSeekMouseDown: () => void;
    onSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const Timeline: React.FC<TimelineProps> = ({
    currentTime,
    duration,
    onSeekChange,
    onSeekMouseDown,
    onSeekMouseUp
}) => {
    const [sliderValue, setSliderValue] = useState(1);

    

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);  
        return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
    };
    

    const generateTimeLabels = (duration :number) => {
        const interval = 10;
        const timeLabels = [];
        for (let time = 0; time <= duration; time += interval) {
            timeLabels.push(formatTime(time));
        }
        return timeLabels;
    };
    const timeLabels = generateTimeLabels(duration);


    return (
        <div className='p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-8'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-12'>
                    <Button className='inline-flex gap-3' variant="ghost">
                        <div className="w-8 h-8 gap-0 rounded-full border border-zinc-300 flex items-center justify-center">

                            <Image
                                src="/Undo.svg"
                                alt="undo"
                                width={16}
                                height={16}
                                quality={100}
                            />
                        </div>
                        <p className='text-sm text-muted-foreground font-semibold font-manrope'>Undo</p>
                    </Button>
                    <Button className='inline-flex gap-3' variant="ghost">
                        <div className="w-8 h-8 gap-0 rounded-full border border-zinc-300 flex items-center justify-center">

                            <Image
                                src="/Redo.svg"
                                alt="redo"
                                width={16}
                                height={16}
                                quality={100}
                            />
                        </div>
                        <p className='text-sm text-muted-foreground font-semibold font-manrope'>Redo</p>
                    </Button>
                </div>
                <div className='py-2 px-3 rounded-md border'>
                <p className=''>{DisplayTime(currentTime)}</p>
                </div>
                <div className='flex gap-6'>
                    <ZoomOut size={20} />
                    <div>
                        <input
                            type="range"
                            className="w-full cursor-pointer"
                            value={sliderValue}
                            // onChange={(e) => setSliderValue(e.target.value)}
                            min="1"
                            max="10"
                            step="1"
                        />
                    </div>
                    <ZoomIn size={20} />
                </div>
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={onSeekChange}
                    onMouseDown={onSeekMouseDown}
                    onMouseUp={onSeekMouseUp}
                    className="timeline-slider w-full h-2 appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                {timeLabels.map((label, index) => (
                    <div key={index} className="text-xs">
                        {label}
                    </div>
                ))}
            </div>
            </div>
            <div className="relative w-full h-2">
                <Image
                    src="/Frame.svg"
                    alt="scrollbar"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
        </div>
    );
};

export default Timeline;
