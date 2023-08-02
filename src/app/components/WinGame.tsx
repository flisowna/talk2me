
import Image from "next/image";
import Win from "../../../public/k5_image_win.svg";

interface WinGameProps {
    handleConfirmLeaveGame?: () => void;
}


const WinGame: React.FC<WinGameProps> = ({handleConfirmLeaveGame}) => {

  
  return (
    <div className="flex justify-between items-center mx-auto max-w-lg flex-col">
        <h2>herzlichen glückwunsch</h2>

      
        <Image
          src={Win}
          alt="game over icon"
          width={150}
          height={150}
        />
        <p>Du bist durchaus dazu in der Lage, mit Verwandten oder Freund*innen zu diskutieren, die Falschinformationen verbreiten. Du hörst deinem Gegenüber zu, anstatt nur deine Argumente vorzutragen. Du kannst Beobachtungen von Beurteilungen trennen, und dir ist bewusst, dass es jemanden nicht kooperativer macht, wenn du ihm die Schuld gibst. Du weißt außerdem, wie man Fehlinformationen entlarvt und auf fehlerhafte Argumentation hinweist. Also viel Erfolg bei der Bekämpfung von Falschinformationen und Verschwörungsmythen in der realen Welt!</p>
        <div className='flex justify-center mt-2'>
            <button onClick={handleConfirmLeaveGame}>Andere Spiele</button>
        </div>
      
    </div>
  );
};

export default WinGame;