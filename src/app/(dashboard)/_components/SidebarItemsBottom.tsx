"use client"

import React from 'react'
import { cn } from '~/lib/utils';
import { Switch } from "~/components/ui/switch"
import Image from 'next/image';

interface SidebarItemProps {
    icon: string,
    label: string,
    flag: boolean
}


const SidebarItemsBottom = ({ icon, label, flag }: SidebarItemProps) => {

    return (

        <div
            className='flex items-center gap-3'
        >
            <button
                type='button'
                className={cn("text-base font-bold font-manrope text-zinc-500 transition-all hover:text-zinc-600 hover:bg-zinc-300/20",
                    'flex items-center gap-3'
                )}
                aria-label={label}
            >
                <Image
                    src={icon}
                    alt={label}
                    width={20}
                    height={20}
                />
                <span>
                    {label}
                </span>
            </button>
            {
                flag && <Switch />
            }
        </div>

    )
}

export default SidebarItemsBottom