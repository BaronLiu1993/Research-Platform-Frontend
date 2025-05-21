"use client";

import { useState, useEffect, useRef, useTransition, useCallback } from "react";
import { Label } from "@/shadcomponents/ui/label";
import { Input } from "@/shadcomponents/ui/input";
import { Textarea } from "@/shadcomponents/ui/textarea";
import DropdownSkills from "@/app/components/dropdowns/dropdownskills";
import HonoursInput from "@/app/components/dropdowns/dropdownhonours";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function PersonalInfo({
  personalInfo = {},
  onPersonalInfoChange = () => {},
}) {
  const [isPending, startTransition] = useTransition();
  const [localData, setLocalData] = useState(personalInfo || {});
  const debouncedUpdateParent = useRef(
    debounce((updated) => {
      startTransition(() => {
        onPersonalInfoChange(updated);
      });
    }, 300)
  ).current;

  useEffect(() => {
    const isSame = Object.entries(personalInfo).every(
      ([key, value]) => localData[key] === value
    );
    if (!isSame) setLocalData(personalInfo);
  }, [personalInfo]);

  const handleChange = useCallback(
    (field, value) => {
      setLocalData((prev) => {
        const updated = { ...prev, [field]: value };
        debouncedUpdateParent(updated);
        return updated;
      });
    },
    [debouncedUpdateParent]
  );

  return (
    <div className="p-8 rounded-md">
      <div>
        <h1 className="font-sans text-2xl font-semibold">Personal Information</h1>
        <p className="text-sm font-sans text-gray-400">
          Show employers where they can contact you
        </p>
      </div>

      <div className="py-6 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="first_name" className="font-sans text-sm font-bold">First Name</Label>
          <Input
            id="first_name"
            value={localData.first_name || ""}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="last_name" className="font-sans text-sm font-bold">Last Name</Label>
          <Input
            id="last_name"
            value={localData.last_name || ""}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1 space-y-2">
            <Label htmlFor="start_year" className="font-sans text-sm font-bold">Start Year</Label>
            <Input
              id="start_year"
              value={localData.start_year || ""}
              onChange={(e) => handleChange("start_year", e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <Label htmlFor="end_year" className="font-sans text-sm font-bold">End Year</Label>
            <Input
              id="end_year"
              value={localData.end_year || ""}
              onChange={(e) => handleChange("end_year", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="skills" className="font-sans text-sm font-bold">Skills</Label>
          <DropdownSkills
            value={localData.skills || []}
            onChange={(val) => handleChange("skills", val)}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="gpa" className="font-sans text-sm font-bold">GPA</Label>
            <Input
              type="number"
              id="gpa"
              step="0.01"
              min="0"
              max="4"
              placeholder="Enter your GPA"
              className="text-sm"
              value={localData.gpa || ""}
              onChange={(e) => handleChange("gpa", e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="major" className="font-sans text-sm font-bold">Major</Label>
            <Textarea
              id="major"
              placeholder="Enter your major(s)"
              className="text-sm"
              value={localData.major || ""}
              onChange={(e) => handleChange("major", e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="courses" className="font-sans text-sm font-bold">Relevant Courses</Label>
            <Textarea
              id="courses"
              placeholder="List relevant courses"
              className="text-sm"
              value={localData.courses || ""}
              onChange={(e) => handleChange("courses", e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="honours" className="font-sans text-sm font-bold">Honours & Scholarships</Label>
            <HonoursInput
              value={localData.honours || []}
              onChange={(val) => handleChange("honours", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
