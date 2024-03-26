import DebugButton from '../components/DebugButton';
import { PlacementDirection } from './GameBoard';

interface WritingControlsProps {
  setIsPlacing: (val: boolean) => void;
  isPlacing: boolean;
  direction: PlacementDirection;
  setDirection: (val: PlacementDirection) => void;
  directionCanBeChanged: boolean;
}

export default function WritingControls({
  isPlacing,
  setIsPlacing,
  setDirection,
  direction,
  directionCanBeChanged,
}: WritingControlsProps) {
  function handleClick() {
    setIsPlacing(!isPlacing);
  }

  return (
    <div>
      <h3>Writing controls</h3>
      {isPlacing ? (
        <div>
          <DebugButton handleClick={handleClick} type="danger">
            Stop Placing
          </DebugButton>
          <DebugButton
            handleClick={() => {
              setDirection(direction === 'horizontal' ? 'vertical' : 'horizontal');
            }}
            type="neutral"
            disabled={!directionCanBeChanged}
          >
            Change direction
          </DebugButton>
          <DebugButton
            handleClick={() => {
              console.log('confirm placement');
            }}
            type="success"
          >
            Confirm placement
          </DebugButton>
        </div>
      ) : (
        <DebugButton handleClick={handleClick}>Start Placing</DebugButton>
      )}
    </div>
  );
}
