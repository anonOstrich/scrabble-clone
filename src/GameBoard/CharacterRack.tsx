import DebugButton from '../components/DebugButton';
import { addToRack, removeFromRack } from '../features/rack/rackSlice';
import { useAppDispatch, useAppSelector } from '../hooks/state-hooks';
import CharacterRackPiece from './CharacterRackPiece';

export default function CharacterRack() {
  const rackPieces = useAppSelector((state) => state.rack.pieces);
  const sackPieces = useAppSelector((state) => state.sack.piecesByIds);
  const dispatch = useAppDispatch();

  function handleAddToRack() {
    console.log('adding...');
    const piecesToAdd = Object.values(sackPieces).slice(0, 4);
    dispatch(addToRack(piecesToAdd));
  }

  function createRemoveHandler(index: number) {
    return () => {
      dispatch(removeFromRack({ indices: [index] }));
    };
  }

  return (
    <>
      <DebugButton handleClick={handleAddToRack} type="danger">
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
