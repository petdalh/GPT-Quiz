// React imports
import { useState } from "react";

// Library imports
import { Configuration, OpenAIApi } from "openai";

// Component imports
import Navbar from "./components/Navbar";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import AnswerBox from "./components/AnswerBox";
import FeedbackDisplay from "./components/FeedbackDisplay";
import HintButton from "./components/HintButton";
import Footer from "./components/Footer";
import HintDisplay from "./components/HintDisplay";

// Data imports
import { questions } from "./questions";



const openai = new OpenAIApi(
  new Configuration({
    apiKey: import.meta.env.VITE_API_KEY,
  }),
);

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    Math.floor(Math.random() * 20),
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState(0);
  const [hint, setHint] = useState(false);
  const [subject, setSubject] = useState<number>(0);

  const resetQuestionIndex = () => setCurrentQuestionIndex(0);


  const goToNextQuestion = () => {
    setFeedback("");
    // setHint(false);
    let prevNumber = currentQuestionIndex;
    let randomNum = prevNumber;
    while (randomNum === prevNumber) {
        
      randomNum = Math.floor(Math.random() * questions[subject][topic].length);
      
    }
    setCurrentQuestionIndex(randomNum);
  };

  const handleSubmit = async () => {

    const prompt = `
    Fag: ${subject},
    Spørsmål: ${questions[subject][topic][currentQuestionIndex].questionText},
    Brukerens svar: ${userAnswer},
    
    Er svaret riktig? Hvis ja, hvorfor? Hvis nei, hva er det riktige svaret og hvorfor?
  `;

    setIsLoading(true); // Start loading

    try {
      openai
        .createChatCompletion({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
        })
        .then((res) => {
          if (
            res.data.choices[0].message &&
            typeof res.data.choices[0].message.content === "string"
          ) {
            console.log(res.data.choices[0].message.content);
            const gptResponse = res.data.choices[0].message.content;
            setIsLoading(false); // Stop loading
            setFeedback(gptResponse);
          }
        });
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
    setUserAnswer(""); // Clear the input after submitting

    // const setHint = () => {
    //   setHint(true);
    // };
  };

  return (
    <>
    <div className="fixed top-0 left-0 right-0">
      {/* Navbar */}
      <Navbar
        setTopic={setTopic}
        setHint={setHint}
        topic={topic}
        setSubject={setSubject}
        questions={questions}
        subject={subject}
        resetQuestionIndex={resetQuestionIndex} 
      />
      </div>
      <div className="fixed mt-40 left-10 right-10">
      <div className="flex flex-col w-full overflow-y-auto overflow-x-hidden">
      <div className="h-[120px] flex justify-center overflow-y-auto mb-[10px]"> {/* Fixed height and overflow-y set */}
        <Question
          questionText={
            questions[subject][topic][currentQuestionIndex].questionText
          }
        />
      </div>
        <div className="flex justify-end">
          <NextButton onClick={goToNextQuestion} />
        </div>
        <div className="flex mb-30">
          <AnswerBox
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
        <div className="flex"> {/* Wrapped FeedbackDisplay in a flex div */}
          <FeedbackDisplay feedback={feedback} isLoading={isLoading} />
        </div>
      </div>
        

        
        {/* <div className=" flex justify-center items-center">
        <HintDisplay hint={hint} clue={questions[subject][topic][currentQuestionIndex].clue} />
        </div>
            <div className="flex justify-center items-center">
              <HintButton onClick={setHint} />
            </div> */}

      
      
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-100">
        <Footer />
      </div>
    </>
  );
}

export default App;