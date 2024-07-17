import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

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

      <body  className="bg-zinc-50">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
