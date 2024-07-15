"use client"
import Link from "next/link";
import Image from "next/image";


// import { MobileNav } from "@/components/MobileNav";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { UserAccountNav } from "./useAccountNav";
import { Settings,Bell } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null)
  
  return (
    <nav
      className={cn(
        "sticky h-14 inset-x-0 top-0 z-30 border-b  bg-white/40 backdrop-blur-lg transition-all dark:bg-inherit"
      )}
    >
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="flex h-14 items-center justify-between border-b">
          <Link
            href="/"
            className="flex z-40 justify-center items-center gap-1"
          >
            <Image
              src="/logo.svg"
              alt="logo"
              width={40}
              height={40}
              quality={100}
              className="w-7 h-7"
            />
            <span className="text-2xl font-semibold">Vidpod</span>
          </Link>
          <div className="flex gap-1 sm:gap-4 items-center">
          <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer transition-all ease-in-out"
              aria-label="Settings"
            >
              <Settings size={16} />
            </Button>
          <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer transition-all ease-in-out"
              aria-label="Settings"
            >
              <Bell size={16} />
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
              ) }
               {user && (
              <UserAccountNav />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
