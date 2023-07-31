"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import ProgressCircle from './ProgressCircle';
import Image from 'next/image';
import Negative from "../../../public/k5_image_negative_feedback.svg";
import Positive from "../../../public/k5_image_positive_feedback.svg";
import Win from "../../../public/k5_image_win.svg";

interface Question {
  id: string;
  questionText: string;
  answerA: string;
  feedbackA: {
    title: string;
    text: string;
  };
  answerALeadsTo: string | null;
  answerB: string;
  feedbackB: {
    title: string;
    text: string;
  };
  answerBLeadsTo: string | null;
}

interface GameProps {
    gameData: Question[];
}

const Game: React.FC<GameProps> = ({ gameData }) => {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('1');
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [showAnswerA, setShowAnswerA] = useState<boolean>(true); // Show Answer A by default
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [feedbackPart, setFeedbackPart] = useState<boolean>(false);
  const [falseAnswerCount, setFalseAnswerCount] = useState<number>(0);


  useEffect(() => {
    setShowAnswerA(true);
    setChosenAnswer(null);
    setFeedbackPart(false);
  }, [currentQuestionId]);

  const handleSwitchAnswer = () => {
    setShowAnswerA((prevShowAnswerA) => !prevShowAnswerA);
  };

  const handleLeaveGame = () => {
    setShowOverlay(true);
  };

  const handleConfirmLeaveGame = () => {
    router.push('/'); // Redirect to the home page
  };

  const handleCancelLeaveGame = () => {
    setShowOverlay(false);
  };

  const handleConfirmAnswer = () => {
    if (showAnswerA) {
      setChosenAnswer('A');
    } else {
      setChosenAnswer('B');
      setFalseAnswerCount((prevCount) => prevCount + 1);
    }
    setFeedbackPart(true);
  };

  const handleNextQuestion = () => {
    setFeedbackPart(false);
    const currentQuestion = gameData.find((q) => q.id === currentQuestionId);
    if (!currentQuestion) {
        // Handle the case when the current question is not found
        return;
      }
    const nextQuestionId = showAnswerA
      ? currentQuestion.answerALeadsTo
      : currentQuestion.answerBLeadsTo;
  
    if (nextQuestionId === null) {
      // User has completed all questions for this game
      console.log('no more questions') // Redirect back to the starting page
    } else {
      // Move to the next question
      const nextQuestionIndex = gameData.find((q) => q.id == nextQuestionId);
      setCurrentQuestionId(nextQuestionId);
      setQuestionNumber((prevNumber) => prevNumber + 1);
    }
    
  };
  

  const shuffleAnswers = (question: Question): [string, string] => {
    // Randomly decide the order in which answers appear
    return Math.random() < 0.5
      ? [question.answerA, question.answerB]
      : [question.answerB, question.answerA];
  };

  if (!gameData.length) {
    return <div>Loading...</div>;
  }
  const currentQuestion = gameData.find((q) => q.id === currentQuestionId);
  if (!currentQuestion) {
    // Handle the case when the current question is not found   
    return <div>Question not found</div>;
    }

  const [firstAnswer, secondAnswer] = shuffleAnswers(currentQuestion);

  return (
    
    <div className='flex flex-col mx-auto relative'>
        {/* Close Button */}
       <div className='flex justify-between'>
            <ProgressCircle
                totalQuestions={10}
                currentQuestionNumber={questionNumber}
             />
            <button onClick={handleLeaveGame} className="border-none hover:shadow-none">
              <Image
                src="/close_icon.svg"
                alt="close icon"
                width="34"
                height="34"
              />
            </button>
        </div>
        {/* <ProgressCircle
        totalQuestions={10}
        currentQuestionNumber={questionNumber}
      /> */}
      {/* Overlay */}
      {showOverlay && (
        <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50' style={{ backgroundColor: 'rgba(72,72,72,0.4)' }}>
          <div className='px-8 pt-6 pb-2 max-w-sm' style={{ backgroundColor: 'rgba(255,255,255,1)' }}>
            <p>BIST DU SICHER? Wenn du das Spiel jetzt schließt, wird dein Fortschritt nicht gespeichert. Du kannst das Spiel dann wieder von vorne beginnen.</p>
            <div className='flex gap-4 justify-center mt-2'>
                <button onClick={handleConfirmLeaveGame}>Yes</button>
                <button className='bg-primary text-white' onClick={handleCancelLeaveGame}>No</button>
            </div>
            
          </div>
        </div>
      )}
       {!feedbackPart && (
      <div className='max-w-2xl mx-auto'>
        <h1>Situation {questionNumber}</h1>
        <p className='max-w-lg mx-auto mb-8'>{currentQuestion.questionText}</p>
        <div className='bg-white max-w-xs p-4 ml-auto mr-32 mb-10 relative z-10'>
          <span className='text-md p-2 w-10 text-center font-bold mr-2 text-white bg-primary absolute -top-2 left-0 '>
            {showAnswerA ? 'A' : 'B'}
          </span>
          <p className='mt-4'>{showAnswerA ? firstAnswer : secondAnswer}</p>
        </div>
        <div className='flex justify-end mr-32 gap-4'>
          <button onClick={handleConfirmAnswer} disabled={chosenAnswer !== null}>
            Sag Dies
          </button>
          {showAnswerA ? (
            <button onClick={handleSwitchAnswer} disabled={chosenAnswer !== null}>
              Andere Option
            </button>
          ) : (
            <button onClick={handleSwitchAnswer} disabled={chosenAnswer !== null}>
              Erste Option
            </button>
          )}
        </div>
      </div>
    )}
      
      {feedbackPart && (
        <div className='mx-auto'>
          {chosenAnswer === 'A' ? (
            <>
              <h2 className='text-center'>{currentQuestion.feedbackA.title}</h2>
              <div className="flex relative mx-auto min-w-[10rem] p-2 max-h-[10rem] md:max-h-none justify-center items-center mb-8">
                <Image src={Positive} alt='positive feedback' height={140} style={{
                    objectFit: "contain",
                }} />

              </div>
              <p className='max-w-lg'>{currentQuestion.feedbackA.text}</p>
            </>
          ) : (
            <>
              <h2 className='text-center'>{currentQuestion.feedbackB.title}</h2>
              <div className="flex relative mx-auto min-w-[10rem] p-2 max-h-[10rem] md:max-h-none justify-center items-center mb-8">
                <Image src={Negative} alt='negative feedback' height={140} style={{
                    objectFit: "contain",
                }} />

              </div>
              <p className='max-w-lg'>{currentQuestion.feedbackB.text}</p>
            </>
          )}
          <div className='justify-center flex mt-8'>
          <button onClick={handleNextQuestion}>Weiterspielen</button>
          </div>
        </div>
        )}
      
    </div>
  );
};

export default Game;

