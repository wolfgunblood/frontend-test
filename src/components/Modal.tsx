"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";

import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Button } from "./ui/button";

import Image from "next/image";

const Modal = () => {

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="default" aria-label="Create Ad">Create Ad Marker</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Ad maker </DialogTitle>
                    <DialogDescription>
                        Insert a new ad maker to the episodes
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <RadioGroup defaultValue="option-one">
                        <div className="p-4">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src="/circle-dashed.svg"
                                    alt="logo"
                                    width={40}
                                    height={40}
                                    quality={100}
                                    className="w-7 h-7"
                                />
                                <div>
                                    <h4>Option One</h4>
                                    <p>Details about option one</p>
                                </div>
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">Select</Label>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src="/locate-fixed.svg"
                                    alt="logo"
                                    width={40}
                                    height={40}
                                    quality={100}
                                    className="w-7 h-7"
                                />
                                <div>
                                    <h4>Option Two</h4>
                                    <p>Details about option two</p>
                                </div>
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">Select</Label>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src="/test-tubes.svg"
                                    alt="logo"
                                    width={40}
                                    height={40}
                                    quality={100}
                                    className="w-7 h-7"
                                />
                                <div>
                                    <h4>Option Three</h4>
                                    <p>Details about option three</p>
                                </div>
                                <RadioGroupItem value="option-three" id="option-three" />
                                <Label htmlFor="option-three">Select</Label>
                            </div>
                        </div>
                    </RadioGroup>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
