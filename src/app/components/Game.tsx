"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProgressCircle from './ProgressCircle';

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
//   const router = useRouter();
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('1');
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [showAnswerA, setShowAnswerA] = useState<boolean>(true); // Show Answer A by default
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [falseAnswerCount, setFalseAnswerCount] = useState<number>(0);


  useEffect(() => {
    setShowAnswerA(true);
    setChosenAnswer(null);
    setFeedbackVisible(false);
  }, [currentQuestionId]);

  const handleSwitchAnswer = () => {
    setShowAnswerA((prevShowAnswerA) => !prevShowAnswerA);
  };

  const handleConfirmAnswer = () => {
    if (showAnswerA) {
      setChosenAnswer('A');
    } else {
      setChosenAnswer('B');
      setFalseAnswerCount((prevCount) => prevCount + 1);
    }
    setFeedbackVisible(true);
  };

  const handleNextQuestion = () => {
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
    <div className='flex flex-col max-w-2xl mx-auto'>
        {/* <ProgressCircle
        totalQuestions={10}
        currentQuestionNumber={questionNumber}
      /> */}
      <h1>Situation {questionNumber}</h1>
      <p className='max-w-lg mx-auto mb-8'>{currentQuestion.questionText}</p>
      <div className='bg-white max-w-xs p-4 ml-auto mr-32 mb-10 relative'>
        
          <span className='text-md p-2 w-10 text-center font-bold mr-2 text-white bg-primary absolute -top-2 left-0 '>{showAnswerA ? "A" : "B"}</span>
          <p className='mt-4'>{showAnswerA ? firstAnswer : secondAnswer}</p>
        
      </div>
      <div className='flex justify-end mr-32 gap-4'>
      <button onClick={handleConfirmAnswer} disabled={chosenAnswer !== null}>
        Sag Dies
      </button>
      {showAnswerA ? 
        <button onClick={handleSwitchAnswer} disabled={chosenAnswer !== null}>
        Andere Option
        </button> :
        <button onClick={handleSwitchAnswer} disabled={chosenAnswer !== null}>
        Erste Option </button>
        }
        </div>
      
      {/* {feedbackVisible && (
        <div>
          {chosenAnswer === 'A' ? (
            <>
              <h3>{currentQuestion.feedbackA.title}</h3>
              <p>{currentQuestion.feedbackA.text}</p>
            </>
          ) : (
            <>
              <h3>{currentQuestion.feedbackB.title}</h3>
              <p>{currentQuestion.feedbackB.text}</p>
            </>
          )}
          <button onClick={handleNextQuestion}>Continue</button>
        </div>
      )} */}
    </div>
  );
};

export default Game;