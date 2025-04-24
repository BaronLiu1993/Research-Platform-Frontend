import WordProcessor from "@/app/api/wordprocessor"

export default function projects ({}) {
    //Pass prop here and the amount of boxes is the amount of experience
    return (
        <>
            <div>
                <h1>Employment History</h1>
                <p>Show employers your past experience and what you have accomplished</p>
                <div className = "w-full h-full border-1 rounded-md flex flex-col">
                    <div>
                        <div className = "flex flex-col">
                            <label className = "font-sans text-xs font-semibold">Project Title</label>
                            <input  className = "p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[10rem]">
                            </input>
                        </div>
                        <div className = "flex flex-col">
                            <label className = "font-sans text-xs font-semibold">Awards</label>
                            <input  className = "p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[10rem]">
                            </input>
                        </div>
                        <label>Company</label>
                        <input />
                        <div>
                            <label>Start Date</label>
                            <input />
                            <label>End Date</label>
                            <input />
                        </div>
                        <label>Location</label>
                        <input />
                    </div>
                    <WordProcessor className = "w-full h-full"/>
                </div>
            </div>
        </>
    )
}