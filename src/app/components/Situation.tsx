interface SituationProps {
    chosenAnswer: "A" | "B" | null;
    showAnswerA: boolean;
    handleConfirmAnswer: () => void;
    handleSwitchAnswer: () => void;
    questionNumber: number;
    questionText: string;
    shownLabelA: boolean;
    answerA: string;
    answerB: string;
}

const Situation: React.FC<SituationProps> = ({answerA, answerB, chosenAnswer, showAnswerA, handleConfirmAnswer, handleSwitchAnswer, questionNumber, questionText, shownLabelA }) => {

  
  return (
    <div className='max-w-2xl mx-auto'>
        <h1>Situation {questionNumber}</h1>
        <p className='max-w-lg mx-auto mb-8'>{questionText}</p>
        <div className='bg-white max-w-xs p-4 mx-auto mb-10 relative z-10'>
          <span className='font-mono text-md p-2 w-10 text-center font-bold mr-2 text-white bg-primary absolute -top-2 left-0 '>
            {shownLabelA ? 'A' : 'B'}
          </span>
          <p className='mt-4'>{showAnswerA ? answerA : answerB}</p>
        </div>
        <div className='flex max-w-xs justify-end mx-auto gap-4'>
          <button onClick={handleConfirmAnswer} disabled={chosenAnswer !== null}>
            Sag Dies
          </button>
          {shownLabelA ? (
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
  );
};

export default Situation;