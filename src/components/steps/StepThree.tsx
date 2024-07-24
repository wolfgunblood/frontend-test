import Image from "next/image";
import React from "react";
import useModalStore from "store/useStore";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const StepThree: React.FC = () => {
  const { reset, selections } = useModalStore();
  // const submitAds = async () => {
  //     try {

  //         const response = await fetch('/api/ads', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify({ type: "AUTO", value: "10:08:00" })
  //         });
  //         if (!response.ok) throw new Error('Network response was not ok');

  //         // console.log(selections)
  //         console.log("Ads successfully added");
  //     } catch (error) {
  //         console.error("Failed to add ads:", error);
  //     }
  // };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <ul className="flex flex-col gap-4">
          {selections.stepTwo.map((option, index) => (
            <li
              key={option.id}
              className={`flex items-center gap-4 rounded-lg border p-4 ${index === 0 ? "ring-2 ring-green-200" : ""}`}
            >
              <div className="flex flex-1 items-center gap-4">
                <Image
                  src={option.picture}
                  alt={option.name}
                  width="138"
                  height="105"
                />
                <div className="flex flex-col items-start gap-2">
                  <span className="font-manrope text-base font-bold text-zinc-800">
                    {option.name}
                  </span>
                  <div className="flex gap-5">
                    <span className="font-manrope text-sm font-semibold text-muted-foreground">
                      {option.createdOn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <span className="font-manrope text-xs font-semibold text-zinc-800">
                        {option.badge.category}
                      </span>
                    </Badge>
                    <ArrowRight size={10} />
                    <Badge variant="outline">
                      <span className="font-manrope text-xs font-semibold text-zinc-800">
                        {option.badge.subCategory}
                      </span>
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Badge
                  variant="outline"
                  className={`${index === 0 ? "bg-green-200" : ""}`}
                >
                  <span
                    className={`font-manrope text-xs font-semibold ${index === 0 ? "text-green-800" : "text-zinc-800"}`}
                  >
                    #{index + 1}
                  </span>
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          className="font-manrope text-sm font-semibold text-secondary-foreground"
          onClick={() => {
            reset();
          }}
          aria-label="New Test"
        >
          New Test
        </Button>
        <Button
          variant="default"
          className="font-manrope text-sm font-semibold text-primary-foreground"
          aria-label="Done"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
