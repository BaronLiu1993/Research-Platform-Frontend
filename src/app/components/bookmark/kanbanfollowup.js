import Link from "next/link"

import { X } from "lucide-react"
import { Calendar } from "lucide-react"
import { Badge } from "@/shadcomponents/ui/badge"
import { Wrench } from "lucide-react"
import { EllipsisVertical } from "lucide-react";
import { PencilLine } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/shadcomponents/ui/dropdown-menu"

export default async function KanbanCardInCompleted ({ title, url, school, faculty, department, research_interests, date}) {
    return (
        <>
            
            {/* Cards Start Here */}
            <div>
                <div className="border-1 rounded-md bg-white m-2 p-2 font-sans w-[15rem]">
                    <div className = "flex justify-between p-1">
                        <h1 className = "text-xs font-extralight border-b-1 pb-1">{faculty}</h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger className = "rounded-md">
                                <EllipsisVertical className = "h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer"/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className = "">
                                    <X />
                                    <span className = "font-sans h-4 font-semibold">Delete</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className = "">
                                    <PencilLine />
                                    <span className = "font-sans h-4 font-semibold">Edit</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className = "py-2">
                        <h1 className="font-sans text-sm font-bold text-gray-800">
                            {title} 
                            <span className = "font-light px-2 text-xs">{school}</span>
                        </h1>
                        <p className="font-sans text-sm font-semibold text-gray-500">{research_interests}</p>
                    </div>
                    <p className="text-xs font-light flex items-center space-x-2">
                        <Wrench className = "h-6 w-6 p-1 text-black"/>
                        <span>{department}</span>
                    </p>
                    <p className ="text-xs font-light flex items-center space-x-2">
                        <Calendar className = "h-6 w-6 p-1"/>
                        <span>{date}</span>
                    </p>
                    <p className = "text-sm my-2 space-x-2">
                        <Badge className = "bg-sky-400 cursor-pointer">
                            Resume
                        </Badge>
                        <Link href = {url}>
                            <Badge className = "bg-purple-400 cursor-pointer">
                                View Professor
                            </Badge>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}