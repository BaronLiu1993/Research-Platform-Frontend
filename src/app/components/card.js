export default function Card({ name, url, researchInterests, onUrlSelect}) {
    const handleCardClick = () => {
        onUrlSelect(url)
    }

    return (
        <div className="w-[20rem] h-[15rem] justify-center flex flex-col p-5 rounded-md transition border bg-white border-gray-300 shadow-md">
            <h1 className="font-sans font-semibold text-xl">{name}</h1>
            <div className="flex space-x-2 font-sans mb-2">
                <p className="bg-green-200 p-0.5 font-extralight rounded-md">{researchInterests}</p>
            </div>
            <h2 className="font-sans">Connect people & projects with updates & actionable items</h2>
            <button
                onClick = {handleCardClick}
                className="font-sans text-blue-400 mt-4 cursor-pointer w-fit">
                    Connect Now ➝
            </button>
        </div>
    );
}