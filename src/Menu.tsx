



export default function Menu() {

    const buttonsInfo = [{
        text: "Play (solo)",
        action: "playSolo"
    },
    {
        text: "Reset Board",
        action: "resetBoard"
    }, {
        text: "Settings",
        action: "openSettings"
    },
    { text: "Get motivated", action: "giveMotivationalLink" }]

    return (
        <section className="bg-cyan-700 px-4 py-2 space-y-4">
            <h2 className="text-2xl">Options</h2>
            <ul className="space-y-2 flex flex-col items-stretch">
                {
                    buttonsInfo.map((button, index) => {
                        return <li key={index}>
                            <button
                                className="px-4 py-2 border-2 border-black w-full
                                bg-cyan-800
                                hover:bg-inherit
                                focus:bg-inherit transition-colors"
                                onClick={() => { console.log('executing event', button.action) }}>{button.text}</button>
                        </li>
                    })
                }

            </ul>
        </section>
    )
}