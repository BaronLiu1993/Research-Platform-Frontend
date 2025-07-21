export default function resumehomecomponent () {
    return (
        <>
                    <div className = "flex items-start justify-center space-x-10 p-10 w-[50rem] select-none">
                        <div className = 'flex flex-col'>
                            
                            <div className = "mt-2">
                                <h1 className = "text-sm font-bold border-b-2 p-1 font-sans">
                                    PROFESSOR INFORMATION
                                </h1>

                                <div className = "rounded-2xl">
                                    <div className = "text-sm font-sans font-semibold my-2 items-center space-x-2 flex items bg-green-200 w-fit rounded-2xl p-1 border-gray-200">
                                        <div className = "bg-green-500 h-2 w-2 rounded-full"></div>
                                        <p className = "text-xs font-sans font-medium">Professor Keywords</p>
                                    </div>
                                    <div className = "border-gray-200 p-2 font-sans text-xs h-20 w-40 rounded-md border-1">
                                        <p>Machine Learning</p>
                                        <p>Natural Language</p>
                                        <p>Music</p>
                                    </div>
                                </div>
        
                                <div className = "text-sm my-2 font-sans font-semibold items-center space-x-2 flex items bg-red-200 w-fit rounded-2xl p-1 border-gray-200">
                                        <div className = "bg-red-500 h-2 w-2 rounded-full"></div>
                                        <p className = "text-xs font-sans font-medium">Feedback</p>
                                    </div>
                                    <div className = "border-gray-200 p-2 font-sans text-xs h-20 w-40 rounded-md border-1">
                                        <p>Reformat for Readability</p>
                                        <p>Missing Words Keywords</p>
                                        <p>Experiences</p>
                                    </div>
                                </div>
                                
                        <div>
                                <button className = "mt-5 font-extralight cursor-pointer text-white bg-blue-500 rounded-sm text-xs px-2 font-sans">
                                    Change with AI
                                </button>
                            </div>
                        </div>
        
                        <div className = "h-[20rem] border-1 rounded-md flex flex-col">
                            <div className = "bg-slate-100 flex flex-col items-center rounded-md h-[2rem] w-[20rem] m-2">
                                
                            </div>
                        </div>
                    </div>
                    
                </>
    )
} 