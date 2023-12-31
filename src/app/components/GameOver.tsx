import Image from "next/image";
import GameOverImage from "../../../public/k5_game_over.svg";

interface GameOverProps {
    gameOverData: string | null | undefined;
    handleConfirmLeaveGame?: () => void;
    handleRenewGame?: () => void;
}

const GameOver: React.FC<GameOverProps> = ({gameOverData, handleConfirmLeaveGame, handleRenewGame}) => {

  
  return (
    <div className="flex justify-between items-center mx-auto max-w-lg flex-col">
        <h2 className="mb-4">game over</h2>  
        <Image
          src={GameOverImage}
          alt="game over icon"
          width={200}
          height={200}
        />
        <p className="mt-6">{gameOverData}</p>
        <div className='flex justify-center gap-4 mt-2'>
          <button onClick={handleRenewGame}>Noch Mal!</button>
            <button onClick={handleConfirmLeaveGame}>Andere Spiele</button>
        </div>
    </div>
  );
};

export default GameOver;
