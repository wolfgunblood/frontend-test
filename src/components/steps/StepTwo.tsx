import React from 'react';
import Image from 'next/image';
import useModalStore from 'store/useStore';

const StepTwo: React.FC = () => {
    const { selections, toggleSelection, options, searchTerm, setSearchTerm } = useModalStore();

    // Filter options based on the search term
    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by option name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm p-2 border rounded"
                />
            </div>
            <div className="max-h-96 overflow-y-auto">
                {filteredOptions.map(option => (
                    <div key={option.id} className="flex items-center mb-4 border p-4 rounded-lg">
                        <div className="flex-1 flex items-center">
                            <Image
                                src={option.createdBy.picture}
                                alt={option.createdBy.name}
                                width={50}
                                height={50}
                                className="rounded-full mr-4"
                            />
                            <div>
                                <div className="font-bold">{option.name}</div>
                                <div>{option.createdOn}</div>
                                <div>{option.createdBy.name}</div>
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
    );
};

export default StepTwo;
