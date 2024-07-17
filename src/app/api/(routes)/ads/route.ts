import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { adSchema } from "~/lib/schema";
import { error } from "console";

interface Ad {
  id: number;
  type: "AUTO" | "STATIC" | "AB";
  value: number;
  timestamp: Date;
  updatedAt: Date;
}

export async function POST(req: Request) {
  try {
    const ads= await req.json();
  
    // const { ads } = adSchema.parse(body)
    console.log(ads);

    // const validatedAds = ads.filter(ad => adSchema.safeParse(ad).success);

    const result = await db.ads.create({
      data: ads,
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
