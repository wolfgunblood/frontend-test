import React, { useState } from 'react';
import "../styles/TimelineTest.css";
import Image from 'next/image';
import { DisplayTime } from '~/helpers/timeformat';

interface TimelineProps {
    currentTime: number;
    duration: number;
    onSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSeekMouseDown: () => void;
    onSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const TimelineTest: React.FC<TimelineProps> = ({
    currentTime,
    duration,
    onSeekChange,
    onSeekMouseDown,
    onSeekMouseUp
}) => {
    const [sliderValue, setSliderValue] = useState((currentTime / duration) * 100 || 0);
    const [controlValue, setControlValue] = useState(10); 
    const [bottomSliderWidth, setBottomSliderWidth] = useState(100); 
    const [bottomSliderMax, setBottomSliderMax] = useState(100); 

    const handleControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newControlValue = Number(e.target.value);
        setControlValue(newControlValue);
        setBottomSliderWidth(100 + newControlValue * 10); 
        setBottomSliderMax(100 + newControlValue * 10); 
    };

    return (
        <div className='p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-8'>
            <div className='flex justify-between items-center'>
                <div className='py-2 px-3 rounded-md border'>
                    <span className='text-base text-zinc-500 font-semibold font-manrope'>{DisplayTime(currentTime)}</span>
                </div>
                <div className="custom-range w-full h-full relative">
                    <input
                        type="range"
                        value={controlValue}
                        onChange={handleControlChange}
                        min="1"
                        max="10"
                        step="1"
                    />
                </div>
            </div>
            <div className="relative custom-scrollbar w-full h-128px overflow-x-auto">
                <div className="timeline-slider w-full h-full relative z-10" style={{ width: `${bottomSliderWidth}%` }}>
                    <input
                        type="range"
                        min="0"
                        max={bottomSliderMax}
                        value={sliderValue}
                        onChange={onSeekChange}
                        onMouseDown={onSeekMouseDown}
                        onMouseUp={onSeekMouseUp}
                        className="w-full h-2 appearance-none cursor-pointer"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TimelineTest;

