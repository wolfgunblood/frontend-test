"use client"

import React from 'react';
import { BarChart3, Compass, Layout, CircleDollarSign, Tv, Import, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SidebarItems from './SidebarItems';

// type Props = {}

const mainRoutes = [
    {
        icon: Layout,
        label: 'Dashboard',
        href: '/'
    },
    {
        icon: BarChart3,
        label: "Analytics",
        href: '/analytics'
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
    const pathname = usePathname();
    const routes = mainRoutes;
    return (
        <div className='flex flex-col w-full'>
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