// HintDisplay.tsx

import React from 'react';
import Latex from 'react-latex';

interface HintDisplayProps {
    hint: boolean;
    clue: string;
}

const HintDisplay: React.FC<HintDisplayProps> = ({ hint, clue }) => {
    return (
        <div className="w-full flex justify-center items-center">
            {hint && <Latex>{clue}</Latex>}
        </div>
    );
}

export default HintDisplay;
