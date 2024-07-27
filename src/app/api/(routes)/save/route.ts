import { NextResponse } from "next/server";
import { adSchema } from "~/lib/schema";
import { type Marker } from "~/lib/types";
import { db } from "~/server/db";

export async function PUT(req: Request) {
  try {
    const markers = (await req.json()) as Marker[];
    // console.log(ads);
    console.log("Markers");
    console.log(markers);
    console.log(markers.length);

    const data = await db.ads.findMany();
    console.log("Data");
    console.log(data);
    console.log(data.length);

    return new NextResponse(JSON.stringify({ save: "save changes" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[ADS]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
