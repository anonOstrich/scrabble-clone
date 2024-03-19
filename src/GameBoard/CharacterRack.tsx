import CharacterRackPiece from "./CharacterRackPiece"


export default function CharacterRack() {
    // In this case the items may be moved, and they may have the same data -- some work with indexing is needed!
    const testCharacters = [{ character: 'a', id: 1 },
    { character: 'b', id: 2 },
    { character: 'c', id: 3 },
    { character: 'd', id: 4 },
    { character: 'e', id: 5 },
    { character: 'f', id: 6 },
    { character: 'g', id: 7 },]
    return (
        <ul className="flex flex-wrap justify-center gap-2 bg-slate-400 py-2 rounded-md shadow-sm ">
            {testCharacters.map(({ character, id }) => (<li key={id}>
                <CharacterRackPiece character={character} />
            </li>))}
        </ul>
    )
}

