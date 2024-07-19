import "~/styles/globals.css";

import { Manrope } from 'next/font/google';

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/toaster";

const manrope = Manrope({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: "Vidpod",
  description: "Editor for podcaster",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("bg-zinc-50", manrope.className)}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
