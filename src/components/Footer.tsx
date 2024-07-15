"use client"
import Link from "next/link";
import Image from "next/image";


// import { MobileNav } from "@/components/MobileNav";
import { cn } from "~/lib/utils";

const Footer = () => {
  // Replace with your auth of choice, e.g. Clerk: const { userId } = auth();

  return (
    <nav
      className={cn(
        "sticky h-14 inset-x-0 top-0 z-30 border-b  bg-white/40 backdrop-blur-lg transition-all dark:bg-inherit"
      )}
    >
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="flex h-14 items-center justify-between border-b">
       
            <span className="text-base text-secondary-foreground font-normal">Video first podcasts </span>
          <div className="flex gap-1 sm:gap-4 items-center">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
