import React from "react";
import Intro from "./Intro";
import VideoEditor from "./video-editor";

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 p-16">
      <Intro />
      <VideoEditor />
    </div>
  );
};

export default Hero;
