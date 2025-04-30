import HomeKanban from "./homekanban"

export default function KanbanHomepage () {
    return (
        <>
           <div className = "m-10">
                       <h1 className = "font-sans font-medium text-red-400 p-2 rounded-md bg-slate-100">BOOKMARK</h1>
                       <h2 className = "b-[#5B61B2] border-b-2 w-fit font-sans font-medium p-1">📝 Modules</h2>
                       <p className = "mt-2 mb-5 font-sans text-sm font-light text-gray-800">Track your research applications, manage follow-ups, and stay organized — all from one intuitive student dashboard.</p>
                       
                       
                       {/*Kanban Main Section This is the Whole Box the Div Under*/}
                       <div className = "border-1 rounded-md border-gray-300 select-none">
                         {/* Navbar Container */}
                         <div className="bg-gray-200 flex items-center justify-between px-4 py-2">
                           {/* Left Section: macOS Window Controls */}
                           <div className="flex space-x-2">
                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                           </div>
           
                           {/* Right Section: Search Bar that Expands */}
                           <div className="flex-grow mx-4">
                             <div className="bg-gray-100 rounded-full font-sans font-extralight text-sm py-1 px-3 text-center">
                               google.com
                             </div>
                           </div>
                         </div>
           
                       <div className = "flex flex-col justify-center items-center mt-5">
                         <h1 className = "font-sans text-2xl font-medium">Welcome, <span className = "text-green-400">Min Jeong!</span></h1>
                         <p className = "font-sans text-sm">Resume where you left off! Keep applying! You got this!</p>
                       </div>
                       <div className = 'flex justify-center space-x-2.5 p-2'>
                         
                          {/*First Kanban Starts Here*/}
                           <div>
                               <div>
                                 <div className = "flex items-center space-x-2 my-2  bg-red-300 w-fit p-1 rounded-4xl">
                                   <div className = "bg-red-600 h-2 w-2 rounded-full"></div>
                                   <h1 className = "text-xs font-sans font-medium">Not Started</h1>
                                 </div>
                                 <div className = "space-y-2">
                                   <HomeKanban title = {"Irene Park"} description={"Material Science Engineering"}/>
                                   <HomeKanban title = {"Jung Che"} description={"Molecular Biology"}/>
                                   <HomeKanban title = {"Kairu Liu"} description={"Philosophy"}/>
                                   <HomeKanban title = {"Jay Patel"} description={"Engineering Science"}/>
                                   <HomeKanban title = {"Jerry Liu"} description={"Consulting"}/>
                                 </div>
                               </div>                    
                           </div>
                           <div>
                           {/*Second Kanban Starts Here*/}
                           <div>
                                 <div className = "flex items-center space-x-2 my-2  bg-yellow-200 w-fit p-1 rounded-4xl">
                                   <div className = "bg-yellow-600 h-2 w-2 rounded-full"></div>
                                   <h1 className = "text-xs font-sans font-medium">In Progress</h1>
                                 </div>
                                 <div className = "space-y-2">
                                   <HomeKanban title = {"Ethan Teh"} description={"Medicine"}/>
                                   <HomeKanban title = {"Jaiden Parthenon"} description={"Management"}/>
                                   <HomeKanban title = {"Deng Yang Qing"} description={"User Experience"}/>
                                 </div>
                             </div>
                           </div>
                           <div>
                             {/*Third Kanban starts here*/}
                             <div className = "flex items-center space-x-2 my-2  bg-green-200 w-fit p-1 rounded-4xl">
                                   <div className = "bg-green-500 h-2 w-2 rounded-full"></div>
                                   <h1 className = "text-xs font-sans font-medium">Completed!</h1>
                                 </div>
                                 <div className = "space-y-2">
                                   <HomeKanban title = {"Chen Jie Yong"} description={"Material Science Engineering"}/>
                                 </div>
                           </div>
                           <div>
                             {/*Third Kanban starts here*/}
                             <div className = "flex items-center space-x-2 my-2  bg-purple-200 w-fit p-1 rounded-4xl">
                                   <div className = "bg-purple-500 h-2 w-2 rounded-full"></div>
                                   <h1 className = "text-xs font-sans font-medium">Follow Up?</h1>
                                 </div>
                                 <div className = "space-y-2">
                                   <HomeKanban title = {"Ammy Hirano"} description={"Financial Management"}/>
                                   <HomeKanban title = {"Rijaaze Sasikumar"} description={"Hardware Engineering"}/>
                                   <HomeKanban title = {"Jack Chai"} description={"Investment Banking"}/>
                                 </div>
                           </div>
                         </div>
                       </div>
                   </div> 
        </>
    )
}