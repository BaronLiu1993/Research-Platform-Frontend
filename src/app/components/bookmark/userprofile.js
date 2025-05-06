import { Badge } from "@/shadcomponents/ui/badge";

import { Mail } from "lucide-react";

import { Calendar } from "lucide-react";

import { UserPen } from "lucide-react";

import { Heart } from "lucide-react";

import Sidebar from "../sidebar";

export default async function UserProfile({ studentData }) {
  return (
    <div className="font-sans text-xs bg-gray-100 rounded-md w-[12rem]">
      <div className="flex justify-center text-lg font-sans p-2 font-semibold">
        <h1>User Profile</h1>
      </div>
      <div className="h-fit rounded-md">
        {/* Name */}
        <div className="rounded-md w-fit mx-2 flex items-center mb-2">
          <Badge className="bg-green-200 text-green-800 text-xs px-2 py-1">
            <Mail />
            <span>
              {" "}
              {studentData.student_firstname} {studentData.student_lastname}{" "}
            </span>
          </Badge>
        </div>

        {/* Email */}
        <div className="rounded-md w-fit mx-2 flex items-center mb-2">
          <Badge className="bg-blue-200 text-blue-800 text-xs px-2 py-1">
            <UserPen />
            <span>{studentData.student_major}</span>
          </Badge>
        </div>

        {/* Year */}
        <div className="rounded-md w-fit mx-2 flex items-center mb-2">
          <Badge className="bg-pink-200 text-pink-800 text-xs px-2 py-1">
            <Calendar className="h-7 w-7" />
            {studentData.student_year}
          </Badge>
        </div>

        {/* Interests */}
        <div className="rounded-md w-fit mx-2 mb-1">
          <div className="gap-1">
            {studentData.student_interests.map((interest, index) => (
              <Badge
                key={index}
                className="bg-gray-200 text-black text-xs px-2 py-1"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
