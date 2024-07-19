import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { Button } from './ui/button';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import useModalStore from 'store/useStore';
import { Plus } from 'lucide-react';

import { options } from "../../constants/data"
import Image from 'next/image';

const Modal: React.FC = () => {
    const { step, nextStep, reset, selections, selectionCount } = useModalStore();
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

    const dialogContentClass = `flex flex-col p-8 bg-white shadow-lg ${step === 1 ? 'gap-6  w-[462px]' :
        step === 2 ? 'gap-6  max-w-4xl' :
            step === 3 ? 'gap-6 w-[577px]' : ''
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
                    <h2 className='text-base text-zinc-800 font-bold font-manrope'>{currentOption?.title}</h2>
                    <p className='text-sm text-muted-foreground font-semibold font-manrope'>{currentOption?.description}</p>
                </div>

                <div>
                    {step === 1 && <StepOne />}
                    {step === 2 && <StepTwo />}
                    {step === 3 && <StepThree />}
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default Modal;
