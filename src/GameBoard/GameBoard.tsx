import { useEffect, useState } from 'react';
import CharacterRack from './CharacterRack';
import GameGrid from './GameGrid';
import WritingControls from './WritingControls';
import { useAppDispatch, useAppSelector } from '../hooks/state-hooks';
import { attemptPlacingWord, cancelPlacingWord } from '../features/game/gameSlice';
import { BoardSquareValue } from '../utils/types';

export type PlacementDirection = 'horizontal' | 'vertical';

export type Coords = [number, number];

export default function GameBoard() {
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) => state.game.board.boardArray);

  const [isPlacing, setIsPlacing] = useState(false);
  const [placementDirection, setPlacementDirection] = useState<PlacementDirection>('horizontal');
  const [wordHasStarted, setWordHasStarted] = useState(false);

  const [wordStart, setWordStart] = useState<Coords>([-1, -1]);
  const [wordLength, setWordLength] = useState<number>(0);
  const [lockedBoard, setLockedBoard] = useState<BoardSquareValue[][] | null>(null);

  function isOpenToModification(row: number, col: number) {
    if (lockedBoard == null) return false;
    return lockedBoard[row][col] == null;
  }

  useEffect(() => {
    if (isPlacing) {
      setLockedBoard([...board.map((e) => [...e])]);
    }
  }, [isPlacing]);

  function changePlacementDirection(newDirection: PlacementDirection) {
    if (!wordHasStarted) {
      setPlacementDirection(newDirection);
    }
  }

  function enterWord() {
    dispatch(attemptPlacingWord({ startPosition: wordStart, wordLength: wordLength, direction: 'horizontal' }));
    setIsPlacing(false);
  }

  function cancelInput() {
    dispatch(
      cancelPlacingWord({
        startPosition: wordStart,
        wordLength: wordLength,
        direction: placementDirection,
      }),
    );
    setIsPlacing(false);
  }

  return (
    <section
      className="bg-cyan-700"
      style={{
        backgroundColor: isPlacing ? '#168f00' : 'rgb(14,116,144)',
      }}
    >
      <h2 className="text-2xl">Game Board</h2>
      <div className="m-8 flex justify-center items-center">
        <GameGrid
          isDisabled={!isPlacing}
          direction={placementDirection}
          setWordHasStarted={setWordHasStarted}
          setDirection={changePlacementDirection}
          setWordLength={setWordLength}
          setWordStart={setWordStart}
          wordLength={wordLength}
          wordStart={wordStart}
          cellIsOpenToModification={isOpenToModification}
        />
      </div>

      <WritingControls
        isPlacing={isPlacing}
        setIsPlacing={setIsPlacing}
        direction={placementDirection}
        setDirection={changePlacementDirection}
        directionCanBeChanged={!wordHasStarted}
        enter={enterWord}
        cancel={cancelInput}
      />

      <div className="max-w-[450px] mx-auto">
        <CharacterRack />
      </div>
    </section>
  );
}
