"use client"

import React from 'react'
import { LucideIcon } from "lucide-react";
import { cn } from '~/lib/utils';

interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
}

// type Props = {}

const SidebarItemsBottom = ({ icon: Icon, label }: SidebarItemProps) => {


    return (
        <button
            type='button'
            className={cn("text-zinc-500 transition-all hover:text-zinc-600 hover:bg-zinc-300/20",

            )}
        >
            <div
                className='flex items-center gap-3'
            >
                <Icon size={20} />
                <p className='text-base font-bold font-manrope'>

                    {label}
                </p>
            </div>

        </button>
    )
}

export default SidebarItemsBottom