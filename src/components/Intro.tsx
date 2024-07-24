import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Intro = () => {
  return (
    <div className="flex w-[616px] flex-col items-start gap-4">
      <Button variant="ghost" size="icon" aria-label="ads">
        <Image src="/Ads.svg" alt="Ads" width={43} height={20} />
      </Button>
      <h1 className="font-manrope text-3xl font-bold text-zinc-800">
        The Longevity Expert: The Truth About Ozempic, The Magic Weight Loss
        Drug & The Link Between Milk & Cancer!
      </h1>
      <p className="font-manrope text-base font-semibold text-zinc-500">
        Episode 503 • 12 April 2024
      </p>
    </div>
  );
};

export default Intro;
