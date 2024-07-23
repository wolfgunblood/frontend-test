// Timeline component
import React, { useEffect, useMemo, useRef, useState } from 'react';
import "../styles/Timeline.css"
import "../styles/Slider.css"
import { DisplayTime, generateTimeLabels } from '~/helpers/timeformat';
import TimelineHead from './TimelineHead';
import Image from 'next/image';
import { useAdStore } from 'store/useStore';
import Draggable from "react-draggable";
import Timestamps from './Timestamps';


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
    // const sliderValue = (currentTime / duration) * 100 || 0;
    const sliderValue = currentTime;

    const [controlValue, setControlValue] = useState(0);
    const [bottomSliderWidth, setBottomSliderWidth] = useState(100);

    // const markers = useAdStore(state => state.markers);
    // const initializeMarkers = useAdStore(state => state.initializeMarkers);
    const { markers, initializeMarkers, editMarker } = useAdStore();

    //Timeline Ref
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize markers
        initializeMarkers([
            { time: 300, type: 'AUTO' },
            { time: 1500, type: 'STATIC' },
            { time: 3600, type: 'AB' }
        ]);
    }, [initializeMarkers]);


    const computedMarkers = markers.map(marker => {
        // console.log(marker.time)
        // console.log(duration)
        const leftPercentage = (marker.time / duration) * 100;
        // const leftPercentage = (marker.time / duration) * bottomSliderWidth;
        // console.log(`Marker at ${marker.time}s, Type: ${marker.type}, Calculated Left: ${leftPercentage}%`);
        return {
            ...marker,
            url: markerUrls[marker.type],
            left: `${leftPercentage}%`
        };
    });

    const [ticks, setTicks] = useState<Array<{ left: string }>>([]);

    const calculateTicks = () => {
        if (timelineRef.current) {
            const timelineWidth  = timelineRef.current.offsetWidth; 
            const numberOfTicks = Math.floor(timelineWidth / 2);    

            const newTicks = Array.from({ length: numberOfTicks }, (_, index) => {
                const time = (index / numberOfTicks) * duration;   
                const leftPercentage = (time / duration) * 100;    
                return { left: `${leftPercentage}%` };
            });

            setTicks(newTicks);
        }
    };

    useEffect(() => {
        calculateTicks();
        window.addEventListener('resize', calculateTicks);  // Recalculate on window resize

        return () => {
            window.removeEventListener('resize', calculateTicks);  // Cleanup
        };
    }, [duration]);  // Recalculate when duration changes


    const timeLabels = generateTimeLabels(duration);

    const intervals = [8* 60, 8 * 60, 5 * 60, 5 * 60, 5* 60, 3 * 60, 3*60, 3*60, 3*60, 3*60, 3*60, 60];
    const interval = intervals[Math.min(controlValue, intervals.length - 1)];

    const timestamps = useMemo(() => {
        const numMarks = Math.floor(duration / interval!);
        return Array.from({ length: numMarks + 1 }, (_, index) => {
            const time = interval! * index;
            return { time: DisplayTime(time), left: `${(time / duration) * 100}%` };
        });
    }, [duration, interval]);

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

    //   const [initialPos, setInitialPos] = useState(null);

    //   const handleStart = (e, data) => {
    //       console.log("Drag started");
    //       setInitialPos(data.x);
    //   };
  
    //   const handleDrag = (e, data, index : number) => {
    //       console.log("Dragging");
        
    //   };
  
    //   const handleStop = (e, data, index :number) => {
    //       console.log("Dragging stopped");
          
    //       const timelineWidth = timelineRef.current ? timelineRef.current.offsetWidth : 0;
    //       const newLeft = Math.min(Math.max(data.x, 0), timelineWidth);
    //       const newLeftPercentage = (newLeft / timelineWidth) * 100;
    //       const newTime = Math.round((newLeftPercentage / 100) * duration);
          
    //       console.log(`Final new time (rounded): ${newTime}`);
          
    //       editMarker(index, newTime);
    //       console.log(`Updated markers:`, markers);
    //   };

    return (
        <div className='p-8 pb-12 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-8'>
            <TimelineHead
                currentTime={currentTime}
                controlValue={controlValue}
                handleControlChange={handleControlChange}
                setControlValue={setControlValue}
                setBottomSliderWidth={setBottomSliderWidth}
            />

            <div ref={timelineRef} className="relative custom-scrollbar w-full h-128px overflow-x-auto overflow-y-visible pt-12 pb-16">
                <div 
                    className="timeline-slider w-full h-full relative z-10" style={{
                        width: `${bottomSliderWidth}%`,
                        padding: '0 16px'
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
                    // style={{ transition: `left ${transitionDuration} ease-in-out` }}
                    // style={{ marginBottom: '16px' }}
                    />
                    {computedMarkers.map((marker, index) => (
            

                            <img
                                key={index}
                                className="absolute"
                                src={marker.url}
                                alt="Timeline marker"
                                style={{ left: marker.left, bottom: '0', height: '100%' }}
                            />
                    
                    ))}
                    {ticks.map((tick, index) => (
                        <div key={index} className="tick" style={{ left: tick.left }}></div>

                    ))}

                   <Timestamps 
                    timestamps={timestamps}
                   />

                </div>
            </div>

        </div>
    );
};

export default Timeline;
