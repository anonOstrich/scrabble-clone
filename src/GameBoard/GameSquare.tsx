import { useState } from "react";


export default function GameSquare() {
    const [letter, setLetter] = useState<string | null>(null)

    const displayedLetter = letter ? letter : ""

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newLetter = e.target.value.charAt(e.target.value.length - 1);
        console.log(newLetter.length)
        if (newLetter.length > 1) return;
        if (newLetter === letter) return;
        if (newLetter.length > 0 && !newLetter.match(/[a-z]/i)) return;

        const letterToSave = newLetter.length === 0 ? null : newLetter
        setLetter(letterToSave)
    }

    return (
        <input type="text"
            // If maxLength == 1, onChange won't trigger except for an empty input
            maxLength={2} className="bg-cyan-700 overflow-hidden
            capitalize text-2xl text-center" value={displayedLetter} onChange={handleChange} />
    )
}