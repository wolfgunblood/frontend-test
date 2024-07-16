"use client";
import Link from "next/link";
import Image from "next/image";


const Footer = () => {

  return (
    <footer className="px-16 py-9 border-t border-zinc-200">
      <div className="flex items-center justify-between">
        <span className="text-base text-zinc-500 font-semibold font-manrope">
          Video first podcasts
        </span>
        <div className="flex items-center">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
