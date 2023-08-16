import React from "react";

interface NextButtonProps {
    onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
return (
    <button 
    onClick={onClick} 
    className="float-right text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-5 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
    </button>
);
}

export default NextButton;

