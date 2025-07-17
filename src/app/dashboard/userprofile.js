"use client";

import { useState } from "react";

import { Badge } from "@/shadcomponents/ui/badge";
import {
  Mail,
  Calendar,
  UserCircle,
  LayoutDashboard,
  Bell,
} from "lucide-react";
import { Input } from "@/shadcomponents/ui/input";
import { Button } from "@/shadcomponents/ui/button";
import { Switch } from "@/shadcomponents/ui/switch";

export default function UserProfile({ studentData }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <div className="flex">
        <div className="font-sans p-10">
          <h1 className="text-lg font-semibold mb-5">Dashboard</h1>

          <div></div>
          <div className="flex space-x-2 items-center my-5">
            <LayoutDashboard className="h-8 w-8" />
            <div>
              <h1 className="font-semibold text-sm">Workspace Details</h1>
              <h2 className="text-gray-500 text-xs">
                Basic workspace info details
              </h2>
            </div>
          </div>
          <div className="mb-3 space-y-2">
            <Badge className=" bg-green-100 hover:bg-green-200 text-green-800 flex items-center gap-2 border border-green-200">
              <Mail className="h-4 w-4" />
              <span className="font-medium truncate">Name</span>
            </Badge>

            <Input
              value={`${studentData.student_firstname} ${studentData.student_lastname}`}
              onChange={() => {}}
              className="w-[20rem]"
            />
          </div>

          <div className="mb-3 space-y-2">
            <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center gap-2 border border-blue-200">
              <UserCircle className="h-4 w-4" />
              <span className="font-medium truncate">Major</span>
            </Badge>
            <Input
              value={`${studentData.student_major}`}
              onChange={() => {}}
              className="w-[20rem]"
            />
          </div>

          {/* Year */}
          <div className="mb-4 space-y-2">
            <Badge className="bg-pink-100 hover:bg-pink-200 text-pink-800 flex items-center gap-2 border border-pink-200">
              <Calendar className="h-4 w-4" />
              <span>Student Year</span>
            </Badge>
            <Input
              value={`${studentData.student_year}`}
              onChange={() => {}}
              className="w-[20rem]"
            />
          </div>
          <div className="space-y-2 w-[30rem]">
            <Badge className="bg-pink-100 hover:bg-pink-200 text-pink-800 flex items-center gap-2 border border-pink-200">
              <Calendar className="h-4 w-4" />
              <span>Interests</span>
            </Badge>
            <div className="flex flex-wrap gap-2 p-1 border-1 rounded-md bg-gray-50">
              {studentData.student_interests.map((interest, index) => (
                <Badge key={index} className="">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          <Button className=" bg-purple-500 mt-4 text-xs h-8 hover:bg-purple-400 cursor-pointer">
            ✓ Save
          </Button>
        </div>
        <div className="space-y-2 mt-6 border-l-1 p-12 font-sans">
          <div className="flex space-x-2 items-center my-5">
            <Bell className="h-8 w-8" />
            <div>
              <h1 className="font-semibold text-sm">Notification Settings</h1>
              <h2 className="text-gray-500 text-xs">
                Get Updated on the Latest Postings
              </h2>
            </div>
          </div>
          <div className="space-x-10 space-y-12">
            <div
              className={`border ${
                enabled ? "border-black" : "border-gray-200"
              } flex justify-center w-fit items-center p-4 space-x-4 rounded-md cursor-pointer shadow-sma`}
              onClick={() => setEnabled(!enabled)}
            >
              <Mail />
              <div>
                <h2 className="font-semibold">Email Messages</h2>
                <p className="text-sm">Receive a one-time passcode</p>
                <p className="text-sm">via SMS each time you login</p>
              </div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>
            <div
              className={`border ${
                enabled ? "border-black" : "border-gray-200"
              } flex justify-center w-fit items-center p-4 space-x-4 rounded-md cursor-pointer shadow-sma`}
              onClick={() => setEnabled(!enabled)}
            >
              <Mail />
              <div>
                <h2 className="font-semibold">Email Messages</h2>
                <p className="text-sm">Receive a one-time passcode</p>
                <p className="text-sm">via SMS each time you login</p>
              </div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
