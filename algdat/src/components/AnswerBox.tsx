// AnswerBox.tsx

import React from 'react';

interface AnswerBoxProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({ value, onChange, onKeyDown }) => {
    return (
        <textarea 
            className="p-2.5 w-3/4 text-white bg-gray-800 leading-none rounded-lg border border-gray-700 focus:ring-gray-600 focus:border-gray-600 placeholder-gray-500 resize-none"
            id="message"
            rows={10}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Type your answer here"
        />
    );
}

export default AnswerBox;
