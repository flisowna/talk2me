
import Image from "next/image";
import GameOver from "../../../public/k5_game_over.svg";

interface GameOverProps {
    gameOverData: string | null | undefined;
}

const Navigation: React.FC<GameOverProps> = ({gameOverData}) => {

  
  return (
    <div className="flex justify-between items-center mx-auto max-w-lg flex-col">
        <h2>game over</h2>

      
        <Image
          src={GameOver}
          alt="game over icon"
          width={34}
          height={34}
        />
        <p>{gameOverData}</p>
      
    </div>
  );
};

export default Navigation;
