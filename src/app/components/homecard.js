export default function homecard ({title, description, hexcode}) {
   return (
        <>
            {/* Cards Start Here */}
            <div className="border border-gray-300 rounded-md h-[11rem] w-[15rem] overflow-hidden">
                <div className="w-full h-[6rem]" style={{ backgroundColor: hexcode }}></div>
                {/* Bottom section */}
                <div className="p-2">
                    <h1 className="font-sans text-sm font-medium text-gray-800">
                    {title}
                    </h1>
                    <a href = "" className = "font-sans text-xs font-light text-gray-800">
                        {description}
                    </a>
                </div>
                </div>
        </>
   )
}