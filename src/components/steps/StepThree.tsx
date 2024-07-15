import Image from 'next/image';
import React from 'react';
import useModalStore from 'store/useStore';

const StepThree: React.FC = () => {
    const { selections } = useModalStore();

    return (
        <div>
            <ul>
                {selections.stepTwo.map(option => (
                    <li key={option.id} className="mb-2 border p-2 rounded-lg">
                        <div className="flex items-center">
                            <Image
                                src={option.picture}
                                alt={option.name}
                                width={50}
                                height={50}
                                className=""
                            />
                            <div>
                                <div className="font-bold">{option.name}</div>
                                <div className='flex gap-5'>

                                    <div>{option.createdOn}</div>
                                    <div className='flex gap-2'>

                                        <div>{option.createdBy.name}</div>
                                        <Image
                                            src={option.createdBy.picture}
                                            alt={option.createdBy.name}
                                            width={20}
                                            height={20}
                                            className="rounded-full mr-4"
                                        />
                                    </div>
                                </div>
                                <div>{option.badge.category} - {option.badge.subCategory}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StepThree;
