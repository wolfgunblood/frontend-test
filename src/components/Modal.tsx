import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Button } from './ui/button';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import useModalStore from 'store/useStore';
import { Plus } from 'lucide-react';

import { options } from "../../constants/data"


const Modal: React.FC = () => {
    const { step, nextStep, previousStep, reset } = useModalStore();
    const setOptions = useModalStore(state => state.setOptions);

    const headerOptions = [
        { title: 'Create Ad Marker', description: 'Insert a new ad maker to the episodes' },
        { title: 'A/B test', description: `Select which ads you'd like to A/B test` },
        { title: 'A/B test results', description: '2 ads selected' }
    ];
    useEffect(() => {
        setOptions(options);
    }, [setOptions]);

    const currentOption = headerOptions[step - 1] ?? headerOptions[0];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full text-sm font-semibold font-manrope inline-flex gap-2 items-center' variant="default" aria-label="Create Ad">
                    Create Ad Marker
                    {" "}
                    <Plus size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-base text-zinc-800 font-bold font-manrope'>{currentOption?.title}</DialogTitle>
                    <DialogDescription className='text-sm text-muted-foreground font-semibold font-manrope'>{currentOption?.description}</DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {step === 1 && <StepOne />}
                    {step === 2 && <StepTwo />}
                    {step === 3 && <StepThree />}
                </div>
                <div className="flex justify-end space-x-2 p-2">
                    {step > 1 && <Button variant="default" onClick={previousStep}>Back</Button>}
                    {step < 3 ? (
                        <Button variant="default" onClick={nextStep}>Next</Button>
                    ) : (
                        <Button variant="default" onClick={reset}>Submit</Button>
                    )}
                    <Button variant="outline" onClick={reset}>Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;