import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react';
import Editor from './my-references/Editor';
import VideoEditor from './VIdeoEditor';

// type Props = {}

const Hero = () => {
    return (
        <div className="w-full p-16 gap-8">
            <div>

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
            </div>
            <VideoEditor />
        </div>
    )
}

export default Hero