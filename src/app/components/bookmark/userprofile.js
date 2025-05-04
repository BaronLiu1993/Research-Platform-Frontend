import { Badge } from "@/shadcomponents/ui/badge"

import { Mail } from "lucide-react"

import { Calendar } from "lucide-react"

import { UserPen } from "lucide-react"

import { Heart } from "lucide-react"

export default function UserProfile ({profile_data}) {
    return (
        <>
        <div className="space-y-4 font-sans">
          <div className="flex flex-col justify-center items-center mt-5">
            <h1 className="font-sans text-2xl font-medium">
              Welcome, <span className="text-green-400">{profile_data.student_firstname} {profile_data.student_lastname}</span>
            </h1>
            <p className="font-sans text-sm">
              Track Your Applications
            </p>
          </div>
          <div className = "space-y-3 border-1 w-fit h-fit p-6 rounded-md">
            {/*Personal Profile Information*/}
            <div className = "rounded-md w-fit mx-10 flex">
                <span className = "text-sm flex space-x-2 items-center text-gray-500 w-[10rem]">
                    <UserPen className = "h-7 w-7 border-1 p-1 rounded-md text-black"/>
                    <h1>Name</h1>
                </span>
                <Badge className = "font-sans text-green-800 bg-green-200  text-xs">{profile_data.student_firstname} {profile_data.student_lastname}</Badge>
            </div>
            <div className = "rounded-md w-fit mx-10 flex">
                <span className = "text-sm flex space-x-2 items-center text-gray-500 w-[10rem]">
                    <Mail className = "h-7 w-7 border-1 p-1 rounded-md text-black"/>
                    <h1>Email</h1>
                </span>
                <Badge className = "font-sans text-xs text-blue-800 bg-blue-200">{profile_data.student_major} </Badge>
            </div>
            <div className = "rounded-md w-fit mx-10 flex">
                <span className = "text-sm flex space-x-2 items-center text-gray-500 w-[10rem]">
                    <Calendar className = "h-7 w-7 border-1 p-1 rounded-md text-black"/>
                    <h1>Year</h1>
                </span>
                <Badge className = "font-sans text-pink-800 bg-pink-200 text-xs">{profile_data.student_year} </Badge>
            </div>
            <div className = "rounded-md w-fit mx-10 flex">
                <span className = "text-sm flex space-x-2 items-center text-gray-500 w-[10rem]">
                    <Heart className = "h-7 w-7 border-1 p-1 rounded-md text-black"/>
                    <h1>Research Interests</h1>
                </span>
                <div className = "flex space-x-2">
                    {profile_data.student_interests.map((interests, index) => (
                        <Badge key = {index} className = "font-sans bg-gray-200 text-black text-xs">{interests} </Badge>
                    ))}
                </div>
            </div>
        </div> 
      </div>
        </>
    )
}