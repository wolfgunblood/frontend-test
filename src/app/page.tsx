import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
       <Navbar />
       <Footer />
      </main>
    </HydrateClient>
  );
}
