import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Button } from './ui/button';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import useModalStore from 'store/useStore';

import { options } from "../../constants/data"


const Modal: React.FC = () => {
    const { step, nextStep, previousStep, reset } = useModalStore();
    const setOptions = useModalStore(state => state.setOptions);
    useEffect(() => {
        setOptions(options);
    }, [setOptions]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full' variant="default" aria-label="Create Ad">Create Ad Marker</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Ad Maker</DialogTitle>
                    <DialogDescription>
                        Insert a new ad maker to the episodes
                    </DialogDescription>
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