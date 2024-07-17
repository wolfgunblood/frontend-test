import React, { useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import Image from 'next/image';
import useModalStore from 'store/useStore';

const options = [
    {
        value: "option-one",
        src: "/circle-dashed.svg",
        alt: "Auto Logo",
        title: "Auto",
        description: "Automatic ad insertions",
        type: "AUTO",
    },
    {
        value: "option-two",
        src: "/locate-fixed.svg",
        alt: "Static Logo",
        title: "Static",
        description: "A marker for a specific ad that you select",
        type: "STATIC",
    },
    {
        value: "option-three",
        src: "/test-tubes.svg",
        alt: "A/B Test Logo",
        title: "A/B test",
        description: "Compare the performace of multiple ads",
        type: "AB",
    }
];

const StepOne: React.FC = () => {
    const { selections, setSelection} = useModalStore();
    // const setStepOneType = useModalStore(state => state.setStepOneType);


    const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        // setSelection('stepOne', event.target.value);
    };


    return (
        <RadioGroup defaultValue={selections.stepOne} onChange={handleSelectionChange}>
            {options.map(option => (
                <div key={option.value}>
                    <div className="py-3 px-4  rounded-lg border border-zinc-200 shadow-sm flex justify-between items-center gap-4">
                        <div className='flex items-center gap-4'>

                            <Image
                                src={option.src}
                                alt={option.alt}
                                width={40}
                                height={40}
                                quality={100}
                                className="w-7 h-7"
                            />
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-base text-zinc-800 font-bold font-manrope'>{option.title}</h3>
                                <p className='text-sm text-muted-foreground font-semibold font-manrope'>{option.description}</p>
                            </div>
                        </div>
                        <div>
                            <RadioGroupItem value={option.value} id={option.value} />

                            {/* <Label htmlFor={option.value}>Select</Label> */}
                        </div>
                    </div>
                </div>
            ))}
        </RadioGroup>
    );
};

export default StepOne;
