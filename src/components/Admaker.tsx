import React from "react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Trash2, Wand } from "lucide-react";
import Modal from "./Modal";
import Image from "next/image";
import { useAdStore, useVideoStore } from "store/useStore";
import { EditForm } from "./Editform";
import { convertSecondsToHHMMSS } from "~/helpers/timeformat";
import { formatMarkerType } from "~/helpers/type-marker";
import { db } from "~/server/db";

const badgeStyles: Record<string, { backgroundColor: string; color: string }> =
  {
    auto: { backgroundColor: "#BBF7D0", color: "#166534" },
    static: { backgroundColor: "#BFDBFE", color: "#1E40AF" },
    ab: { backgroundColor: "#FED7AA", color: "#9A3412" },
  };

const Admaker = () => {
  // const items = [
  //     { id: 1, type: 'auto', timestamp: '00:00:00' },
  //     { id: 2, type: 'static', timestamp: '00:05:00' },
  //     { id: 3, type: 'AB', timestamp: '00:10:00' },
  // ];

  const { markers, deleteMarker } = useAdStore();

  return (
    <div className="flex h-[552px] flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="font-manrope text-base font-bold text-zinc-800">
            Admakers
          </h2>
          <p className="font-manrope text-base font-semibold text-zinc-500">
            3 markers
          </p>
        </div>

        <div className="max-h-72 overflow-y-auto pr-4">
          <ol className="flex flex-col gap-4">
            {markers.map((marker, index) => (
              <li
                key={index}
                className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4"
              >
                <span className="font-manrope text-base font-semibold text-zinc-500">
                  {index + 1}
                </span>
                <div className="flex flex-grow items-center justify-between gap-4 rounded-lg border border-zinc-200 px-4 py-3 shadow-sm">
                  <span className="font-manrope text-base font-semibold text-zinc-800">
                    {convertSecondsToHHMMSS(marker.timestamp)}
                  </span>
                  <Badge
                    style={{
                      backgroundColor:
                        badgeStyles[marker.type.toLowerCase()]?.backgroundColor,
                      color: badgeStyles[marker.type.toLowerCase()]?.color,
                    }}
                  >
                    <span className="font-manrope text-xs font-semibold">
                      {formatMarkerType(marker.type)}
                    </span>
                  </Badge>
                  <EditForm index={index} />
                  <Button
                    variant="trash"
                    size="sm"
                    className="flex items-center justify-center"
                    onClick={() => deleteMarker(index)}
                    aria-label="Trash"
                  >
                    <Trash2 size={16} color="#7F1D1D" />
                  </Button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="flex w-full min-w-96 flex-col gap-4">
        <Modal />
        <Button
          className="inline-flex items-center gap-2 font-manrope text-sm font-semibold"
          variant="outline"
          aria-label="Automatically Place Ads"
        >
          Automatically Place <Wand size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Admaker;
