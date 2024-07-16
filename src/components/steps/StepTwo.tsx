import React from 'react';
import Image from 'next/image';
import useModalStore from 'store/useStore';
import { Input } from '../ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Search } from 'lucide-react';


const StepTwo: React.FC = () => {
    const { selections, toggleSelection, options, searchTerm, setSearchTerm } = useModalStore();

    // Filter options based on the search term
    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Each library item now has its own list, potentially fetched or defined elsewhere
    const libraryItems = {
        'All': ['Product Launch', 'Customer Testimonials'],
        'Eigth Sleep': ['Pod 3', 'Q3 Promo', 'Athlete Campaign'],
        'Brilliant': ['Summer Sale', 'New Features'],
        'Milligram': ['Design Award', 'New Arrivals']
    };

    return (
        <div className='flex gap-6'>
            <div>
                <div className="relative">
                    <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '24px', cursor: 'pointer' }}>
                        <Search />

                    </div>
                    <Input
                        type="text"
                        placeholder="Search library ..."
                        className="flex-1 pl-10 pr-2"
                    />
                </div>
                <div>
                    {Object.entries(libraryItems).map(([item, list], index) => (
                        <Accordion type="single" collapsible key={index}>
                            <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger>{item}</AccordionTrigger>
                                <AccordionContent>
                                    <ul>
                                        {list.map((entry, index) => (
                                            <li key={index}>{entry}</li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </div>

            <div className='flex flex-col'>
                <div className="relative mb-4">
                    <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '24px', cursor: 'pointer' }}>
                        <Search />
                    </div>
                    <input
                        type="text"
                        placeholder="Search ads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm p-2 border rounded w-full pl-10 pr-2"
                    />
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {filteredOptions.map(option => (
                        <div key={option.id} className="flex items-center mb-4 border p-4 rounded-lg">
                            <div className="flex-1 flex items-center">
                                <Image
                                    src={option.picture}
                                    alt={option.name}
                                    width={50}
                                    height={50}
                                />
                                <div className='ml-4'>
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
                                                className="rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div>{option.badge.category} - {option.badge.subCategory}</div>
                                </div>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selections.stepTwo.some(selectedOption => selectedOption.id === option.id)}
                                        onChange={() => toggleSelection(option)}
                                        className="ml-4"
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
