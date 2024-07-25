"use client";

import React from "react";
import SidebarItemsBottom from "./SidebarItemsBottom";
import { HelpCircle, Lightbulb, MailPlus, PlayCircle } from "lucide-react";

const mainRoutes = [
  {
    icon: PlayCircle,
    label: "Demo",
    flag: true,
  },
  {
    icon: MailPlus,
    label: "Invite your team",
    flag: false,
  },
  {
    icon: Lightbulb,
    label: "Give feedback",
    flag: false,
  },
  {
    icon: HelpCircle,
    label: "Help & support",
    flag: false,
  },
];

const SidebarRoutesBottom = () => {
  const routes = mainRoutes;
  return (
    <div className="flex flex-col gap-4 px-8 py-0">
      {routes.map((route, index) => (
        <SidebarItemsBottom
          key={index}
          icon={route.icon}
          label={route.label}
          flag={route.flag}
        />
      ))}
    </div>
  );
};

export default SidebarRoutesBottom;
