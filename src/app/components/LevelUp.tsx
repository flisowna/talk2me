import Image from "next/image";
import LevelUp1 from "../../../public/levelup1.svg";
import LevelUp2 from "../../../public/levelup2.svg";
import LevelUp3 from "../../../public/levelup3.svg";

interface LevelUpProps {
    questionNumber: number;
    setShowLevelUpFalse: () => void;
}

const LevelUp: React.FC<LevelUpProps> = ({questionNumber, setShowLevelUpFalse }) => {

    let levelUpImage;
    let superPower
    let text

    if (questionNumber === 4) {
        levelUpImage = LevelUp1
        superPower = 1
        text = 'Herzlichen Glückwunsch! Du hast die Fähigkeit deinem Gegenüber zuzuhören, ohne ihn zu verurteilen und ihm einen Perspektivwechsel vorzuschlagen. Stattdessen versuchst du, seinen Blickwinkel zu weiten. Heutzutage wird das als Superkraft angesehen.'
    } else if (questionNumber === 7) {
        levelUpImage = LevelUp2
        superPower = 2
        text = 'Du hast die Fähigkeit, Fehlinformationen, in diesem Fall einen Ablenkungsversuch, zu widerlegen. Dein Kollege könnte anfangen, an seinen Überzeugungen zu zweifeln, falsche Ansichten zu erkennen oder seine Quellen zu überprüfen.'
    } else if (questionNumber === 10) {
        levelUpImage = LevelUp3
        superPower = 3
        text = 'Deine Fragen treffen ins Schwarze! Du weißt genau, wie und was du fragen musst, um kritisches Denken anzustoßen und deinen Kollegen selbstständig fehlerhafte Argumente erkennen zu lassen. Stelle weitere Fragen!'
    }

  
  return (
    <div className='mx-auto max-w-2xl flex flex-col items-center'>
        <h1>superkraft #{superPower}</h1>
        <Image src={levelUpImage} alt='superkraft image' height={180} style={{objectFit: "contain",}} />
        <p className="mb-4 mt-6">{text}</p>
        <button onClick={setShowLevelUpFalse}>Weiterspielen</button>
    </div>
  );
};

export default LevelUp;