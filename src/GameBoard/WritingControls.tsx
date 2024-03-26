import DebugButton from '../components/DebugButton';
import WritingControls from './WritingControls';

interface WritingControlsProps {
  setIsPlacing: (val: boolean) => void;
  isPlacing: boolean;
}

export default function WritingControls({ isPlacing, setIsPlacing }: WritingControlsProps) {
  function handleClick() {
    setIsPlacing(!isPlacing);
  }

  return (
    <div>
      <h3>Writing controls</h3>
      {isPlacing ? (
        <DebugButton handleClick={handleClick}>Stop Placing</DebugButton>
      ) : (
        <DebugButton handleClick={handleClick}>Start Placing</DebugButton>
      )}
    </div>
  );
}
