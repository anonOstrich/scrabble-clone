import { useEffect, useRef } from 'react';
import { useAppSelector } from '../hooks/state-hooks';
import { Coords, PlacementDirection } from './GameBoard';
import GameSquare from './GameSquare';
import { BOARD_SIZE } from '../config/configs';

interface GameGridInterface {
  direction: PlacementDirection;
  isDisabled: boolean;
  setWordHasStarted: (val: boolean) => void;
  setDirection: (newDirection: PlacementDirection) => void;
  setWordStart: (val: Coords) => void;
  setWordLength: (val: number) => void;
  wordStart: Coords;
  wordLength: number;
  cellIsOpenToModification: (row: number, col: number) => boolean;
}

export default function GameGrid({
  direction,
  isDisabled,
  setWordHasStarted,
  setDirection,
  setWordStart,
  setWordLength,
  wordStart,
  wordLength,
  cellIsOpenToModification,
}: GameGridInterface) {
  const boardState = useAppSelector((state) => state.game.board.boardArray);

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
    if (cellIsOpenToModification(highlightedCell[0], highlightedCell[1])) {
      setWordLength(wordLength + 1);
    }
  }

  // const oneDimensionalBoard = boardState.flatMap((row) => row);
  const twoDimensionalBoard = boardState;

  function chooseAsStartingPosition(row: number, column: number) {
    // For now: COMMIT to your selection, eh?
    if (wordStart[0] == -1 && wordStart[1] == -1 && cellIsOpenToModification(row, column)) {
      setWordStart([row, column]);
    }
  }

  return (
    <div className="grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-1 bg-violet-700 border-[0.5rem] border-violet-700 w-[600px] h-[600px]">
      {twoDimensionalBoard.map((row, rowIndex) =>
        row.map((_, columnIndex) => {
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
              setDirection={isHighlighted ? setDirection : undefined}
            />
          );
        }),
      )}
    </div>
  );
}
