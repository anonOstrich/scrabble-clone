
export default function GameInformationSummary() {

    return <div className="bg-cyan-700 p-2 space-y-3">
        <h2 className="text-2xl">Game State Information</h2>
        <ul className="space-y-3">
            <li><span className="block border-2 border-black p-2 bg-green-800">Your turn</span></li>
            <li><SackPlayerSummary /></li>
            <li><PieceValues /></li>
        </ul>
    </div>
}

function SackPlayerSummary() {
    return <div className="flex flex-col items-center border-2 border-black p-2">
        <FilledSack fraction={1} />
        <span>4 pieces remain in the sack</span>
    </div>
}


const testPieceInformation = [{ letter: 'a', totalNumber: 5 }, { letter: 'b', totalNumber: 3 }, { letter: 'c', totalNumber: 3 }, { letter: 'd', totalNumber: 3 }, { letter: 'e', totalNumber: 5 }, { letter: 'f', totalNumber: 3 }, { letter: 'g', totalNumber: 3 }, { letter: 'h', totalNumber: 3 }, { letter: 'i', totalNumber: 5 }, { letter: 'j', totalNumber: 3 }, { letter: 'k', totalNumber: 3 }, { letter: 'l', totalNumber: 3 }, { letter: 'm', totalNumber: 3 }, { letter: 'n', totalNumber: 3 }, { letter: 'o', totalNumber: 3 }, { letter: 'p', totalNumber: 3 }, { letter: 'q', totalNumber: 3 }, { letter: 'r', totalNumber: 3 }, { letter: 's', totalNumber: 3 }, { letter: 't', totalNumber: 3 }, { letter: 'u', totalNumber: 3 }, { letter: 'v', totalNumber: 3 }, { letter: 'w', totalNumber: 3 }, { letter: 'x', totalNumber: 3 }, { letter: 'y', totalNumber: 3 }, { letter: 'z', totalNumber: 3 }]

function PieceValues() {
    return <div className="grid border-2 grid-cols-5 border-black p-2">
        {
            testPieceInformation.map(({ letter, totalNumber }) => (<span key={letter}>{letter}-{totalNumber}</span>))
        }
    </div>
}


interface FilledSackProps {
    fraction: number
}
function FilledSack({ fraction }: FilledSackProps) {
    const legalFraction = Math.min(1, Math.max(0, fraction))
    const percentage = Math.floor((1 - legalFraction) * 100)

    return <div className="border-2 border-purple-700  w-[40px] h-[40px] rounded-b-lg border-t-0 overflow-hidden relative z-10">
        <div className="w-[40px] h-[40px] bg-red-200 absolute transition-all" style={{
            top: `${percentage}%`
        }}></div>
    </div>
}