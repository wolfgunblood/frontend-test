"use client"

import React from 'react'
import { LucideIcon } from "lucide-react";
import { cn } from '~/lib/utils';
import { Switch } from "~/components/ui/switch"


interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
    flag: boolean
}

// type Props = {}

const SidebarItemsBottom = ({ icon: Icon, label, flag }: SidebarItemProps) => {

    return (

        <div
            className='flex items-center gap-3'
        >
            <button
                type='button'
                className={cn("text-zinc-500 transition-all hover:text-zinc-600 hover:bg-zinc-300/20",
                    'flex items-center gap-3'
                )}
            >
                <Icon size={20} />
                <p className='text-base font-bold font-manrope'>

                    {label}
                </p>


            </button>
            {
                flag && <Switch />
            }
        </div>

    )
}

export default SidebarItemsBottom