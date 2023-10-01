import React from 'react';
import Latex from 'react-latex';

interface QuestionProps {
    questionText: string;
}

const Question: React.FC<QuestionProps> = ({ questionText }) => {
    const length = questionText.length;

    let fontSizeClass = "text-xl"; 
    if (length > 350) {
        fontSizeClass = "text-l"; 
    } else if (length > 550) {
        fontSizeClass = "text-m"; 
    }
    return (
      <>
        {questionText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            <h2 className={fontSizeClass}>
              <Latex>{line}</Latex>
            </h2>
            {line === "" && <br />}  
          </React.Fragment>
        ))}
      </>
    );
};

export default Question;
