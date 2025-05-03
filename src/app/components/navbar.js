import Image from "next/image";
import Placeholder from "../../../public/placeholder.png";




export default function navbar () {
    return (
        <>
            <header className="bg-gray-50 shadow-sm flex lg:static lg:overflow-y-visible">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                    <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                        <div className="flex-shrink-0 flex items-center">
                            <Image src={Placeholder} alt="Placeholder" width={100} height={100}/>
                        </div>
                        
                    </div>
                    
                    
                    
                    <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                        <a href="/login" className="ml-6 my-3 font-sans inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Login </a>
                        <a href="/register" className="ml-6 my-3 font-sans inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Sign Up </a>
                    </div>
                    </div>
                </div>

            </header>
        </>
    )
}