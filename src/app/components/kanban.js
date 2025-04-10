export default function kanban ({title, description}) {
    return (
         <>
             {/* Cards Start Here */}
             <div className="border border-gray-300 rounded-md w-[10rem] h-[5rem] overflow-hidden">
                 <div className="p-2">
                     <h1 className="font-sans text-sm font-medium text-gray-800">
                     {title}
                     </h1>
                     <p className = "font-sans text-xs font-light text-gray-800">
                     {description}
                     </p>
                 </div>
            </div>
         </>
    )
 }