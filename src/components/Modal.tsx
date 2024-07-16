import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Button } from './ui/button';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import useModalStore from 'store/useStore';
import { Plus } from 'lucide-react';

import { options } from "../../constants/data"
import Image from 'next/image';

const Modal: React.FC = () => {
    const { step, nextStep, previousStep, reset, selectionCount } = useModalStore();
    const setOptions = useModalStore(state => state.setOptions);

    const headerOptions = [
        { title: 'Create Ad Marker', description: 'Insert a new ad maker to the episodes' },
        { title: 'A/B test', description: `Select which ads you'd like to A/B test` },
        { title: 'A/B test results', description: `${selectionCount} ads selected` }
    ];
    useEffect(() => {
        setOptions(options);
    }, [setOptions]);

    const currentOption = headerOptions[step - 1] ?? headerOptions[0];

    const dialogContentClass = `flex flex-col p-8 gap-6 bg-white shadow-lg ${step === 1 ? ' w-[462px]' :
            step === 2 ? 'justify-between max-w-4xl h-[816px]' :
                step === 3 ? 'w-[577px]' : ''
        }`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full text-sm font-semibold font-manrope inline-flex gap-2 items-center' variant="default" aria-label="Create Ad">
                    Create Ad Marker
                    <Plus size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className={dialogContentClass}>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-base text-zinc-800 font-bold font-manrope'>{currentOption?.title}</h3>
                    <p className='text-sm text-muted-foreground font-semibold font-manrope'>{currentOption?.description}</p>
                </div>

                <>
                    {
                        step === 2 &&
                        <div className="relative w-full h-1 bg-zinc-200">
                            <Image
                                src="/Line.svg"
                                alt="line"
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                    }
                </>

                <div>
                    {step === 1 && <StepOne />}
                    {step === 2 && <StepTwo />}
                    {step === 3 && <StepThree />}
                </div>

                <>
                    {
                        step === 2 &&
                        <div className="relative w-full h-1 bg-zinc-200">
                            <Image
                                src="/Line.svg"
                                alt="line"
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                    }
                </>

                <div>
                    {step === 1 && (
                        <div className="flex justify-end gap-4">
                            <Button variant="outline" onClick={reset}>Cancel</Button>
                            <Button variant="default" onClick={nextStep}>Select Maker</Button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={reset}>Cancel</Button>
                            <div className='inline-flex gap-2'>
                                <p className='text-sm text-zinc-800 font-semibold font-manrope'>
                                    {selectionCount}{" "} ads selected
                                </p>
                                <Button variant="default" onClick={nextStep} className='text-sm font-semibold font-manrope'>Select A/B Test</Button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => { reset() }}>New Test</Button>
                            <Button variant="default" onClick={reset}>Done</Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
