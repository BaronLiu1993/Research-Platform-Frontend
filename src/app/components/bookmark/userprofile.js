import { Badge } from "@/shadcomponents/ui/badge";
import { Mail, Calendar, UserCircle, BookOpen } from "lucide-react";

export default async function UserProfile({ studentData }) {
  return (
    <div className="font-sans bg-gray-100 rounded-lg p-5 shadow-sm w-[250px]">
      <h1 className="text-xl font-bold text-center mb-5">User Profile</h1>
      
      {/* Name */}
      <div className="mb-3">
        <Badge className="w-full bg-green-100 hover:bg-green-200 text-green-800 flex items-center gap-2 p-2 pl-3 rounded-full border border-green-200">
          <Mail className="h-4 w-4" />
          <span className="font-medium truncate">
            {studentData.student_firstname} {studentData.student_lastname}
          </span>
        </Badge>
      </div>

      {/* Major */}
      <div className="mb-3">
        <Badge className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center gap-2 p-2 pl-3 rounded-full border border-blue-200">
          <UserCircle className="h-4 w-4" />
          <span className="font-medium truncate">{studentData.student_major}</span>
        </Badge>
      </div>

      {/* Year */}
      <div className="mb-4">
        <Badge className="w-full bg-pink-100 hover:bg-pink-200 text-pink-800 flex items-center gap-2 p-2 pl-3 rounded-full border border-pink-200">
          <Calendar className="h-4 w-4" />
          <span className="font-medium">{studentData.student_year}</span>
        </Badge>
      </div>

      {/* Interests */}
      <div className="space-y-2">
        {studentData.student_interests.map((interest, index) => (
          <Badge
            key={index}
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-md border border-gray-300 text-center"
          >
            <span className="font-medium">{interest}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}