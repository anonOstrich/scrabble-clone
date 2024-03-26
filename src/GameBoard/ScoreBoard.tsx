import { useAppSelector } from '../hooks/state-hooks';

export default function ScoreBoard() {
  const score = useAppSelector((state) => state.game.score);

  return (
    <div className="bg-cyan-700  py-4 px-2 min-w-[300px]">
      <h2 className="text-2xl flex-1">Score</h2>

      <ul className="text-left space-y-4  p-2   ">
        <li className="flex justify-between">
          Your Score: <span>{score}</span>
        </li>
        <li className="flex justify-between">
          Score without multipliers: <span>1</span>
        </li>
        <li className="flex justify-between">
          Number of words: <span>100</span>
        </li>
        <li className="flex justify-between">
          Average score per letter: <span>3</span>
        </li>
        <li className="flex justify-between">
          Something else interesing: <span>50</span>
        </li>
      </ul>
    </div>
  );
}
