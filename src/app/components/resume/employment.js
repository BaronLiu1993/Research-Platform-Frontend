import EmploymentForm from "./employmentform"

export default function employment ({}) {
    //Pass prop here and the amount of boxes is the amount of experience
    return (
        <>
            <div className = "border-1 rounded-md border-gray-400 p-8 space-y-5">
                <div>
                    <h1 className = "font-sans text-md font-semibold">Employment History</h1>
                    <p className = "text-gray-400 font-sans text-sm font-light">Show employers your past experience and what you have accomplished. Include simple, <br />clear examples with action verbs to demonstrate your skills.</p>
                </div>
                <div>
                    <EmploymentForm />
                </div>
                <div>
                    <button className = "rounded-md w-full bg-blue-500 p-2 text-white font-sans font-extralight">Add More +</button>
                </div>
            </div>
        </>
    )
}