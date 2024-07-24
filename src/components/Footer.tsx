"use client";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 px-16 py-9">
      <div className="flex items-center justify-between">
        <span className="font-manrope text-base font-semibold text-zinc-500">
          Video first podcasts
        </span>
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
      </div>
    </footer>
  );
};

export default Footer;
