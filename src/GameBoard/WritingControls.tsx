import DebugButton from '../components/DebugButton';
import { PlacementDirection } from './GameBoard';

interface WritingControlsProps {
  setIsPlacing: (val: boolean) => void;
  isPlacing: boolean;
  direction: PlacementDirection;
  setDirection: (val: PlacementDirection) => void;
  directionCanBeChanged: boolean;
  enter: () => void;
  cancel: () => void;
}

export default function WritingControls({
  isPlacing,
  setIsPlacing,
  setDirection,
  direction,
  directionCanBeChanged,
  enter,
  cancel,
}: WritingControlsProps) {
  function handleClick() {
    setIsPlacing(!isPlacing);
  }

  return (
    <div>
      <h3>Writing controls</h3>
      {isPlacing ? (
        <div>
          <DebugButton handleClick={cancel} type="danger">
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
          <DebugButton handleClick={enter} type="success">
            Confirm placement
          </DebugButton>
        </div>
      ) : (
        <DebugButton handleClick={handleClick}>Start Placing</DebugButton>
      )}
    </div>
  );
}
