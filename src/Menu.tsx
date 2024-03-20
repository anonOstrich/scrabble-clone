import { useState } from "react"


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

export default function Menu() {

    // Only relevant on smaller screens -- otherwise it's always open



    return (<div className="relative bg-cyan-700 px-2 lg:p-0">
        <SmallScreenComponent />
        <section className=" px-4 py-2 space-y-4 hidden lg:block">
            <SettingsSharedComponent buttonsInfo={buttonsInfo} />
        </section>
    </div>
    )
}


function SmallScreenComponent() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    return (<div className="lg:hidden text-left lg:px-2 bottom-[-10px] left-[10px]" style={{
        position: isSettingsOpen ? "unset" : "absolute",
        padding: isSettingsOpen ? "1rem" : "0",
    }}>
        <button type="button" className="border-2 border-black p-2 rounded-lg absolute top-[5px] left-[5px]" onClick={() => {
            setIsSettingsOpen(state => !state)
        }}
            style={{
                top: !isSettingsOpen ? "unset" : "5px",
                left: !isSettingsOpen ? "unset" : "5px",
            }}

        >{isSettingsOpen ? "Close" : "Settings"}</button>
        {
            isSettingsOpen && (<SettingsSharedComponent buttonsInfo={buttonsInfo} />)
        }
    </div>)
}

interface SettingsSharedComponentProps {
    buttonsInfo: { text: string, action: string }[]

}
function SettingsSharedComponent({ buttonsInfo }: SettingsSharedComponentProps) {
    return (<>
        <h2 className="text-center lg:text-left text-2xl mb-3">Options</h2>
        <ul className="gap-2 flex lg:flex-col justify-center items-stretch">
            {
                buttonsInfo.map((button, index) => {
                    return <li key={index}>
                        <button
                            className="px-4 py-2 border-2 border-black w-full h-full
                                bg-cyan-800
                                hover:bg-inherit
                                focus:bg-inherit transition-colors"
                            onClick={() => { console.log('executing event', button.action) }}>{button.text}</button>
                    </li>
                })
            }

        </ul></>
    )
}