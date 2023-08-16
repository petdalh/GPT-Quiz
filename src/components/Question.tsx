import React from 'react';
import Latex from 'react-latex';

interface QuestionProps {
    questionText: string;
}

const Question: React.FC<QuestionProps> = ({ questionText }) => {
return (
    <h2 className="text-xl">
    <Latex>{questionText}</Latex>
    </h2>
);
}

export default Question;
