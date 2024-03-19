import { useAppDispatch, useAppSelector } from "../hooks/state-hooks";
import { writeValue } from "../features/board/boardSlice";
import { isBoardSquareValue } from "../utils/types";


interface GameSquareProps {
    index: number
}

export default function GameSquare({ index }: GameSquareProps) {

    const character = useAppSelector(state => state.board.boardArrayOneDimensional[index])
    const dispatch = useAppDispatch();
    // console.log('character: ', character)
    const displayedCharacter = character ? character : ""

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newLetter = e.target.value.charAt(e.target.value.length - 1);
        console.log(newLetter.length)
        if (newLetter.length > 1) return;
        if (newLetter === character) return;
        if (newLetter.length > 0 && !newLetter.match(/[a-z]/i)) return;



        const letterToSave = newLetter.length === 0 ? null : newLetter

        if (!isBoardSquareValue(letterToSave)) return;
        dispatch(writeValue({
            index: { dimensionality: 'one', index: index },
            value: letterToSave
        }))
    }

    return (
        <input type="text"
            // If maxLength == 1, onChange won't trigger except for an empty input
            maxLength={2} className="bg-cyan-700 overflow-hidden
            capitalize text-2xl text-center" value={displayedCharacter} onChange={handleChange} />
    )
}

