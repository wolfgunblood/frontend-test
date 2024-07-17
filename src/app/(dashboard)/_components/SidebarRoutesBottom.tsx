"use client"

import React from 'react';
import SidebarItemsBottom from './SidebarItemsBottom';


const mainRoutes = [
    {
        icon:  '/play-circle.svg',
        label: 'Demo',
        flag: true,
    },
    {
        icon: '/mail-plus.svg',
        label: "Invite your team",
        flag: false,
    },
    {
        icon: '/lightbulb.svg',
        label: "Give feedback",
        flag: false,
    },
    {
        icon: '/help-circle.svg',
        label: "Help & support",
        flag: false,
    },

];



const SidebarRoutesBottom = () => {
    const routes = mainRoutes;
    return (
        <div className='flex flex-col gap-4 px-8 py-0'>
            {routes.map((route, index) => (
                <SidebarItemsBottom
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    flag={route.flag}
                />
            ))}
        </div>
    )
}

export default SidebarRoutesBottom