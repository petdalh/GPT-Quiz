import React from 'react';
import DropdownMenu from './DropdownMenu';

interface NavbarProps {
    setTopic: (topic: number) => void;
    setSubject: (topic: number) => void;
    setHint: (hint: boolean) => void;
    topic: number;
    subject: number;
    questions: any[][];  // Adjust this type as per your actual structure
}



const Navbar: React.FC<NavbarProps> = ({ questions, setTopic, setHint, topic, setSubject, subject }) => {
    const algorithmThemes = ["Alle temaer", "Sorteringsalgoritmer", "Maks flyt", "Eksamen S23"]; 
    const statThemes = ["Alle temaer", "Regeresjon", "Forventningsverdi"];
    const topicNames = [[...algorithmThemes], [...statThemes]];
    console.log(questions[0])
    console.log(questions[1])

    return (
        <div className="w-full bg-gray-900 p-4 rounded-lg mb-20">
            <ul className="flex flex-row justify-center" role="navigation" aria-label="Pagination">
                
                {questions[subject].map((_, index) => (
                    <li key={index}>
                        <button 
                            onClick={() => {
                                console.log(topic);
                                if (topic !== index) {
                                    setTopic(index);
                                    setHint(false);
                                }
                            }}
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            {topicNames[subject][index]}
                        </button>
                    </li>
                ))}
                <li>
                    <DropdownMenu setSubject={setSubject} />
                </li>
            </ul>
        </div>
    );
}

export default Navbar;