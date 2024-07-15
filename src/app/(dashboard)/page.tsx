import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Sidebar from "./_components/Sidebar";
import Hero from "~/components/Hero";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Navbar />
      <main className="flex">
        <Sidebar />
       <Hero />
      </main>
      {/* <Footer /> */}
    </HydrateClient>
  );
}
