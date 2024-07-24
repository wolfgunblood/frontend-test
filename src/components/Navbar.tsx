"use client";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [user, setUser] = useState(null);

  return (
    <nav className="w-full border-b border-zinc-200 px-16 py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-4">
          <Image
            src="/logo.svg"
            alt="logo"
            width={24}
            height={24}
            quality={100}
          />
          <span className="font-manrope text-2xl font-bold text-zinc-800">
            Vidpod
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer transition-all ease-in-out"
            aria-label="Settings"
          >
            <Image
              src="/settings.svg"
              alt="setting"
              width={20}
              height={20}
              quality={100}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer transition-all ease-in-out"
            aria-label="Notification"
          >
            <Image
              src="/bell-dot.svg"
              alt="Notification"
              width={20}
              height={20}
              quality={100}
            />
          </Button>
          <button
            className="flex items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm"
            aria-label="User Button"
          >
            <Image
              src="https://s3-alpha-sig.figma.com/img/d10f/5275/68fe79886fa0385f81459fd752af3d44?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RtfLvIVvYUrdpyzKMy8gcwK8XlPXxmwwTtU6SF1ozB-b6PZvY59y0TBo4EDd~Fw4tClZxvqn0ubJE4HVjaYUdYvMXbDEO6GKOfhJKrTQ2Q558A2s5VReKF9P9c9CEuG9Q1flXS7tFtsYUqgqmLQ5QED7cureUHWg4WHpsBpjc8EbG09TXupXyd3NdxGl2YMqlfj~hRJ-rbWjLwyKMSOVMOzGh29~boAdE7vIQdhRzi9wfVCIUvj2JD3nFFiMP6hc5Ds3Zgd~vZwlB~mN6GzFTBZFzVWAKrFmDOtfeNXuWTWuKnQh73VQbMqsmCktW974nH~ikjka8h03YJh2RSgYFw__"
              alt="Emma Warren"
              width={32}
              height={21}
              className="h-8 w-8 rounded-full"
              // layout={'fill'}
              objectFit={"contain"}
            />
            <span className="font-manrope text-base font-bold text-zinc-800">
              Emma Warren
            </span>
            <Image
              src="/chevron-down.svg"
              alt="Chevron Down"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
