"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItems = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-4 p-2 font-manrope text-2xl font-bold text-zinc-500 transition-all hover:bg-zinc-300/20 hover:text-zinc-600",
        isActive && "text-zinc-800 hover:text-zinc-800/90",
      )}
      aria-label={label}
    >
      {/* <Image src={icon} alt={label} width={20} height={20} /> */}
      <Icon
        size={20}
        strokeWidth={1}
        stroke={`${isActive ? "#27272A" : "#71717A"}`}
      />
      <span>{label}</span>
    </button>
  );
};

export default SidebarItems;
