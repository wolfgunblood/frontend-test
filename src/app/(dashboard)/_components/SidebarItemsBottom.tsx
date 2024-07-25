"use client";

import React from "react";
import { cn } from "~/lib/utils";
import { Switch } from "~/components/ui/switch";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  flag: boolean;
}

const SidebarItemsBottom = ({ icon: Icon, label, flag }: SidebarItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className={cn(
          "font-manrope text-base font-bold text-zinc-500 transition-all hover:bg-zinc-300/20 hover:text-zinc-600",
          "flex items-center gap-3",
        )}
        aria-label={label}
      >
        {/* <Image src={icon} alt={label} width={20} height={20} /> */}
        <Icon size={20} stroke="#71717A" strokeWidth={1} />
        <span>{label}</span>
      </button>
      {flag && <Switch aria-label="demo/pro switch" />}
    </div>
  );
};

export default SidebarItemsBottom;
