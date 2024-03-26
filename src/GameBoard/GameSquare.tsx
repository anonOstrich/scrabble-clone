import { writeBoardValue } from '../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks/state-hooks';
import { isBoardSquareValue } from '../utils/types';

type ChosenHighlight = 'preview' | 'chosen' | 'none';

interface GameSquareProps {
  index: number;
  row: number;
  column: number;
  isDisabled: boolean;
  chooseAsStartingPosition: (row: number, column: number) => void;
  highlight: ChosenHighlight;
  writeIntoCell?: () => void;
  focusRef: React.RefObject<HTMLInputElement>;
}

export default function GameSquare({
  index,
  isDisabled,
  chooseAsStartingPosition,
  row,
  column,
  writeIntoCell,
  focusRef,
  highlight = 'none',
}: GameSquareProps) {
  const character = useAppSelector((state) => state.game.board.boardArrayOneDimensional[index]);
  const rackLetters = useAppSelector((state) => state.game.rack.pieces);
  const dispatch = useAppDispatch();
  const displayedCharacter = character ? character : '';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newLetter = e.target.value.charAt(e.target.value.length - 1);
    if (newLetter.length > 1) return;
    if (newLetter === character) return;
    if (newLetter.length > 0 && !newLetter.match(/[a-z]/i)) return;

    const letterToSave = newLetter.length === 0 ? null : newLetter;

    if (!isBoardSquareValue(letterToSave)) return;
    if (highlight !== 'preview') return;
    dispatch(
      writeBoardValue({
        index: { dimensionality: 'one', index: index },
        value: letterToSave,
      }),
    );
    if (writeIntoCell != null) {
      const willSucceed = rackLetters.some((l) => l.value === letterToSave);
      // This logic should NOT be scattered about like this...
      if (willSucceed) {
        writeIntoCell();
      }
    }
  }

  let backgroundColor = '#d1d5db';

  if (!isDisabled) {
    switch (highlight) {
      case 'preview':
        backgroundColor = '#659ffb';
        break;
      case 'chosen':
        backgroundColor = '#0b65f5';
        break;
      case 'none':
        backgroundColor = '#f6d068';
        break;
      default:
        throw new Error('Should not be possible');
    }
  }

  return (
    <input
      type="text"
      // If maxLength == 1, onChange won't trigger except for an empty input
      maxLength={2}
      className="overflow-hidden
            capitalize text-2xl text-center"
      style={{
        // opacity filter
        backgroundColor: backgroundColor,
      }}
      value={displayedCharacter}
      onChange={handleChange}
      disabled={isDisabled}
      onClick={() => {
        console.log('HERE I AM');
        chooseAsStartingPosition(row, column);
      }}
      ref={highlight === 'preview' ? focusRef : null}
    />
  );
}
