import Image from 'next/image';
import React from 'react';
import useModalStore from 'store/useStore';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';

const StepThree: React.FC = () => {
    const { selections } = useModalStore();

    return (
        <div>
            <ul className='flex flex-col gap-4'>
                {selections.stepTwo.map((option, index) => (
                    <li key={option.id} className={`flex items-center gap-4 border p-4 rounded-lg  ${index === 0 ? 'ring-2 ring-green-200' : ''}`}>
                        <div className="flex-1 flex gap-4 items-center">
                            <Image
                                src={option.picture}
                                alt={option.name}
                                width="138"
                                height="105"
                            />
                            <div className='flex flex-col gap-2 items-start'>
                                <span className='text-base text-zinc-800 font-bold font-manrope'>{option.name}</span>
                                <div className='flex gap-5'>
                                    <span className='text-sm text-muted-foreground font-semibold font-manrope' >{option.createdOn}</span>

                                </div>
                                <div className='flex items-center gap-2'>
                                    <Badge variant="outline" >
                                        <span className='text-xs text-zinc-800 font-semibold font-manrope'>
                                            {option.badge.category}
                                        </span>
                                    </Badge>
                                    <ArrowRight size={10} />
                                    <Badge variant="outline" >
                                        <span className='text-xs text-zinc-800 font-semibold font-manrope'>
                                            {option.badge.subCategory}
                                        </span>
                                    </Badge>

                                </div>

                            </div>
                        </div>
                        <div>
                            <Badge variant="outline" >
                                <span className={`text-xs font-semibold font-manrope ${index === 0 ? 'bg-green-200' : 'text-zinc-800'}`}>
                                    #{index + 1}
                                </span>
                            </Badge>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StepThree;
