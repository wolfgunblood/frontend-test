import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
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

    const dialogContentClass = `flex flex-col p-8 gap-6 ${
        step === 1 ? 'w-[462px]' : 
        step === 2 ? ' max-w-4xl' : 
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
                <div>
                    <h3 className='text-base text-zinc-800 font-bold font-manrope'>{currentOption?.title}</h3>
                    <p className='text-sm text-muted-foreground font-semibold font-manrope'>{currentOption?.description}</p>
                </div>

                <div>
                    {step === 1 && <StepOne />}
                    {step === 2 && <StepTwo />}
                    {step === 3 && <StepThree />}
                </div>

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
                            <Button variant="default" onClick={nextStep}>Select A/B Test</Button>
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
