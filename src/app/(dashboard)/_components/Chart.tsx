import Image from 'next/image'
import React from 'react'

const Chart = () => {
    return (
        <div className='flex flex-col gap-4'>

        <Image
            src="/chart-widget.svg"
            alt="Chart"
            width={32}
            height={32}
            className="w-8 h-8 rounded-sm"
            />
            </div>
    )
}

export default Chart