import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { DisplayTime } from '~/helpers/timeformat'
import "../styles/TimelineHead.css"

interface TimelineHeadProps {
    currentTime: number;
}
const TimelineHead: React.FC<TimelineHeadProps> = ({ currentTime }) => {
    return (
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
                    <span className='text-sm text-muted-foreground font-semibold font-manrope'>Undo</span>
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
                    <span className='text-sm text-muted-foreground font-semibold font-manrope'>Redo</span>
                </Button>
            </div>
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
                        //   value={sliderValue}
                        //   onChange={(e) => setSliderValue(e.target.value)}
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
    )
}

export default TimelineHead