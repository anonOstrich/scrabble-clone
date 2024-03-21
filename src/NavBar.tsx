

export default function NavBar() {
    return (
        <nav className="bg-amber-700 min-h-20 flex items-center justify-between px-4 border-b-black border-b-8">
            <h1 className="text-4xl font-bold">Fake Scrabble</h1>
            <a href="https://www.scrabblepages.com/scrabble/rules/" target="blank"
                className="border-black border-2 px-4 py-2  hover:bg-amber-500 rounded-sm"
            >
                How to play?
            </a>
        </nav>
    )
}