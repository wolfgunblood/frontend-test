import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react';
import Editor from './Editor';

// type Props = {}

const Hero = () => {
    return (
        <div className="p-10 spcae-y-5">
            <Button variant="ghost" size="icon">
                <ArrowLeft />
                {" "}
                Ads
            </Button>
            <h1>
                The Longevity Expert: The Truth About Ozempic, The Magic Weight Loss Drug & The Link Between Milk & Cancer!
            </h1>
            <p>
            Episode 503 • 12 April 2024
            </p>
            <Editor />
        </div>
    )
}

export default Hero