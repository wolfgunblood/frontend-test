import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { DisplayTime } from '~/helpers/timeformat'
import "../styles/TimelineHead.css"
import { useAdStore } from 'store/useStore'

interface TimelineHeadProps {
    currentTime: number;
    controlValue: number;
    setControlValue: React.Dispatch<React.SetStateAction<number>>;
    setBottomSliderWidth: React.Dispatch<React.SetStateAction<number>>;
    handleControlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TimelineHead: React.FC<TimelineHeadProps> = ({ currentTime, controlValue, handleControlChange, setControlValue, setBottomSliderWidth }) => {

    const { undo,redo } = useAdStore();

    const handleZoomIn = () => {
        if (controlValue < 10) {
            setControlValue(prev => prev + 1);
            setBottomSliderWidth(100 + (controlValue + 1) * 10);
        }
    };

    const handleZoomOut = () => {
        if (controlValue > 0) {
            setControlValue(prev => prev - 1);
            setBottomSliderWidth(100 + (controlValue - 1) * 10);
        }
    };

    return (
        <div className='flex justify-between items-center'>
            
            {/* Undo & Redo */}

            <div className='flex gap-6'>
                <Button className='inline-flex gap-3' variant="ghost" onClick={undo} aria-label='Undo'>
                    <div className="w-8 h-8 gap-0 rounded-full border border-zinc-300 flex items-center justify-center">

                        <Image
                            src="/Undo.svg"
                            alt="undo"
                            width={16}
                            height={16}
                            quality={100}
                        />
                    </div>
                    <span className='text-sm text-muted-foreground font-semibold font-manrope'>Undo</span>
                </Button>
                <Button className='inline-flex gap-3' variant="ghost" onClick={redo} aria-label='Redo'>
                    <div className="w-8 h-8 gap-0 rounded-full border border-zinc-300 flex items-center justify-center">

                        <Image
                            src="/Redo.svg"
                            alt="redo"
                            width={16}
                            height={16}
                            quality={100}
                        />
                    </div>
                    <span className='text-sm text-muted-foreground font-semibold font-manrope'>Redo</span>
                </Button>
            </div>
            
            {/* Current Time */}

            <div className='py-2 px-3 rounded-md border'>
                <span className='text-base text-zinc-500 font-semibold font-manrope'>{DisplayTime(currentTime)}</span>
            </div>

            {/* Zoom level */}
            
            <div className="flex items-center justify-center gap-6">

                <Image
                    src="/MagnifyingGlassMinus.svg"
                    alt="Zoom Out"
                    width={20}
                    height={20}
                    quality={100}
                    onClick={handleZoomOut}
                    className='cursor-pointer'
                    />
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

                <Image
                    src="/MagnifyingGlassPlus.svg"
                    alt="Zoom In"
                    width={20}
                    height={20}
                    quality={100}
                    onClick={handleZoomIn}
                    className='cursor-pointer'
                    />
            </div>
        </div>
    )
}

export default TimelineHead