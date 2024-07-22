import { ArrowUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Chart = () => {
    return (
        <div className='flex flex-col rounded-lg gap-4 items-center'>
            {/* Charts */}

            <div className="w-full max-w-[256px] h-[201.74px] p-4 border bg-white border-zinc-200 rounded-2xl">
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-base text-zinc-800 font-semibold font-manrope'>
                                Weekly Plays
                            </h3>
                            <p className='text-2xl text-zinc-800 font-extrabold font-manrope'>
                                738,458
                            </p>
                        </div>
                        <div className='inline-flex items-center gap-2'>
                            <ArrowUp size={16} color='#16A34A' />
                            <span className='text-base text-muted-foreground font-bold font-manrope'>17%</span>
                        </div>
                    </div>

                    <Image
                        src="/Graph.svg"
                        alt="graph"
                        width={224}
                        height={90}
                        className="object-fit"
                    />
                </div>
            </div>

            {/* Three dots */}

            <div className='flex items-center gap-3'>
                <Image
                    src="/Rectangle.svg"
                    alt="Rectangle"
                    width={8}
                    height={24}
                    className='rounded-lg cursor-pointer'
                />
                <Image
                    src="/Ellipse6.svg"
                    alt="Ellipse"
                    width={8}
                    height={8}
                    className='cursor-pointer'
                />
                <Image
                    src="/Ellipse7.svg"
                    alt="Ellipse"
                    width={8}
                    height={8}
                    className='cursor-pointer'
                />
            </div>
        </div>
    )
}

export default Chart