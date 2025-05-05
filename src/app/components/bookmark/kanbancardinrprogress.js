import { X } from "lucide-react"
import { Calendar } from "lucide-react"
import { Badge } from "@/shadcomponents/ui/badge"

export default function KanbanCardInProgress ({ title, description, id, column }) {
    return (
        <>
            {/* Cards Start Here */}
            <div>
                <div className="border-1 rounded-md bg-white m-2 p-2 font-sans w-[15rem]">
                    <div className = "flex justify-end p-1">
                        <button>
                            <X className = "h-4 w-4 text-red-500 hover:text-red-900" />
                        </button>
                    </div>
                    <h1 className="font-sans text-sm font-medium text-gray-800">
                        {title}
                    </h1>
                    <p className="font-sans text-sm text-gray-500">{description}</p>

                    <p className ="text-xs font-light flex items-center">
                        <Calendar className = "h-6 w-6 p-1"/>
                        <span> July 26 2006</span>
                    </p>
                    <p className = "text-sm my-2 space-x-2">
                        <Badge className = "bg-sky-400 cursor-pointer">
                            Resume
                        </Badge>
                        <Badge className = "bg-red-400 cursor-pointer">
                            View Page
                        </Badge>
                    </p>
                    
                </div>
            </div>
        </>
    )
}