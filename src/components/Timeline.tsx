// Timeline component
import React from 'react';
import "../styles/Timeline.css"

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
    return (
        <div>
            <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0} // Ensure the calculation doesn't result in NaN
                onChange={onSeekChange}
                onMouseDown={onSeekMouseDown}
                onMouseUp={onSeekMouseUp}
                className="timeline-slider w-full h-2 appearance-none cursor-pointer"
            />
        </div>
    );
};

export default Timeline;
