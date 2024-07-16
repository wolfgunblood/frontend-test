import React from 'react'
import SidebarRoutes from './SidebarRoutes'
import { Button } from '~/components/ui/button'
import SidebarRoutesBottom from './SidebarRoutesBottom'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react';


// type Props = {}

const Sidebar = () => {
  return (
    <div
      className="w-80 p-8 border-r border-zinc-200 overflow-y-auto flex flex-col justify-between gap-8"
    >
      <div className='flex flex-col items-center gap-8'>
        <div className='flex flex-col gap-4'>
          <Button className='text-sm font-medium'>
            Create a podcast
          </Button>
          <button
            className="
           w-64 h-14 px-4 py-3
           border  border-zinc-200
           bg-white
           flex justify-between
           items-center
         "
          >
            <Image
              src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/d9/d914572f48a082fea29673264f0eacddbe371462.jpg"
              alt="CEO"
              width={32}
              height={32}
              className="w-8 h-8 rounded-sm"
            />
            <p className='text-base text-zinc-500 font-bold font-manrope'>

              The Diary of a CEO
            </p>
            <ChevronDown size={16} />

          </button>
        </div>
      
          <SidebarRoutes />
      </div>

      <div>
        Charts
      </div>
        <SidebarRoutesBottom />
    </div>
  )
}

export default Sidebar