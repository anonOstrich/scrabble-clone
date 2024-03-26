import { useState } from 'react';
import CharacterRack from './CharacterRack';
import GameGrid from './GameGrid';
import WritingControls from './WritingControls';

export type PlacementDirection = 'horizontal' | 'vertical';

export default function GameBoard() {
  const [isPlacing, setIsPlacing] = useState(false);
  const [placementDirection, setPlacementDirection] = useState<PlacementDirection>('horizontal');
  const [wordHasStarted, setWordHasStarted] = useState(false);

  function changePlacementDirection(newDirection: PlacementDirection) {
    if (!wordHasStarted) {
      setPlacementDirection(newDirection);
    }
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
        <GameGrid isDisabled={!isPlacing} direction={placementDirection} setWordHasStarted={setWordHasStarted} />
      </div>

      <WritingControls
        isPlacing={isPlacing}
        setIsPlacing={setIsPlacing}
        direction={placementDirection}
        setDirection={changePlacementDirection}
        directionCanBeChanged={!wordHasStarted}
      />

      <div className="max-w-[450px] mx-auto">
        <CharacterRack />
      </div>
    </section>
  );
}
