import { useAppSelector } from '../hooks/state-hooks';
import GameSquare from './GameSquare';

export default // Stateful, smart. Controlled by parent.
function GameSquares() {
  const boardState = useAppSelector((state) => state.game.board.boardArray);

  const oneDimensionalBoard = boardState.flatMap((row) => row);
  console.log('one dimensional board: ', oneDimensionalBoard);

  return (
    <div className="grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-1 bg-violet-700 border-[0.5rem] border-violet-700 w-[600px] h-[600px]">
      {oneDimensionalBoard.map((_, index) => {
        return <GameSquare key={index} index={index} />;
      })}
    </div>
  );
}
