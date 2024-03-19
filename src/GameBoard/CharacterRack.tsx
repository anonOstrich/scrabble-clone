import { addToRack, removeFromRack } from "../features/rack/rackSlice"
import { useAppDispatch, useAppSelector } from "../hooks/state-hooks"
import CharacterRackPiece from "./CharacterRackPiece"


export default function CharacterRack() {

    const characters = useAppSelector(state => state.rack.characters)
    const dispatch = useAppDispatch()


    function handleAddToRack() {
        console.log('adding...')
        dispatch(addToRack(['a', 'a', 's', 'i']))
    }

    function createRemoveHandler(index: number) {
        return () => {
            dispatch(removeFromRack({ indices: [index] }))
        }
    }


    return (
        <>
            <button onClick={handleAddToRack} className="border-2 border-black p-2">TEST: fill rack with something</button>
            <ul className="flex flex-wrap justify-center gap-2 bg-slate-400 py-2 rounded-md shadow-sm min-h-[40px]">
                {characters.map((character, idx) => (<li key={idx}>
                    <CharacterRackPiece character={character} removeCharacter={createRemoveHandler(idx)} />
                </li>))}
            </ul>
        </>
    )
}

