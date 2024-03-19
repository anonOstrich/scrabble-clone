
interface CharacterHandPieceProps {
    character: string,
    removeCharacter: () => void
}

export default function CharacterRackPiece({ character, removeCharacter }: CharacterHandPieceProps) {

    return (<div className="border-2 border-black
     w-[40px] h-[40px] flex justify-center items-center bg-slate-300 text-black text-xl font-semibold shadow-lg"
        onDragEnd={removeCharacter}
    >{character}</div>)
}