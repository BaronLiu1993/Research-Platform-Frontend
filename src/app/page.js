import Homecard from "./homepagecomponents/homecard";
import Link from "next/link";
import Resumehomecomponent from "./homepagecomponents/resumehomecomponent";
import Emailhomecomponent from "./homepagecomponents/emailhomepage";
import Footer from "./components/miscellaneous/footer";
import KanbanHomepage from "./homepagecomponents/kanbanhomepage";
import ResearchAreas from "./homepagecomponents/researchareas";

export default function Home() {
  return (
    <>
      <div>
          <div className = "flex flex-col justify-center items-center my-30 m-5">
            <h1 className = "font-sans font-bold text-6xl">
              <span className = "font-sans">Connecting University of Toronto <br /> Students with Researchers </span> 
            </h1>
            <div className = "my-4">
            <Link href="/register">
              <button className="font-sans font-medium mx-2 text-sm bg-black text-white p-1 px-2 rounded-md">
                Check it Out!
              </button>
            </Link>
              <button className = "text-black font-sans">
                Explore a Catalogue of 800+ Professors
              </button>
            </div>
          </div>
          {/*Research Areas Section Starts Here*/}
        <ResearchAreas />
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
        <KanbanHomepage />
        
      </div>
      
    </>
    
  );
}
