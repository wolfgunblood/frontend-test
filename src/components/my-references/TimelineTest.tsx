// Timeline component
import React, { useEffect, useMemo, useRef, useState } from 'react';
import "../../styles/TimelineTest.css"
import { ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import "../../styles/Slider.css"
import { DisplayTime, generateTimeLabels } from '~/helpers/timeformat';
import { useAdStore } from 'store/useStore';



interface TimelineProps {
    currentTime: number;
    duration: number;
    onSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSeekMouseDown: () => void;
    onSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void;
}


// const markers = [
//     { time: 10, url: '/ad2.svg' },
//     { time: 80, url: '/ad3.svg' },
//     { time: 120, url: '/ad1.svg' }
// ];

const markerUrls = {
    'AUTO': '/ad2.svg',
    'STATIC': '/ad3.svg',
    'AB': '/ad1.svg'
};


const TimelineTest: React.FC<TimelineProps> = ({
    currentTime,
    duration,
    onSeekChange,
    onSeekMouseDown,
    onSeekMouseUp
}) => {

    // const sliderValue = (currentTime / duration) * 100 || 0;
    const sliderValue = currentTime;
    // const [sliderValue, setSliderValue] = useState((currentTime / duration) * 100);

    const [controlValue, setControlValue] = useState(0);
    const [bottomSliderWidth, setBottomSliderWidth] = useState(100);

    const sliderRef = useRef<HTMLDivElement>(null);
    const [lineData, setLineData] = useState([]);

    const markers = useAdStore(state => state.markers);
    const initializeMarkers = useAdStore(state => state.initializeMarkers);

 


    useEffect(() => {
        // Initialize markers
        initializeMarkers([
            { time: 10, type: 'AUTO' },
            { time: 80, type: 'STATIC' },
            { time: 120, type: 'AB' }
        ]);
    }, [initializeMarkers]);

    const computedMarkers = markers.map(marker => ({
        ...marker,
        url: markerUrls[marker.type],
        left: `${(marker.time / duration) * 100}%`
    }));

    const ticks = Array.from({ length: Math.floor(duration) + 1 }, (_, i) => ({
        left: (i / duration) * 100
    }));
    const timeLabels = generateTimeLabels(duration);
    // console.log(sliderValue)

    const timestamps = useMemo(() => {
        const numMarks = Math.floor(duration / 60);
        return Array.from({ length: numMarks + 1 }, (_, index) => {
            const time = 60 * index;
            return { time: DisplayTime(time), left: `${(time / duration) * 100}%` };
        });
    }, [duration]);

    // useEffect(() => {
    //     // Log state changes to verify correct update timing
    //     console.log(`Control Value: ${controlValue}, Bottom Slider Width: ${bottomSliderWidth}`);
    //     const newWidth = controlValue === 0 ? 100 : 100 + controlValue * 10;
    //     setBottomSliderWidth(newWidth);
    // }, [controlValue]);

    // const handleControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setControlValue(Number(e.target.value));
    // };

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
    // console.log(bottomSliderWidth)

    console.log(markers)

  


    return (
        <div className='p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-8'>
            <div className='flex justify-between items-center'>

                <div className='py-2 px-3 rounded-md border'>
                    <span className='text-base text-zinc-500 font-semibold font-manrope'>{DisplayTime(currentTime)}</span>
                </div>
                <div className="flex items-center justify-center gap-6">

                    <div className="custom-range w-full h-full relative">
                        <input
                            type="range"
                            value={controlValue}
                            onChange={handleControlChange}
                            min="0"
                            max="10"
                            step="1"
                        />
                    </div>

                </div>
            </div>
            <div className="relative custom-scrollbar w-full h-128px overflow-x-auto overflow-y-visible pt-16">
                <div className="timeline-slider w-full h-full relative z-10" style={{
                    width: `${bottomSliderWidth}%`,
                    padding : '0 16px',
                    backgroundSize: `1000px 64px, cover`
                }}>

                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={sliderValue}
                        onChange={onSeekChange}
                        onMouseDown={onSeekMouseDown}
                        onMouseUp={onSeekMouseUp}
                        className="w-full h-2 appearance-none cursor-pointer"
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
                    {
                        ticks.map((tick, index) => (
                            <div key={index} className="tick" style={{ left: `${tick.left}%` }}></div>
                        ))
                    }


                    < div className="w-full flex justify-between text-xs text-zinc-500" style={{ position: 'relative', bottom: '-50px' }}>
                        {timestamps.map((timestamp, index) => (
                            <span
                                key={index}
                                style={{
                                    left: timestamp.left,
                                }}
                                className={`w-full border-l-2 border-zinc-500 text-center ${index === timestamps.length - 1 ? "border-r-2" : ""}`}
                            >
                                {timestamp.time}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div >

    );
};

export default TimelineTest;


