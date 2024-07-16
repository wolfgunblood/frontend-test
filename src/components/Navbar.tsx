"use client"
import Link from "next/link";
import Image from "next/image";


// import { MobileNav } from "@/components/MobileNav";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { UserAccountNav } from "./useAccountNav";
import { Settings, Bell } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null)

  return (
    <nav
      className="px-16 py-6 border-b border-zinc-200"
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex justify-center items-center gap-4"
        >
          <Image
            src="/logo.svg"
            alt="logo"
            width={24}
            height={24}
            quality={100}

          />
          <span className="text-2xl text-zinc-800 font-bold font-manrope">Vidpod</span>
        </Link>
        <div className="flex gap-8 items-center">
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer transition-all ease-in-out"
            aria-label="Settings"
          >
            <Settings size={20} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer transition-all ease-in-out"
            aria-label="Notification"
          >
            <Bell size={20} />
          </Button>
          {!user && (
            <>

              {/* <Link
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                    href="/handler/signin"
                  >
                    Sign in
                  </Link> */}
              <Link
                className={buttonVariants({
                  size: "sm",
                })}
                href="/handler/signup"
              >
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <UserAccountNav />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
