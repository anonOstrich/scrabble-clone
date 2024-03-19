import CharacterRack from "./CharacterRack";
import GameGrid from "./GameGrid";




export default function GameBoard() {
    return (
        <section className="bg-cyan-700">
            <h2 className="text-2xl">Game Board</h2>
            <div className="m-8">
                <GameGrid />
            </div>

            <div className="max-w-[450px] mx-auto">
                <CharacterRack />
            </div>
        </section>
    )
}
