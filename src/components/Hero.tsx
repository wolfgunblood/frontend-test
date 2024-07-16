import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react';
import Editor from './my-references/Editor';
import VideoEditor from './VIdeoEditor';

// type Props = {}

const Hero = () => {
    return (
        <div className="p-16 flex flex-col gap-8">
            <div className='w-[616px] flex flex-col items-start gap-4'>
                <Button variant="ghost" size="icon">
                    <ArrowLeft />
                    {" "}
                    <p className='text-sm text-muted-foreground font-semibold font-manrope'>
                        Ads
                    </p>
                </Button>
                <h1 className='text-3xl text-zinc-800 font-bold font-manrope'>
                    The Longevity Expert: The Truth About Ozempic, The Magic Weight Loss Drug & The Link Between Milk & Cancer!
                </h1>
                <p className='text-base text-zinc-500 font-semibold font-manrope'>
                    Episode 503 • 12 April 2024
                </p>
            </div>
        
            <VideoEditor />
        </div>
    )
}

export default Hero