import ProjectForm from "./projectform"
export default function projects ({}) {
    //Pass prop here and the amount of boxes is the amount of experience
    return (
        <>
            <div className = "border-1 rounded-md border-gray-400 p-8 space-y-5">
                <div>
                    <h1 className = "font-sans text-md font-semibold">Projects History</h1>
                    <p className = "text-gray-400 font-sans text-sm font-light">Show reseachers relevant course work <br />, volunteer work, leadership and extracurriculars</p>
                </div>
                <div>
                    <ProjectForm />
                </div>
                <div>
                    <button className = "rounded-md w-full bg-blue-500 p-2 text-white font-sans font-extralight">Add More +</button>
                </div>
            </div>
        </>
    )
}