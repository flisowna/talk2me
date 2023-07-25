

import Game from '../components/Game'
import { fetchGame1Records } from '../../../utils/game1'

const Game1 = () => {
  return <Game fetchGameRecords={fetchGame1Records} />;
};

export default Game1;