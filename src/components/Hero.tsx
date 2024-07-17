import React from 'react'
import VideoEditor from './VIdeoEditor';
import Intro from './Intro';


const Hero = () => {
    return (
        <div className="p-16 flex flex-col gap-8">
            <Intro />
            <VideoEditor />
        </div>
    )
}

export default Hero