"use client"

import React from 'react';
import { BarChart3, Compass, Layout, CircleDollarSign, Tv, Import, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SidebarItemsBottom from './SidebarItemsBottom';

// type Props = {}

const mainRoutes = [
    {
        icon: Layout,
        label: 'Demo',
    },
    {
        icon: BarChart3,
        label: "Invite your team",
    },
    {
        icon: CircleDollarSign,
        label: "Give feedback",
    },
    {
        icon: Tv,
        label: "Help $ support",
    },

];



const SidebarRoutesBottom = () => {
    const pathname = usePathname();
    const routes = mainRoutes;
    return (
        <div className='flex flex-col w-full'>
            {routes.map((route, index) => (
                <SidebarItemsBottom
                    key={index}
                    icon={route.icon}
                    label={route.label}
                />
            ))}
        </div>
    )
}

export default SidebarRoutesBottom