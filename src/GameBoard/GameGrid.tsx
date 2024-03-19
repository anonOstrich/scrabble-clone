import GameSquare from "./GameSquare"

const SIDE_LENGTH = 15
export default // Stateful, smart. Controlled by parent.
    function GameSquares() {
    const dummyArray = Array(SIDE_LENGTH * SIDE_LENGTH).fill(null)

    return (<div className="grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-1 bg-violet-700 border-[0.5rem] border-violet-700 w-[600px] h-[600px]">
        {
            dummyArray.map((_, index) => {
                return <GameSquare key={index} />
            })
        }
    </div>)
}
