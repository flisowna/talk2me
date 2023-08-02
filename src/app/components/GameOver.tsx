
import Image from "next/image";
import GameOverImage from "../../../public/k5_game_over.svg";

interface GameOverProps {
    gameOverData: string | null | undefined;
}

const GameOver: React.FC<GameOverProps> = ({gameOverData}) => {

  
  return (
    <div className="flex justify-between items-center mx-auto max-w-lg flex-col">
        <h2>game over</h2>

      
        <Image
          src={GameOverImage}
          alt="game over icon"
          width={150}
          height={150}
        />
        <p>{gameOverData}</p>
      
    </div>
  );
};

export default GameOver;
