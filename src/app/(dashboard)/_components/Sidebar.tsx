import React from 'react'
import SidebarRoutes from './SidebarRoutes'
import { Button } from '~/components/ui/button'
import SidebarRoutesBottom from './SidebarRoutesBottom'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react';
import Chart from './Chart'


// type Props = {}

const Sidebar = () => {
  return (
    <div
      className="w-80 min-h-screen p-8 border-r border-zinc-200 overflow-y-auto flex flex-col justify-between"
    >
      <div className='flex flex-col items-center gap-8'>
        <div className='flex flex-col gap-4'>
          <Button className='text-sm font-medium'>
            Create a podcast
          </Button>
          <button
            className="w-64 h-14 px-4 py-3 border border-zinc-200 bg-white flex justify-between items-center"
          >
            <Image
              src="https://s3-alpha-sig.figma.com/img/5bfd/2e19/f00cb43c501ce9855962fd332c2aaaf0?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AWBEGN23L0qlkPJMBspltYDkmXGBSyZryCtlb3RZWPNIm2SZx-2CQDzQKovyrKsRX9S7kUtJCwfHReQ2875FDB6iko2Lcf8zfLWdzumIvW5nrLSPdSQqfN1wPUbZ1jyFNa1wjJvefBIqfR9YXhDhkSStLh~TuM8MJKXzMbH-9~Q0oPjyySJFjAQMrTVoR9ZlB85cSHoiBBf8vJAhyGTJZN8HnrI1T5cMljLz9X8WVnAKZRXwcA3uekYWeeTAJZE~C-ejvtGIrzU2GHnPj3~NQTZCoc8Xxezrdv3Frjy~aLL34D3b8mYTY9TvQ~mW5kJU0VwxfrtjHpyx9kaELTmH3Q__"
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

      <Chart />
      <SidebarRoutesBottom />
    </div>
  )
}

export default Sidebar