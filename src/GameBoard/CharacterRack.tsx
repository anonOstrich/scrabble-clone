import DebugButton from '../components/DebugButton';
import { fillRack } from '../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks/state-hooks';
import CharacterRackPiece from './CharacterRackPiece';

export default function CharacterRack() {
  const rackPieces = useAppSelector((state) => state.game.rack.pieces);
  // const sackPieces = useAppSelector((state) => state.sack.piecesByIds);
  const dispatch = useAppDispatch();
  function handleFillRack() {
    dispatch(fillRack());
  }

  function createRemoveHandler(index: number) {
    return () => {};
  }

  return (
    <>
      <DebugButton handleClick={handleFillRack} type="danger">
        TEST: fill rack with something
      </DebugButton>

      <ul className="flex flex-wrap justify-center gap-2 bg-slate-400 py-2 rounded-md shadow-sm min-h-[40px]">
        {rackPieces.map((character, idx) => (
          <li key={idx}>
            <CharacterRackPiece character={character.value ?? ''} removeCharacter={createRemoveHandler(idx)} />
          </li>
        ))}
      </ul>
    </>
  );
}
