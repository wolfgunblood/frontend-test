import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import Image from "next/image";
import { Button } from "../ui/button";
import useModalStore, { useAdStore, useVideoStore } from "~/store/useStore";
import { options } from "~/constants/options";

const StepOne = () => {
  const { step, nextStep, reset, selections, setSelection } = useModalStore();
  const [selectedOption, setSelectedOption] = useState(selections.stepOne);
  const { currentTime, duration } = useVideoStore();
  const { addMarker } = useAdStore();

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedOption(event.target.value);
    setSelection("stepOne", event.target.value);
  };

  const submitAds = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const selectedType = options.find(
        (option) => option.value === selectedOption,
      )?.type;
      if (
        selectedType === "AUTO" ||
        selectedType === "STATIC" ||
        selectedType === "AB"
      ) {
        console.log({ type: selectedType, timestamp: currentTime });

        await addMarker(currentTime, selectedType);

        console.log("Ads successfully added");
      }
    } catch (error) {
      console.error("Failed to add ads:", error);
    }
    nextStep();
  };

  return (
    <form onSubmit={submitAds} className="flex flex-col gap-6">
      <RadioGroup
        defaultValue={selections.stepOne}
        onChange={handleSelectionChange}
      >
        {options.map((option) => (
          <div key={option.value}>
            <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-4">
                <Image
                  src={option.src}
                  alt={option.alt}
                  width={40}
                  height={40}
                  quality={100}
                  className="h-7 w-7"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="font-manrope text-base font-bold text-zinc-800">
                    {option.title}
                  </h3>
                  <p className="font-manrope text-sm font-semibold text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
              <div>
                <RadioGroupItem value={option.value} id={option.value} />
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          className="font-manrope text-sm font-semibold text-secondary-foreground"
          onClick={reset}
          aria-label="Cancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          className="font-manrope text-sm font-semibold text-primary-foreground"
          aria-label="Select Marker"
        >
          Select Marker
        </Button>
      </div>
    </form>
  );
};

export default StepOne;
