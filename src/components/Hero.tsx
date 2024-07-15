import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react';

// type Props = {}

const Hero = () => {
    return (
        <div className="spcae-y-5">
            <Button variant="ghost" size="icon">
                <ArrowLeft />
                {" "}
                Ads
            </Button>
        </div>
    )
}

export default Hero