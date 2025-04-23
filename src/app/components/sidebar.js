import SearchBar from "./searchbar"

export default function sidebar () {
    return (
        <>
            <div >
                <div className = "mt-5 w-full p-4 rounded-md overflow-auto">
                    <h2 className = "text-sm font-sans font-medium p-1 bg-amber-200 rounded">Browse our Catalog</h2>
                    <SearchBar />
                    <button className = " p-1 font-sans text-xs bg-blue-500 rounded-md text-blue-200">
                        Apply Queries
                    </button>
                    <div>
                    <ol className="mt-3 font-sans text-sm w-fit max-w-[10rem] break-words">
                        <li>1. Type in your desired research area</li>
                        <li>2. Discover professors that pertain to such Research Areas</li>
                    </ol>
                    
                </div>
            </div> 
        </div>
        </>
    )
}