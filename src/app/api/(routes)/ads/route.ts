import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { adSchema } from "~/lib/schema";

interface Ad {
  id: number;
  type: "AUTO" | "STATIC" | "AB";
  timestamp: number;
}

export async function POST(req: Request) {
  try {
    const ads = (await req.json()) as Ad;

    console.log(ads);
    const validatedAds = adSchema.parse(ads);

    const result = await db.ads.create({
      data: validatedAds,
    });

    return new NextResponse(JSON.stringify({ result: result }), {
      status: 200,
    });
  } catch (error) {
    console.error("[ADS]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const result = await db.ads.findMany();

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("[ADS] Fetching Error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
