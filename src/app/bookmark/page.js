import Kanban from "../components/kanban"

export default function bookmark () {
    return (
        <>
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
                            🔒 https://www.yourlieinapril.com
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
                                <Kanban title = {"Irene Park"} description={"Material Science Engineering"}/>
                                <Kanban title = {"Jung Che"} description={"Molecular Biology"}/>
                                <Kanban title = {"Kairu Liu"} description={"Philosophy"}/>
                                <Kanban title = {"Jay Patel"} description={"Engineering Science"}/>
                                <Kanban title = {"Jerry Liu"} description={"Consulting"}/>
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
                                <Kanban title = {"Ethan Teh"} description={"Medicine"}/>
                                <Kanban title = {"Jaiden Parthenon"} description={"Management"}/>
                                <Kanban title = {"Deng Yang Qing"} description={"User Experience"}/>
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
                                <Kanban title = {"Chen Jie Yong"} description={"Material Science Engineering"}/>
                              </div>
                        </div>
                      </div>
            </div>
        </>
    )
}