import Navbar from "./components/navbar";
import Homecard from "./components/homecard";
import HomeKanban from "./components/homekanban";
import Link from "next/link";
import Resumehomecomponent from "./homepagecomponents/resumehomecomponent";
import Emailhomecomponent from "./homepagecomponents/emailhomepage";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <div>
          <Navbar />
          <div className = "flex flex-col justify-center items-center my-30 m-5">
            <h1 className = "font-sans font-extrabold text-6xl">
              <span>Write, Plan, Share <br /> with AI at your Side</span> 
            </h1>
            <h2 className = "font-sans text-[rgb(109,171,225)] my-1">Notion is the connected workspace where better, faster work happens</h2>
            <div className = "my-4">
            <Link href="/register">
              <button className="font-sans font-medium mx-2 text-sm bg-black text-white p-1 px-2 rounded-md">
                Sign Up
              </button>
            </Link>
              <button className = "text-black font-sans">
                Check Out Our Features
              </button>
            </div>
          </div>
          {/*Research Areas Section Starts Here*/}
          <div className = "m-10">
            <h1 className = "font-sans font-medium text-[#5B61B2] p-2 rounded-md bg-slate-100">RESEARCH AREAS</h1>
            <h2 className = "b-[#5B61B2] border-b-2 w-fit font-sans font-medium p-1">📝 Modules</h2>
            <p className = "mt-2 font-sans text-sm font-light text-gray-800">Find a list of professors that research various disciplines ranging from Molecular Biology to Machine Learning and AI at UofT!</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 m-5 gap-2">
              <Homecard title="Molecular and Cell Biology" description="Discover Now ➡️" hexcode="#bbf7d0" />
              <Homecard title="Machine Learning and AI" description="Discover Now ➡️" hexcode="#bfdbfe" />
              <Homecard title="Macroeconomics" description="Discover Now ➡️" hexcode="#fef08a" />
              <Homecard title="Biomedical Engineering" description="Discover Now ➡️" hexcode="#fecaca" />
              <Homecard title="Thermofluids" description="Discover Now ➡️" hexcode="#e9d5ff" />
              <Homecard title="Organic Chemistry" description="Discover Now ➡️" hexcode="#c7d2fe" />
            </div>
        </div>


        {/*Introducting The Features Starts Here*/}

        <div className = "m-10">
            <h1 className = "font-sans font-medium text-[#2F80E4] p-2 rounded-md bg-slate-100">FEATURES</h1>
            <h2 className = "b-[#5B61B2] border-b-2 w-fit font-sans font-medium p-1">📝 Modules</h2>
            <p className = "my-2 font-sans text-sm font-light text-gray-800">Find the Perfect Research Match. Instantly Tailor Your Resume & Craft Personalized Outreach Emails — All in One Place.</p>
            <div className = "flex justify-center items-center">
              <div className = 'flex'>
                {/*Starts Here*/}
                <div>
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
                                  <Resumehomecomponent />
                          </div>
                        </div>
                      <div className = "bg-violet-100 rounded-md m-5 p-5">
                        <div className = "flex items-center space-x-2 my-2 bg-purple-300 w-fit p-1 rounded-4xl">
                          <div className = "bg-purple-600 h-2 w-2 rounded-full"></div>
                          <h1 className = "text-xs font-sans font-medium">In Progress</h1>
                        </div>
                        <h1 className = "font-sans text-xl font-medium">Powered by AI, Edit, Reformat and Fix Your Resume</h1>
                        <ul className = "font-sans mt-5 font-light">
                            <li>🧠 Tailor your Resume with Keywords</li>
                            <li>🧾Get Specific Feedback on Your Resume for Each Lab</li>
                            <li>📄 Build Beautiful Resumes with LaTeX without Knowing LateX</li>
                        </ul>
                      </div>
              </div>
              
            </div>
              <div className = "flex justify-center mt-10 items-center">
                <div className = 'flex'>
                <div className = "bg-green-100 rounded-md m-5 p-5">
                          <div className = "flex items-center space-x-2 my-2 bg-green-300 w-fit p-1 rounded-4xl">
                            <div className = "bg-green-600 h-2 w-2 rounded-full"></div>
                            <h1 className = "text-xs font-sans font-medium">In Progress</h1>
                          </div>
                          <h1 className = "font-sans text-xl font-medium">Powered by AI, Edit, Reformat and Fix Your Resume</h1>
                          <ul>
                            <li></li>
                          </ul>
                        </div>
                {/*Starts Here*/}
                <div>
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
                                  <Emailhomecomponent />
                          </div>
                        </div>
              </div>
          </div>
        </div>
        {/*Introducing The Bookmark Starts Here*/}
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
        
      </div>
      
    </>
    
  );
}
