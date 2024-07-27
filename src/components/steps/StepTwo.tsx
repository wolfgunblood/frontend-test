import React from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import useModalStore from "~/store/useStore";

const StepTwo: React.FC = () => {
  const {
    step,
    nextStep,
    reset,
    selections,
    toggleSelection,
    options,
    searchTerm,
    setSearchTerm,
    selectionCount,
  } = useModalStore();

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const libraryItems = {
    "All folders": ["Product Launch", "Customer Testimonials"],
    "Eigth Sleep": ["Pod 3", "Q3 Promo", "Athlete Campaign"],
    Brilliant: ["Summer Sale", "New Features"],
    Milligram: ["Design Award", "New Arrivals"],
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-1 w-full bg-zinc-200">
        <Image
          src="/Line.svg"
          alt="line"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col gap-6 bg-zinc-100 p-4 shadow-sm">
          <div className="relative">
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50">
              <Image
                src="/search.svg"
                alt="Search"
                width={16}
                height={16}
                quality={100}
              />
            </div>
            <Input
              type="text"
              placeholder="Search library ..."
              className="flex-1 pl-10 pr-2"
            />
          </div>
          <div className="inline-flex gap-3">
            <Image
              src="/library.svg"
              alt="All"
              width={24}
              height={24}
              quality={100}
            />
            <h3 className="font-manrope text-base font-bold text-zinc-800">
              All
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {Object.entries(libraryItems).map(([item, list], index) => (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>
                    <h4 className="text-sm font-bold text-zinc-800">{item}</h4>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-4 border-l border-zinc-300 px-4">
                      {list.map((entry, index) => (
                        <li
                          key={index}
                          className="text-sm font-bold text-zinc-800"
                        >
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>

        <div className="flex w-[653px] flex-col items-end gap-6">
          <div className="flex gap-6">
            <Button
              variant="outline"
              className="inline-flex gap-2"
              aria-label="Upload"
            >
              <Image
                src="/caret-sort.svg"
                alt="logo"
                width={16}
                height={16}
                quality={100}
              />
              <span className="font-manrope text-sm font-semibold text-muted-foreground">
                Upload
              </span>
            </Button>

            <div className="relative">
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50">
                <Image
                  src="/search.svg"
                  alt="Search"
                  width={16}
                  height={16}
                  quality={100}
                />
              </div>
              <Input
                type="text"
                placeholder="Search ads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-sm rounded border p-2 pl-10 pr-2"
              />
            </div>
          </div>
          <div className="flex max-h-96 min-w-full flex-1 flex-col gap-4 overflow-y-auto px-2">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center gap-4 rounded-lg border p-4"
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
                      <div className="flex items-center gap-2">
                        <Image
                          src={option.createdBy.picture}
                          alt={option.createdBy.name}
                          width={10}
                          height={10}
                          className="h-5 w-5 rounded-full object-cover"
                        />
                        <span className="font-manrope text-sm font-semibold text-zinc-800">
                          {option.createdBy.name}
                        </span>
                      </div>
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
                  <label>
                    <input
                      type="checkbox"
                      checked={selections.stepTwo.some(
                        (selectedOption) => selectedOption.id === option.id,
                      )}
                      onChange={() => toggleSelection(option)}
                      className=""
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-1 w-full bg-zinc-200">
        <Image
          src="/Line.svg"
          alt="line"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          className="font-manrope text-sm font-semibold text-secondary-foreground"
          onClick={reset}
          aria-label="Cancel"
        >
          Cancel
        </Button>
        <div className="inline-flex items-center gap-2">
          <span className="font-manrope text-sm font-semibold text-zinc-800">
            {selectionCount} ads selected
          </span>
          <Button
            variant="default"
            onClick={nextStep}
            className="font-manrope text-sm font-semibold"
            aria-label="Select A/B Test"
          >
            Select A/B Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
