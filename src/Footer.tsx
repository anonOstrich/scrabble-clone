

export default function Footer() {
    return (
        <footer className="bg-gray-700 p-4 text-center">
            <ul className="flex justify-between align-center mt-2">
                <li className="text-2xl">Frontend hobby project</li>
                <li><a href="https://github.com/anonOstrich/scrabble-clone" target="blank"
                    className="border-2 border-amber-800  p-2 rounded-lg shadow-lg hover:bg-amber-700 focus:bg-amber-700"
                >Source code on GitHub</a></li>
            </ul>
        </footer>
    )
}