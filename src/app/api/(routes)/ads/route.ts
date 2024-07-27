import { NextResponse } from "next/server";
import { db } from "~/server/db";
import {
  adSchema,
  adSchemaDB,
  adSchemaUpdate,
  type ZodAdDB,
} from "~/lib/schema";
import { type Ad, type UpdateAd } from "~/lib/types";

export async function POST(req: Request) {
  try {
    const ads = (await req.json()) as Ad;

    // console.log(ads);
    const validatedAds = adSchema.parse(ads);

    const createdAd = await db.ads.create({
      data: validatedAds,
    });

    return new NextResponse(JSON.stringify(createdAd), {
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

export async function GET(req: Request) {
  try {
    const result = await db.ads.findMany();

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("[ADS] Fetching Error:", error);
    return new NextResponse(
      JSON.stringify({ messgae: "Something went wrong", error: error }),
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = (await req.json()) as UpdateAd;

    const { updatedTime, id } = adSchemaUpdate.parse(body);

    await db.ads.update({
      where: {
        id: id,
      },
      data: {
        timestamp: updatedTime,
      },
    });

    const markers = await db.ads.findMany();

    return new NextResponse(JSON.stringify(markers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("PATCH ROUTE ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const marker = (await req.json()) as ZodAdDB;

    const validatedMarker = adSchemaDB.parse(marker);

    await db.ads.delete({
      where: {
        id: validatedMarker.id,
      },
    });
    const markers = await db.ads.findMany();

    return new NextResponse(JSON.stringify(markers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("DELETE ROUTE ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
