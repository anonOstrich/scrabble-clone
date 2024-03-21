import { useState } from 'react';
import DebugButton from '../components/DebugButton';
import { fillRack } from '../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks/state-hooks';
import CharacterRackPiece from './CharacterRackPiece';
import { BoardSquarePiece } from '../utils/types';

/*
Ideas for swapping selection: 
- hightlight by animated pulsing
- highlight by a caret on top of the selection.
- animate the transition
- only update the redux state when the user confirms the swap
*/

export default function CharacterRack() {
  const rackPieces = useAppSelector((state) => state.game.rack.pieces);
  // const sackPieces = useAppSelector((state) => state.sack.piecesByIds);
  const dispatch = useAppDispatch();

  const [isChoosingPiecesToSwap, setIsChoosingPiecesToSwap] = useState(false);
  const [chosenPieces, setChosenPieces] = useState<BoardSquarePiece[]>([]);

  function handleFillRack() {
    dispatch(fillRack());
  }

  function handleInitiatePieceSwap() {
    setIsChoosingPiecesToSwap(true);
  }

  function handleFinishPieceSwap() {
    setIsChoosingPiecesToSwap(false);
    console.log(`You wish to swap the following pieces: ${chosenPieces.map((p) => p.value).join(', ')}`);
    setChosenPieces([]);
  }

  function createPieceSelectionToggler(piece: BoardSquarePiece) {
    const togglerFn = () => {
      setChosenPieces((prev) => {
        if (prev.includes(piece)) {
          return prev.filter((p) => p !== piece);
        }
        return prev.concat(piece);
      });
    };
    return togglerFn;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row mx-[-100px]">
        <DebugButton handleClick={handleFillRack}>TEST: fill rack with something</DebugButton>

        {isChoosingPiecesToSwap ? (
          <DebugButton handleClick={handleFinishPieceSwap} type="success">
            Confirm Swap Selection
          </DebugButton>
        ) : (
          <DebugButton handleClick={handleInitiatePieceSwap} type="neutral">
            Initiate operation{' '}
            <span className="font-serif text-gray-200 underline underline-offset-2 decoration-wavy">piece swap</span>
          </DebugButton>
        )}
      </div>

      <ul
        className="flex flex-wrap justify-center gap-2 bg-slate-400 py-2 rounded-md shadow-sm min-h-[40px]"
        style={{
          border: isChoosingPiecesToSwap ? '8px solid white' : '',
        }}
      >
        {rackPieces.map((piece, idx) => (
          <li key={idx}>
            <CharacterRackPiece
              character={piece.value ?? ''}
              toggleSelection={createPieceSelectionToggler(piece)}
              isChosen={chosenPieces.includes(piece)}
              isChoosingPiecesToSwap={isChoosingPiecesToSwap}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
