import { ArrowUp } from "lucide-react";
import Image from "next/image";
import React from "react";

const Chart = () => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg">
      {/* Charts */}

      <div className="h-[201.74px] w-full max-w-[256px] rounded-2xl border border-zinc-200 bg-white p-4">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <h3 className="font-manrope text-base font-semibold text-zinc-800">
                Weekly Plays
              </h3>
              <p className="font-manrope text-2xl font-extrabold text-zinc-800">
                738,458
              </p>
            </div>
            <div className="inline-flex items-center gap-2">
              <ArrowUp size={16} color="#16A34A" />
              <span className="font-manrope text-base font-bold text-muted-foreground">
                17%
              </span>
            </div>
          </div>

          <Image
            src="/Graph.svg"
            alt="graph"
            width={224}
            height={90}
            className="object-fit"
          />
        </div>
      </div>

      {/* Three dots */}

      <div className="flex items-center gap-3">
        <Image
          src="/Rectangle.svg"
          alt="Rectangle"
          width={8}
          height={24}
          className="cursor-pointer rounded-lg"
        />
        <Image
          src="/Ellipse6.svg"
          alt="Ellipse"
          width={8}
          height={8}
          className="cursor-pointer"
        />
        <Image
          src="/Ellipse7.svg"
          alt="Ellipse"
          width={8}
          height={8}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Chart;
