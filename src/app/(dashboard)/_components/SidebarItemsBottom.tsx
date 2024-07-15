"use client"

import React from 'react'
import { LucideIcon } from "lucide-react";
import { cn } from '~/lib/utils';

interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
}

// type Props = {}

const SidebarItemsBottom = ({ icon: Icon, label}: SidebarItemProps) => {

 
    return (
        <button
            type='button'
            className={cn("flex items-center gap-x-2 text-slate-500 pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
            )}
        >
            <div className='flex items-center gap-x-2 py-4'>
                <Icon size={22} className={cn("text-slate-500" )} />
                {label}
            </div>
            <div
            className={cn(
                "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
            )}
            >
            </div>
        </button>
    )
}

export default SidebarItemsBottom