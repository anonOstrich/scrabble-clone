import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../hooks/state-hooks';
import { PlacementDirection } from './GameBoard';
import GameSquare from './GameSquare';
import { BOARD_SIZE } from '../config/configs';

interface GameGridInterface {
  direction: PlacementDirection;
  isDisabled: boolean;
  setWordHasStarted: (val: boolean) => void;
}

type Coords = [number, number];

export default function GameGrid({ direction, isDisabled, setWordHasStarted }: GameGridInterface) {
  const boardState = useAppSelector((state) => state.game.board.boardArray);
  const [wordStart, setWordStart] = useState<Coords>([-1, -1]);
  const [wordLength, setWordLength] = useState<number>(0);
  // No need to be set up before first cell is hightlighted
  const focusEl = useRef<HTMLInputElement>(null);

  function resetGrid() {
    setWordStart([-1, -1]);
    setWordLength(0);
    focusEl.current?.blur();
  }

  useEffect(() => {
    if (isDisabled) {
      resetGrid();
    }
  }, [isDisabled]);

  useEffect(() => {
    focusEl.current?.focus();
    setWordHasStarted(wordLength !== 0);
  }, [wordLength, setWordHasStarted]);

  const [startRow, startColumn] = wordStart;

  const chosenCells =
    direction === 'horizontal'
      ? Array.from({ length: wordLength }, (_, index) => [startRow, startColumn + index])
      : Array.from({ length: wordLength }, (_, index) => [startRow + index, startColumn]);
  const highlightedCell =
    direction === 'horizontal' ? [startRow, startColumn + wordLength] : [startRow + wordLength, startColumn];

  function writeIntoCell() {
    setWordLength((len) => len + 1);
  }

  // const oneDimensionalBoard = boardState.flatMap((row) => row);
  const twoDimensionalBoard = boardState;

  function chooseAsStartingPosition(row: number, column: number) {
    // For now: COMMIT to your selection, eh?
    if (wordStart[0] == -1 && wordStart[1] == -1) {
      setWordStart([row, column]);
    }
  }

  return (
    <div className="grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-1 bg-violet-700 border-[0.5rem] border-violet-700 w-[600px] h-[600px]">
      {twoDimensionalBoard.map((row, rowIndex) =>
        row.map((column, columnIndex) => {
          const isChosen = chosenCells.some(
            ([chosenRow, chosenColumn]) => chosenRow === rowIndex && chosenColumn === columnIndex,
          );
          const isHighlighted = highlightedCell[0] === rowIndex && highlightedCell[1] === columnIndex;

          return (
            <GameSquare
              key={rowIndex * BOARD_SIZE + columnIndex}
              index={rowIndex * BOARD_SIZE + columnIndex}
              isDisabled={isDisabled}
              column={columnIndex}
              row={rowIndex}
              chooseAsStartingPosition={chooseAsStartingPosition}
              highlight={isChosen ? 'chosen' : isHighlighted ? 'preview' : 'none'}
              writeIntoCell={isHighlighted ? writeIntoCell : undefined}
              focusRef={focusEl}
              displayedArrow={wordLength === 0 ? (isHighlighted ? direction : 'none') : 'none'}
            />
          );
        }),
      )}
    </div>
  );
}
