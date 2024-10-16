
import Image from "next/image";
import Win from "../../../public/k5_image_win.svg";

interface WinGameProps {
    handleConfirmLeaveGame?: () => void;
    winText: string | null | undefined;
}


const WinGame: React.FC<WinGameProps> = ({handleConfirmLeaveGame, winText}) => {

  
  return (
    <div className="flex justify-between items-center mx-auto max-w-lg flex-col">
        <h2 className="mb-4">Herzlichen Glückwunsch</h2>
        <Image
          src={Win}
          alt="game over icon"
          width={200}
          height={200}
        />
        <p className="mt-6">{winText}</p>
        <div className='flex justify-center mt-2'>
            <button onClick={handleConfirmLeaveGame}>Andere Spiele</button>
        </div>
      
    </div>
  );
};

export default WinGame;