"use client";

import { useState } from "react";
import { Label } from "@/shadcomponents/ui/label";
import { Input } from "@/shadcomponents/ui/input";
import { Textarea } from "@/shadcomponents/ui/textarea";
import DropdownSkills from "@/app/components/dropdowns/dropdownskills";

export default function PersonalInfo() {
  const [skills, setSkills] = useState([]);
  return (
    <div className="p-8 rounded-md">
      <div>
        <h1 className="font-sans text-2xl font-semibold">
          Personal Information
        </h1>
        <p className="text-sm font-sans text-gray-400">
          Show employers where they can contact you
        </p>
      </div>

      <div className="py-6 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Label className="font-sans text-sm font-bold" htmlFor="first_name">
            First Name
          </Label>
          <Input id="first_name" />
        </div>

        <div className="flex flex-col space-y-2">
          <Label className="font-sans text-sm font-bold" htmlFor="last_name">
            Last Name
          </Label>
          <Input id="last_name" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1 space-y-2">
            <Label className="font-sans text-sm font-bold" htmlFor="start_year">
              Start Year
            </Label>
            <Input id="start_year" />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <Label className="font-sans text-sm font-bold" htmlFor="end_year">
              End Year
            </Label>
            <Input id="end_year" />
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col space-y-2">
          <Label className="font-sans text-sm font-bold" htmlFor="skills">
            Skills
          </Label>
          <DropdownSkills value={skills} onChange={setSkills} />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gpa" className="font-sans text-sm font-bold">
                GPA
              </Label>
              <Input
                type="number"
                id="gpa"
                step="0.01"
                min="0"
                max="4"
                placeholder="Enter your GPA"
                className="text-sm"
              />
            </div>

            {/* Major */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="major" className="font-sans text-sm font-bold">
                Major
              </Label>
              <Textarea
                id="major"
                placeholder="Enter your major(s)"
                className="text-sm"
              />
            </div>

            {/* Courses */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="courses" className="font-sans text-sm font-bold">
                Relevant Courses
              </Label>
              <Textarea
                id="courses"
                placeholder="List relevant courses"
                className="text-sm"
              />
            </div>

            {/* Honours */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="honours" className="font-sans text-sm font-bold">
                Honours & Scholarships
              </Label>
              <Textarea
                id="honours"
                placeholder="List any scholarships, awards, dean’s list, etc."
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
