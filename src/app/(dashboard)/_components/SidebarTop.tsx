import Image from 'next/image'
import React from 'react'
import { Button } from '~/components/ui/button'

const SidebarTop = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Button className='text-sm text-primary-foreground font-medium font-inter' aria-label='Create a podcast'>
        Create a podcast
      </Button>
      <button
        className="w-64 px-4 py-3 rounded-lg border border-zinc-200 bg-white flex justify-between items-center"
        aria-label='Diary of a CEO'
      >
        <div className='flex items-center gap-3'>
        <Image
          src="https://s3-alpha-sig.figma.com/img/5bfd/2e19/f00cb43c501ce9855962fd332c2aaaf0?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AWBEGN23L0qlkPJMBspltYDkmXGBSyZryCtlb3RZWPNIm2SZx-2CQDzQKovyrKsRX9S7kUtJCwfHReQ2875FDB6iko2Lcf8zfLWdzumIvW5nrLSPdSQqfN1wPUbZ1jyFNa1wjJvefBIqfR9YXhDhkSStLh~TuM8MJKXzMbH-9~Q0oPjyySJFjAQMrTVoR9ZlB85cSHoiBBf8vJAhyGTJZN8HnrI1T5cMljLz9X8WVnAKZRXwcA3uekYWeeTAJZE~C-ejvtGIrzU2GHnPj3~NQTZCoc8Xxezrdv3Frjy~aLL34D3b8mYTY9TvQ~mW5kJU0VwxfrtjHpyx9kaELTmH3Q__"
          alt="CEO"
          width={32}
          height={32}
          className="w-8 h-8 rounded-sm"
          />
        <span className='text-base text-zinc-500 font-bold font-manrope'>
          The Diary of a CEO
        </span>
          </div>
        <Image
          src="/chevron-down.svg"
          alt="Chevron Down"
          width={16}
          height={16}
        />

      </button>
    </div>
  )
}

export default SidebarTop