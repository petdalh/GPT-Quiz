import React from 'react';
import Latex from 'react-latex';
import { Spinner } from 'flowbite-react';

interface FeedbackDisplayProps {
    feedback: string | null;
    isLoading: boolean;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isLoading }) => {
    return (
        <div className='flex justify-center bg-transparent relative rounded-lg w-full h-20'>
            {feedback && <Latex>{feedback}</Latex>}
            {isLoading && <Spinner aria-label="Default status example" />}
        </div>
    );
}

export default FeedbackDisplay;
