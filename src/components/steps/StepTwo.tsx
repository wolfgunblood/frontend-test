import React from 'react';
import Image from 'next/image';
import useModalStore from 'store/useStore';
import { Input } from '../ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';


const StepTwo: React.FC = () => {
    const { selections, toggleSelection, options, searchTerm, setSearchTerm } = useModalStore();

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const libraryItems = {
        'All folders': ['Product Launch', 'Customer Testimonials'],
        'Eigth Sleep': ['Pod 3', 'Q3 Promo', 'Athlete Campaign'],
        'Brilliant': ['Summer Sale', 'New Features'],
        'Milligram': ['Design Award', 'New Arrivals']
    };

    return (
        <div className='flex gap-6'>

            <div className='p-4 flex flex-col gap-6 bg-zinc-100 shadow-sm'>
                <div className="relative">
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50">
                        <Image
                            src="/search.svg"
                            alt="Search"
                            width={16}
                            height={16}
                            quality={100}

                        />
                    </div>
                    <Input
                        type="text"
                        placeholder="Search library ..."
                        className="flex-1 pl-10 pr-2"
                    />
                </div>
                <div className='inline-flex gap-3'>
                    <Image
                        src="/library.svg"
                        alt="All"
                        width={24}
                        height={24}
                        quality={100}

                    />
                    <h3 className='text-base text-zinc-800 font-bold font-manrope'>
                        All
                    </h3>
                </div>
                <div className='flex flex-col gap-4'>
                    {Object.entries(libraryItems).map(([item, list], index) => (
                        <Accordion type="single" collapsible key={index}>
                            <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger>
                                    <h4 className='text-sm text-zinc-800 font-bold'>
                                        {item}
                                    </h4>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className='px-4 border-l border-zinc-300 flex flex-col gap-4'>
                                        {list.map((entry, index) => (
                                            <li key={index} className='text-sm text-zinc-800 font-bold'>{entry}</li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </div>

            <div className='w-[653px] flex flex-col gap-6 items-end'>
                <div className='flex gap-6'>
                    <Button variant="outline" className='inline-flex gap-2'>
                        <Image
                            src="/caret-sort.svg"
                            alt="logo"
                            width={16}
                            height={16}
                            quality={100}
                        />
                        <span className='text-sm text-muted-foreground font-semibold font-manrope'>
                            Upload
                        </span>
                    </Button>

                    <div className="relative">
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50">
                            <Image
                                src="/search.svg"
                                alt="Search"
                                width={16}
                                height={16}
                                quality={100}

                            />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search ads..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm p-2 border rounded w-full pl-10 pr-2"
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-full max-h-96 overflow-y-auto flex flex-col gap-4 px-2">
                    {filteredOptions.map(option => (
                        <div key={option.id} className="flex items-center gap-4 border p-4 rounded-lg">
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
                                        <div className='flex  items-center gap-2'>
                                            <Image
                                                src={option.createdBy.picture}
                                                alt={option.createdBy.name}
                                                width={10}
                                                height={10}
                                                className="rounded-full object-cover w-5 h-5"
                                            />
                                            <span className='text-sm text-zinc-800 font-semibold font-manrope'>{option.createdBy.name}</span>
                                        </div>
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
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selections.stepTwo.some(selectedOption => selectedOption.id === option.id)}
                                        onChange={() => toggleSelection(option)}
                                        className=""
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
