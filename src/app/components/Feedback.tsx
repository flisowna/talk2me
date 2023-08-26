import Image from "next/image";
import Negative from "../../../public/k5_image_negative_feedback.svg";
import Positive from "../../../public/k5_image_positive_feedback.svg";

interface FeedbackProps {
    chosenAnswer: "A" | "B" | null;
    titleA: string;
    textA: string;
    titleB: string;
    textB: string;
    handleNextQuestion: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({chosenAnswer, titleA, textA, titleB, textB, handleNextQuestion }) => {

  
  return (
    <div className='mx-auto max-w-2xl'>
          
            <>
              <h1 className='md:text-center'>{chosenAnswer === 'A' ? titleA : titleB}</h1>
              <div className="flex relative mx-auto min-w-[10rem] p-2 max-h-[10rem] md:max-h-none justify-center items-center mb-8">
                <Image src={chosenAnswer === 'A' ? Positive : Negative} alt='positive feedback' height={140} style={{
                    objectFit: "contain",
                }} />

              </div>
              <p className='max-w-lg mx-auto'>{chosenAnswer === 'A' ? textA : textB}</p>
            </>
          <div className='justify-center flex mt-8'>
          <button onClick={handleNextQuestion}>Weiterspielen</button>
          </div>
        </div>
  );
};

export default Feedback;