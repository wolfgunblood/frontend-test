import React from 'react'
import Intro from './Intro';
import VideoEditor from './video-editor';


const Hero = () => {
    return (
        <div className="p-16 flex flex-col gap-8">
            <Intro />
            <VideoEditor />
            {/* <VideoEditor /> */}
        </div>
    )
}

export default Hero