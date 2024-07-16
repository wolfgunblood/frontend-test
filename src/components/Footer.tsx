"use client";
import Link from "next/link";
import Image from "next/image";

// import { MobileNav } from "@/components/MobileNav";
import { cn } from "~/lib/utils";

const Footer = () => {

  return (
    <footer
    className="px-16 py-9 border-b border-zinc-200"

    >
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="flex h-14 items-center justify-between">
          <span className="text-base text-secondary-foreground font-normal">
            Video first podcasts
          </span>
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
    </footer>
  );
};

export default Footer;
