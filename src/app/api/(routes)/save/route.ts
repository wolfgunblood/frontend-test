import { NextResponse } from "next/server";
import { adSchema } from "~/lib/schema";
import { type Marker } from "~/lib/types";
import { db } from "~/server/db";

export async function PUT(req: Request) {
  try {
    const receivedMarkers = (await req.json()) as Marker[];
    // console.log("Received Markers:", receivedMarkers);

    // Fetch existing markers from the database
    const existingMarkers = await db.ads.findMany();
    // console.log("Existing Data:", existingMarkers);

    const existingMap = new Map(
      existingMarkers.map((marker) => [marker.id, marker]),
    );

    const updates = [] as Marker[];
    const adds = [] as Marker[];
    const deletes = existingMarkers.slice();

    for (const marker of receivedMarkers) {
      if (existingMap.has(marker.id)) {
        updates.push(marker);
        deletes.splice(
          deletes.findIndex((m) => m.id === marker.id),
          1,
        );
      } else {
        adds.push(marker);
      }
    }
    // console.log("Updates", updates);
    // console.log("Adds", adds);
    // console.log("Deletes", deletes);

    await db.$transaction(async (prisma) => {
      await prisma.ads.createMany({ data: adds });
      for (const update of updates) {
        await prisma.ads.update({
          where: { id: update.id },
          data: update,
        });
      }

      for (const del of deletes) {
        await prisma.ads.delete({
          where: { id: del.id },
        });
      }
    });

    return new NextResponse(
      JSON.stringify({ save: "Changes saved successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("SAVE ROUTE ERROR", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
