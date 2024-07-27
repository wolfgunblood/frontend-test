import { NextResponse } from "next/server";
import { adSchema } from "~/lib/schema";
import { type Marker } from "~/lib/types";
import { db } from "~/server/db";

export async function PATCH(req: Request) {
  try {
    const markers = (await req.json()) as Marker[];
    // console.log(ads);

    console.log(markers);

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
