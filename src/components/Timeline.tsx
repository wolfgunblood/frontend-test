// Timeline component
import React, { useMemo, useRef, useState } from 'react';
import "../styles/Timeline.css"
import "../styles/Slider.css"
import { DisplayTime, generateTimeLabels } from '~/helpers/timeformat';
import TimelineHead from './TimelineHead';
import Image from 'next/image';


const markers = [
    { time: 10, url: '/ad2.svg' },
    { time: 80, url: '/ad3.svg' },
    { time: 120, url: '/ad1.svg' }
];

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
    const sliderValue = (currentTime / duration) * 100 || 0;

    const [controlValue, setControlValue] = useState(0);
    const [bottomSliderWidth, setBottomSliderWidth] = useState(100);


    const computedMarkers = markers.map(marker => ({
        ...marker,
        left: `${(marker.time / duration) * 100}%`
    }));

    const ticks = Array.from({ length: Math.floor(duration) + 1 }, (_, i) => ({
        left: (i / duration) * 100
    }));
    const timeLabels = generateTimeLabels(duration);

    const timestamps = useMemo(() => {
        const numMarks = Math.floor(duration / 60);
        return Array.from({ length: numMarks + 1 }, (_, index) => {
            const time = 60 * index;
            return { time: DisplayTime(time), left: `${(time / duration) * 100}%` };
        });
    }, [duration]);

    const handleControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newControlValue = Number(e.target.value);
        setControlValue(newControlValue);
        console.log(controlValue)
        if (newControlValue === 0) {
            setBottomSliderWidth(100);
        } else {
            setBottomSliderWidth(100 + newControlValue * 10);
        }

    };

    return (
        <div className='p-8 pb-12 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-8'>
            <TimelineHead
                currentTime={currentTime}
                controlValue={controlValue}
                handleControlChange={handleControlChange}
                setControlValue={setControlValue}
                setBottomSliderWidth={setBottomSliderWidth}
            />

            <div className="relative custom-scrollbar w-full h-128px overflow-x-auto overflow-y-visible pt-12 pb-16">
                <div className="timeline-slider w-full h-full relative z-10" style={{
                    width: `${bottomSliderWidth}%`,
                    padding: '0 16px'
                }}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={onSeekChange}
                        onMouseDown={onSeekMouseDown}
                        onMouseUp={onSeekMouseUp}
                        className="w-full h-2 appearance-none cursor-pointer"
                    // style={{ marginBottom: '16px' }}
                    />
                    {computedMarkers.map((marker, index) => (
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
                    ))}


                    <div className="w-full flex justify-between text-xs text-zinc-500" style={{ position: 'relative', bottom: '-50px' }}>
                        {timestamps.map((timestamp, index) => (
                            <span
                                key={index}
                                style={{
                                    left: timestamp.left,
                                }}
                                className={`w-full border-l-2 border-zinc-300 text-center ${index === timestamps.length - 1 ? "border-r-2" : ""}`}
                            >
                                <span className='text-sm text-muted-foreground font-semibold font-manrope'>
                                    {timestamp.time}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Timeline;
