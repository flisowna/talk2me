import Image from "next/image";
import LevelUp1 from "../../../public/levelup1.svg";
import LevelUp2 from "../../../public/levelup2.svg";
import LevelUp3 from "../../../public/levelup3.svg";

interface LevelUpProps {
    questionNumber: number;
    setShowLevelUpFalse: () => void;
}

const LevelUp: React.FC<LevelUpProps> = ({questionNumber, setShowLevelUpFalse }) => {

  
  return (
    <div className='mx-auto max-w-2xl'>
        Level Up
        <button onClick={setShowLevelUpFalse}>Weiterspielen</button>
    </div>
  );
};

export default LevelUp;