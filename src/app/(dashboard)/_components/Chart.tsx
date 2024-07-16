import Image from 'next/image'
import React from 'react'

const Chart = () => {
    return (
        <div className='flex flex-col gap-4 items-center'>
            <div className="w-full max-w-[256px] h-[201.74px] p-4 border border-zinc-200 rounded-2xl">
                <Image
                    src="/chart-widget.svg"
                    alt="Chart"
                    width={256}
                    height={202} 
                    className="object-cover w-full h-full"
                />
            </div>

            <div className='flex gap-3'>
                <Image
                    src="/Rectangle.svg"
                    alt="Rectangle"
                    width={8}
                    height={8}
                />
                <Image
                    src="/Ellipse6.svg"
                    alt="Ellipse"
                    width={8}
                    height={8}
                />
                <Image

                    src="/Ellipse7.svg"
                    alt="Ellipse"
                    width={8}
                    height={8}
                />
            </div>
        </div>
    )
}

export default Chart