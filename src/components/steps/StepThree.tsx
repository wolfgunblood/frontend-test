import React from 'react';
import useModalStore from 'store/useStore';

const StepThree: React.FC = () => {
    const { selections } = useModalStore();

    return (
        <div>
            <h4>Selected Options from Step Two:</h4>
            <ul>
                {selections.stepTwo.map(option => (
                    <li key={option}>{option}</li>
                ))}
            </ul>
        </div>
    );
};

export default StepThree;