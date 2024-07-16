"use client"

import React from 'react';
import { BarChart3,House , CircleDollarSign, Tv, Import, Settings } from 'lucide-react';
import SidebarItems from './SidebarItems';

// type Props = {}

const mainRoutes = [
    {
        icon: House,
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        icon: BarChart3,
        label: "Analytics",
        href: '/'
    },
    {
        icon: CircleDollarSign,
        label: "Ads",
        href: '/ads'
    },
    {
        icon: Tv,
        label: "Channels",
        href: '/channels'
    },
    {
        icon: Import,
        label: "Import",
        href: '/import'
    },
    {
        icon: Settings,
        label: "Settings",
        href: '/settings'
    },
];



const SidebarRoutes = () => {
    const routes = mainRoutes;
    return (
        <div className='flex flex-col gap-8 py-0 px-8'>
            {routes.map((route, index) => (
                <SidebarItems
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}

export default SidebarRoutes