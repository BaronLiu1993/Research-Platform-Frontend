export default function card () {
    return (
        <>
            <div className=" w-[20rem] h-[15rem] justify-center flex flex-col p-5 rounded-md 
                        transition border bg-white border-gray-300 shadow-md">
                        <h1 className="font-sans font-semibold text-xl">Meeting Notes</h1>
                        <div className="flex space-x-2 font-sans mb-2">
                            <p className="bg-green-200 p-0.5 font-extralight rounded-md">Machine Learning</p>
                            <p className="bg-purple-200 p-0.5 font-extralight rounded-md">Psychology</p>
                        </div>
                        <h2 className="font-sans">Connect people & projects with updates & actionable items</h2>
                        <h2 className="font-sans text-blue-400 mt-4">Connect Now ➝</h2>
            </div>
        </>
    )
}