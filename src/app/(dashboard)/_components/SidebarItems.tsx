"use client"

import React from 'react'
import { LucideIcon } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from '~/lib/utils';

interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
    href: string
}

// type Props = {}

const SidebarItems = ({ icon: Icon, label, href }: SidebarItemProps) => {

    const pathname = usePathname();
    const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`);

    return (
        <button
            type='button'
            className={cn("text-zinc-500 transition-all hover:text-zinc-600 hover:bg-zinc-300/20",
                isActive && "text-zinc-800 hover:text-zinc-800/90 "
                
            )}
        >
            <div
                className='flex items-center gap-4'
            >
                <Icon size={20} />
                <p className='text-2xl font-bold font-manrope'>

                {label}
                </p>
            </div>
       
        </button>
    )
}

export default SidebarItems