import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Navbar from "./components/Navbar";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import AnswerBox from "./components/AnswerBox";
import FeedbackDisplay from "./components/FeedbackDisplay";
import HintButton from "./components/HintButton";
import Footer from "./components/Footer";
import HintDisplay from "./components/HintDisplay";
import { questions } from "./questions";



console.log("this is the api key: " + import.meta.env.VITE_API_KEY);

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

  const goToNextQuestion = () => {
    console.log(topic);
    setFeedback("");
    setHint(false);
    let prevNumber = currentQuestionIndex;
    let randomNum = prevNumber;
    while (randomNum === prevNumber) {
        
      randomNum = Math.floor(Math.random() * questions[subject][topic].length);
      
    }
    console.log("this is the random number: " + randomNum);
    setCurrentQuestionIndex(randomNum);
  };

  const handleSubmit = async () => {
    const prompt =
      "Er dette svaret: " +
      userAnswer +
      ", ett korrekt svar på dette spørsmålet: " +
      questions[subject][topic][currentQuestionIndex].questionText +
      "? Svar kort og presist med 2-3 setninger";
    console.log("this is the prompt: " + prompt);

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

    const setHint = () => {
      setHint(true);
    };
  };

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-10">
      {/* Navbar */}
      <Navbar
        setTopic={setTopic}
        setHint={setHint}
        topic={topic}
        setSubject={setSubject}
        questions={questions}
        subject={subject}
      />
      </div>
      <div className="fixed mt-40 left-10 right-10 z-10">
          <div className="flex w-full">
          
          <div className="h-80 w-full overflow-y-auto overflow-x-hidden flex">
            <div className="w-full min-w-0 overflow-y-auto ">
                <Question
                  questionText={
                    questions[subject][topic][currentQuestionIndex].questionText
                  }
                />
              </div>
              <div className="flex h-2/4 justify-end">
                <NextButton onClick={goToNextQuestion} />
              </div>
            </div>
          </div>
          <div className="flex w-full">
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
        <FeedbackDisplay feedback={feedback} isLoading={isLoading} />
        {/* <div className=" flex justify-center items-center">
        <HintDisplay hint={hint} clue={questions[subject][topic][currentQuestionIndex].clue} />
        </div>
            <div className="flex justify-center items-center">
              <HintButton onClick={setHint} />
            </div> */}

      
      
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-0">
        <Footer />
      </div>
    </>
  );
}

export default App;
