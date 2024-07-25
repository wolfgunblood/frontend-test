"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  timestamp: z.string().time(),
});

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Input } from "~/components/ui/input";
import { useAdStore, useVideoStore } from "store/useStore";
import { toast } from "./ui/use-toast";
import { useState } from "react";

export function EditForm({ index }: { index: number }) {
  const { duration } = useVideoStore();

  const { editMarker } = useAdStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timestamp: "",
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const [hours = 0, minutes = 0, seconds = 0] = values.timestamp
      .split(":")
      .map(Number);
    const newTime = hours * 3600 + minutes * 60 + seconds;
    // console.log(newTime)

    if (newTime > duration) {
      toast({
        title: "Time Error",
        description: "New Time more than duration",
      });

      return;
    }
    console.log(index);
    console.log(newTime);

    await editMarker(index, newTime).catch((error) => {
      console.error("Something went wrong");
    });

    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          aria-label="Edit"
        >
          <span className="font-manrope text-sm font-semibold text-secondary-foreground">
            Edit
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit time</DialogTitle>
          <DialogDescription>
            Make changes to your time here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="timestamp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder="00:00:00" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter time in format hh : mm : ss
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" aria-label="Submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
