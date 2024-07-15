import React from 'react';
import useModalStore from 'store/useStore';

const options: string[] = ["Option A", "Option B", "Option C"]; // Example options

const StepTwo: React.FC = () => {
    const { selections, toggleSelection } = useModalStore();

    return (
        <div>
            {options.map(option => (
                <label key={option}>
                    <input
                        type="checkbox"
                        checked={selections.stepTwo.includes(option)}
                        onChange={() => toggleSelection(option)}
                    /> {option}
                </label>
            ))}
        </div>
    );
};

export default StepTwo;