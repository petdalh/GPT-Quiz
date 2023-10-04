import React from 'react';
import Latex from 'react-latex';
import { Spinner } from 'flowbite-react';

interface FeedbackDisplayProps {
    feedback: string | null;
    isLoading: boolean;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isLoading }) => {
    return (
        <div className=' justify-center py-20 rounded-lg yourClass'>
            {feedback && <Latex>{feedback}</Latex>}
            {isLoading && <Spinner aria-label="Default status example" />}
        </div>
    );
}

export default FeedbackDisplay;
