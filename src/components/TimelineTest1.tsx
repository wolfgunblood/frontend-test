// Timeline component
import React, { useState } from 'react';
import "../styles/TimelineTest.css"
import { ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import "../styles/Slider.css"
import { DisplayTime, generateTimeLabels } from '~/helpers/timeformat';


interface TimelineProps {
    currentTime: number;
    duration: number;
    onSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSeekMouseDown: () => void;
    onSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const markers = [
    { time: 10, url: '/ad1.svg' },
    { time: 50, url: '/ad2.svg' },
    { time: 75, url: '/ad3.svg' }
];


const TimelineTest: React.FC<TimelineProps> = ({
    currentTime,
    duration,
    onSeekChange,
    onSeekMouseDown,
    onSeekMouseUp
}) => {

    const sliderValue = (currentTime / duration) * 100 || 0;

    const computedMarkers = markers.map(marker => ({
        ...marker,
        left: `${(marker.time / duration) * 100}%`
    }));

    const ticks = Array.from({ length: Math.floor(duration) + 1 }, (_, i) => ({
        left: (i / duration) * 100
    }));
    const timeLabels = generateTimeLabels(duration);

    return (
        <div className='p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-8'>
            <div className='flex justify-between items-center'>
         
            <div className='py-2 px-3 rounded-md border'>
                <span className='text-base text-zinc-500 font-semibold font-manrope'>{DisplayTime(currentTime)}</span>
            </div>
            <div className="flex items-center justify-center gap-6">
                <Image
                    src="/MagnifyingGlassMinus.svg"
                    alt="Zoom Out"
                    width={20}
                    height={20}
                    quality={100}
                />
                <div className="custom-range w-full h-full relative">
                    <input
                        type="range"
                          value={sliderValue}
                          onChange={(e) => setSliderValue(e.target.value)}
                        min="1"
                        max="10"
                        step="1"
                    />
                </div>
                <Image
                    src="/MagnifyingGlassPlus.svg"
                    alt="Zoom In"
                    width={20}
                    height={20}
                    quality={100}
                />
            </div>
        </div>
            <div className="relative w-full h-128px ">
                <div className="timeline-slider w-full h-full relative z-10">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={onSeekChange}
                        onMouseDown={onSeekMouseDown}
                        onMouseUp={onSeekMouseUp}
                        className="w-full h-2 appearance-none cursor-pointer"
                    />
                    {/* {computedMarkers.map((marker, index) => (
                        <img
                            key={index}
                            src={marker.url}
                            className="absolute"
                            style={{ left: marker.left, bottom: '0', height: '100%' }}
                            alt="Timeline marker"
                        />
                    ))}
                    {ticks.map((tick, index) => (
                        <div key={index} className="tick" style={{ left: `${tick.left}%` }}></div>
                    ))} */}

                    {/* <div className='w-full absolute -bottom-8'>

                        <div className="flex justify-between items-center overflow-hidden">
                            {timeLabels.map((label, index) => (
                                <div key={index} className='border-r px-2'>
                                    <p className="text-sm font-manrope font-semibold text-muted-foreground">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>

        </div>
    );
};

export default TimelineTest;


