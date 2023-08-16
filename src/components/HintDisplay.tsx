// HintDisplay.tsx

import React from 'react';
import Latex from 'react-latex';

interface HintDisplayProps {
    hint: boolean;
    clue: string;
}

const HintDisplay: React.FC<HintDisplayProps> = ({ hint, clue }) => {
    return (
        <div className="w-1/4 flex justify-center items-center">
            {hint && <Latex>{clue}</Latex>}
        </div>
    );
}

export default HintDisplay;
