import ProgressCircle from './ProgressCircle';
import Image from 'next/image';

interface LayoutProps {
    children: React.ReactNode;
    currentQuestionNumber: number;
    totalQuestions: number;
    handleLeaveGame?: () => void;
  }
 
export default function GameLayout({ children, currentQuestionNumber, totalQuestions, handleLeaveGame }: LayoutProps)  {
  return (
    <>
    <div className='flex flex-col mx-auto relative'>
        {/* Close Button */}
       <div className='flex justify-between items-center'>
            <ProgressCircle
                totalQuestions={totalQuestions}
                currentQuestionNumber={currentQuestionNumber}
             />
            {handleLeaveGame && (<button onClick={handleLeaveGame} className="border-none hover:shadow-none">
              <Image
                src="/close_icon.svg"
                alt="close icon"
                width={34}
                height={34}
              />
            </button>)}
        </div>
        </div>
      <main>{children}</main>
    </>
  )
}