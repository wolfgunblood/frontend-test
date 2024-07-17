import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const Intro = () => {
    return (
        <div className='w-[616px] flex flex-col items-start gap-4'>
            <Button variant="ghost" size="icon">
                <Image
                    src="/Ads.svg"
                    alt="Ads"
                    width={43}
                    height={20}
                />
            </Button>
            <h1 className='text-3xl text-zinc-800 font-bold font-manrope'>
                The Longevity Expert: The Truth About Ozempic, The Magic Weight Loss Drug & The Link Between Milk & Cancer!
            </h1>
            <p className='text-base text-zinc-500 font-semibold font-manrope'>
                Episode 503 • 12 April 2024
            </p>
        </div>
    )
}

export default Intro