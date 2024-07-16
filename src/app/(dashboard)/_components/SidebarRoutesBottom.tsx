"use client"

import React from 'react';
import { BarChart3,  CirclePlay, CircleDollarSign, Tv,} from 'lucide-react';
import SidebarItemsBottom from './SidebarItemsBottom';

// type Props = {}

const mainRoutes = [
    {
        icon:  CirclePlay,
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
    const routes = mainRoutes;
    return (
        <div className='flex flex-col gap-4 py-0 px-8'>
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