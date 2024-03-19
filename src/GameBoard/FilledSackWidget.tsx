
interface FilledSackWidgetProps {
    fraction: number
}
export default function FilledSackWidget({ fraction }: FilledSackWidgetProps) {
    const legalFraction = Math.min(1, Math.max(0, fraction))
    const percentage = Math.floor((1 - legalFraction) * 100)

    return <div className="border-2 border-purple-700  w-[40px] h-[40px] rounded-b-lg border-t-0 overflow-hidden relative z-10">
        <div className="w-[40px] h-[40px] bg-red-200 absolute transition-all" style={{
            top: `${percentage}%`
        }}></div>
    </div>
}