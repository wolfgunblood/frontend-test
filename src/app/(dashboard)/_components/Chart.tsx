import { ArrowUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Chart = () => {
    return (
        <div className='flex flex-col gap-4 items-center'>
            <div className="w-full max-w-[256px] h-[201.74px] p-4 border border-zinc-200 rounded-2xl">
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-between'>
                        <div>
                            <h2 className='text-base text-zinc-800 font-semibold font-manrope'>
                                Weekly Plays
                            </h2>
                            <p className='text-2xl text-zinc-800 font-bold font-manrope'>
                                738,458
                            </p>
                        </div>
                        <div className='inline-flex items-center gap-2'>
                            <ArrowUp size={16} color='#16A34A' />
                            <p>17%</p>
                        </div>
                    </div>

                    <Image
                        src="/Graph.svg"
                        alt="graph"
                        width={256}
                        height={202}
                        className="object-fit"
                    />
                </div>
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