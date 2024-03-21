import DebugButton from '../components/DebugButton';
import { removeFromSack } from '../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks/state-hooks';
import FilledSackWidget from './FilledSackWidget';

export default function GameInformationSummary() {
  return (
    <div className="bg-cyan-700 p-2 space-y-3">
      <h2 className="text-2xl">Game State Information</h2>
      <ul className="space-y-3">
        <li>
          <span className="block border-2 border-black p-2 bg-green-800">Your turn</span>
        </li>
        <li>
          <SackPlayerSummary />
        </li>
        <li>
          <PieceValues />
        </li>
      </ul>
    </div>
  );
}

function SackPlayerSummary() {
  const dispatch = useAppDispatch();
  const remainingPieces = useAppSelector((state) => state.game.sack.piecesByIds);
  const nofPiecesInBeginning = useAppSelector((state) => state.game.sack.nofPiecesInBeginning);
  const nofRemainingPieces = Object.keys(remainingPieces).length;

  return (
    <div className="flex flex-col items-center border-2 border-black p-2">
      <DebugButton
        handleClick={() => {
          const threeIds = Object.keys(remainingPieces).slice(0, 3);
          dispatch(
            removeFromSack({
              idsToRemove: threeIds,
            }),
          );
        }}
      >
        Take 3 out of the sack
      </DebugButton>
      <FilledSackWidget fraction={nofRemainingPieces / nofPiecesInBeginning} />
      <span>{nofRemainingPieces} pieces remain in the sack</span>
    </div>
  );
}

const testPieceInformation = [
  { letter: 'a', totalNumber: 5 },
  { letter: 'b', totalNumber: 3 },
  { letter: 'c', totalNumber: 3 },
  { letter: 'd', totalNumber: 3 },
  { letter: 'e', totalNumber: 5 },
  { letter: 'f', totalNumber: 3 },
  { letter: 'g', totalNumber: 3 },
  { letter: 'h', totalNumber: 3 },
  { letter: 'i', totalNumber: 5 },
  { letter: 'j', totalNumber: 3 },
  { letter: 'k', totalNumber: 3 },
  { letter: 'l', totalNumber: 3 },
  { letter: 'm', totalNumber: 3 },
  { letter: 'n', totalNumber: 3 },
  { letter: 'o', totalNumber: 3 },
  { letter: 'p', totalNumber: 3 },
  { letter: 'q', totalNumber: 3 },
  { letter: 'r', totalNumber: 3 },
  { letter: 's', totalNumber: 3 },
  { letter: 't', totalNumber: 3 },
  { letter: 'u', totalNumber: 3 },
  { letter: 'v', totalNumber: 3 },
  { letter: 'w', totalNumber: 3 },
  { letter: 'x', totalNumber: 3 },
  { letter: 'y', totalNumber: 3 },
  { letter: 'z', totalNumber: 3 },
];

function PieceValues() {
  return (
    <div className="grid border-2 grid-cols-5 border-black p-2">
      {testPieceInformation.map(({ letter, totalNumber }) => (
        <span key={letter}>
          {letter}-{totalNumber}
        </span>
      ))}
    </div>
  );
}
