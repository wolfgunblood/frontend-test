import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "~/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    {...props}
    ref={ref}
    className={cn(
      "peer inline-flex items-center rounded-full transition-colors",
      "cursor-pointer h-[20px] w-[36px] shrink-0",
      "border-2 border-transparent focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      className
    )}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block rounded-full bg-background shadow-lg",
        "ring-0 transition-transform h-[16px] w-[16px]", // Slightly smaller than the height of the Root to fit comfortably
        "data-[state=checked]:translate-x-[16px] data-[state=unchecked]:translate-x-0" // Adjust translation distance to fit new width
      )}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = "Switch";

export { Switch };
