"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import GameOver from './GameOver';
import GameLayout from './GameLayout';
import Overlay from './Overlay';
import Situation from './Situation';
import Feedback from './Feedback';
import WinGame from './WinGame';
import LevelUp from './LevelUp';

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
  gameOverText: string | null;
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
  const [chosenAnswer, setChosenAnswer] = useState<"A" | "B" | null>(null);
  const [shownLabelA, setShownLabelA] = useState<boolean>(true);
  const [feedbackPart, setFeedbackPart] = useState<boolean>(false);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [falseAnswerCount, setFalseAnswerCount] = useState<number>(0);


  useEffect(() => {
    setShowAnswerA(true);
    setChosenAnswer(null);
    setFeedbackPart(false);
    shuffleAnswers();
    setShownLabelA(true);
  }, [currentQuestionId]);

  

  const handleSwitchAnswer = () => {
    setShowAnswerA((prevShowAnswerA) => !prevShowAnswerA);
    setShownLabelA((prevShowLabelA) => !prevShowLabelA);
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
        return;
      }
    const nextQuestionId = showAnswerA
      ? currentQuestion.answerALeadsTo
      : currentQuestion.answerBLeadsTo;
  
    if (nextQuestionId === null) {
      console.log('no more questions') // Redirect back to the starting page
    } else {
      setCurrentQuestionId(nextQuestionId);
      setQuestionNumber((prevNumber) => prevNumber + 1);
    }
    if (questionNumber === 4 || 7 || 9) {
        setShowLevelUp(true);
    } 
};
  
const shuffleAnswers = () => {
    const random =  Math.random() < 0.5
    if (random) {
        setShowAnswerA(true);
    } else {
        setShowAnswerA(false);
    }
  };

  if (!gameData.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = gameData.find((q) => q.id === currentQuestionId);

  if (currentQuestionId === 'game over') {
    return(
    <GameLayout currentQuestionNumber={questionNumber} totalQuestions={10}>
        <GameOver gameOverData={currentQuestion?.gameOverText} />
    </GameLayout>) ;
  }

  if (currentQuestionId === 'end of game') {
    return(
    <GameLayout currentQuestionNumber={questionNumber} totalQuestions={10}>
        <WinGame handleConfirmLeaveGame={handleConfirmLeaveGame} />
    </GameLayout>) ;
  }



  
  if (!currentQuestion) {
    return <div>Question not found</div>;
    }

  return (
    
    <GameLayout currentQuestionNumber={questionNumber} totalQuestions={10} handleLeaveGame={handleLeaveGame}>
      {showOverlay && (
        <Overlay handleCancelLeaveGame={handleCancelLeaveGame} handleConfirmLeaveGame={handleConfirmLeaveGame}/>
      )}
       {(!feedbackPart && !showLevelUp) &&(
      <Situation 
        chosenAnswer={chosenAnswer}
        showAnswerA={showAnswerA}
        handleConfirmAnswer={handleConfirmAnswer}
        handleSwitchAnswer={handleSwitchAnswer}
        questionNumber={questionNumber}
        questionText={currentQuestion.questionText}
        answerA={currentQuestion.answerA}
        answerB={currentQuestion.answerB}
        shownLabelA={shownLabelA}
      />
    )}
      
      {feedbackPart && (
        <Feedback 
          chosenAnswer={chosenAnswer}
          titleA={currentQuestion.feedbackA.title}
          textA={currentQuestion.feedbackA.text}
          titleB={currentQuestion.feedbackB.title}
          textB={currentQuestion.feedbackB.text}
          handleNextQuestion={handleNextQuestion}
        />
        )}
        {showLevelUp && (
            <LevelUp questionNumber={questionNumber} setShowLevelUpFalse={() => setShowLevelUp(false)} />
        )}

      
    </GameLayout>
  );
};

export default Game;

