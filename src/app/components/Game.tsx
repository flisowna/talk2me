"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type FetchGameRecordsFunction = () => Promise<Question[]>;

interface Question {
  id: number;
  topic: string;
  questionText: string;
  answerA: string;
  feedbackA: {
    title: string;
    text: string;
  };
  answerALeadsTo: number | null;
  answerB: string;
  feedbackB: {
    title: string;
    text: string;
  };
  answerBLeadsTo: number | null;
}

interface GameProps {
  fetchGameRecords: FetchGameRecordsFunction;
}

const Game: React.FC<GameProps> = ({ fetchGameRecords }) => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [showAnswerA, setShowAnswerA] = useState<boolean>(true); // Show Answer A by default
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [falseAnswerCount, setFalseAnswerCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const records = await fetchGameRecords();
      setQuestions(records);
    };

    fetchData();
  }, [fetchGameRecords]);

  useEffect(() => {
    // Reset the state when a new question is displayed
    setShowAnswerA(true);
    setChosenAnswer(null);
    setFeedbackVisible(false);
  }, [currentQuestionIndex]);

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
    const currentQuestion = questions[currentQuestionIndex];
    const nextQuestionId = showAnswerA
      ? currentQuestion.answerALeadsTo
      : currentQuestion.answerBLeadsTo;
  
    if (nextQuestionId === null) {
      // User has completed all questions for this game
      router.push('/'); // Redirect back to the starting page
    } else {
      // Move to the next question
      const nextQuestionIndex = questions.findIndex((q) => q.id === nextQuestionId);
      setCurrentQuestionIndex(nextQuestionIndex);
      setQuestionNumber((prevNumber) => prevNumber + 1);
    }
    
  };
  

  const shuffleAnswers = (question: Question): [string, string] => {
    // Randomly decide the order in which answers appear
    return Math.random() < 0.5
      ? [question.answerA, question.answerB]
      : [question.answerB, question.answerA];
  };

  if (!questions.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const [firstAnswer, secondAnswer] = shuffleAnswers(currentQuestion);

  return (
    <div>
      <h1>{currentQuestion.topic}</h1>
      <h2>Question {questionNumber}</h2>
      <p>{currentQuestion.questionText}</p>
      {showAnswerA ? <p>{firstAnswer}</p> : <p>{secondAnswer}</p>}
      <button onClick={handleSwitchAnswer}>Switch Answer</button>
      <button onClick={handleConfirmAnswer} disabled={chosenAnswer !== null}>
        Confirm Answer
      </button>
      {feedbackVisible && (
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
      )}
    </div>
  );
};

export default Game;
