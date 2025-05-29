"use client";

import { useState, useEffect, useRef, useTransition, useCallback } from "react";
import { Label } from "@/shadcomponents/ui/label";
import { Input } from "@/shadcomponents/ui/input";
import { Textarea } from "@/shadcomponents/ui/textarea";
import HonoursInput from "@/app/components/dropdowns/dropdownhonours";
import SkillsInput from "@/app/components/dropdowns/dropdownskills";
import CoursesInput from "@/app/components/dropdowns/dropdowncourses";
import { Badge } from "@/shadcomponents/ui/badge";
import { Leaf } from "lucide-react";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function PersonalInfo({
  personalInfoData = {},
  onPersonalInfoChange = () => {},
}) {
  const [isPending, startTransition] = useTransition();
  const [localData, setLocalData] = useState(personalInfoData);

  const debouncedUpdateParent = useRef(
    debounce((updated) => {
      startTransition(() => {
        onPersonalInfoChange(updated);
      });
    }, 300)
  ).current;

  useEffect(() => {
    if (!personalInfoData) return;

    const isSame = Object.entries(personalInfoData).every(
      ([key, value]) => localData[key] === value
    );

    if (!isSame) {
      setLocalData(personalInfoData);
    }
  }, [personalInfoData]);

  const handleChange = useCallback(
    (field, value) => {
      setLocalData((prev) => {
        const updated = { ...prev, [field]: value };
        setTimeout(() => debouncedUpdateParent(updated), 0);
        return updated;
      });
    },
    [debouncedUpdateParent]
  );

  return (
    <div className="p-8 rounded-md w-[40rem]">
      <div className="space-y-2 bg-neutral-100 p-4 rounded-xs border-1">
        <h1 className="text-xl font-semibold text-neutral-800 flex gap-2 items-center">
          Skills and Education
          <Badge>
            {" "}
            <Leaf />
            Growing Your Skills
          </Badge>
        </h1>
        <p className="text-[13px] text-neutral-700 mt-10">
          Agents can be{" "}
          <span className="text-black font-semibold px-0.5">unreliable</span>{" "}
          and may need human input to successfully accomplish tasks. Similarly,
          for some actions, you may want to require human{" "}
          <span className="bg-neutral-200 px-0.5">approval</span> before running
          to ensure that everything is running as intended.{" "}
          <span className="bg-yellow-200">
            {" "}
            Before You Submit I Recommend You:
          </span>
        </p>
        <ul className="list-inside text-xs bg-[#ebebeb] rounded-xs p-2 space-y-1 font-mono">
          <li className="list-disc">
            For each position fill in only the relevant skills required.{" "}
            <span className="text-blue-700 font-semibold">
              Quality over Quantity!
            </span>
          </li>
          <li className="list-disc">
            Include a{" "}
            <span className="font-semibold text-blue-700">
              personal website or portfolio
            </span>{" "}
            (especially for engineering, science, or design roles) You can build
            one quickly with{" "}
            <span className="underline text-blue-700">Notion</span> or{" "}
            <span className="text-red-700 underline">Adobe</span>.
          </li>

          <li className="list-disc">
            Make your contact info easy to find — use a{" "}
            <span className="font-semibold text-blue-700">school email</span>{" "}
            (e.g., you@domain.com).
          </li>
        </ul>
        <div className="py-6 flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="first_name" className="font-sans text-sm font-bold">
              First Name
            </Label>
            <Input
              id="first_name"
              value={localData.first_name || ""}
              onChange={(e) => handleChange("first_name", e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="last_name" className="font-sans text-sm font-bold">
              Last Name
            </Label>
            <Input
              id="last_name"
              value={localData.last_name || ""}
              onChange={(e) => handleChange("last_name", e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1 space-y-2">
              <Label
                htmlFor="start_date"
                className="font-sans text-sm font-bold"
              >
                Start Date
              </Label>
              <Input
                id="start_date"
                value={localData.start_date || ""}
                onChange={(e) => handleChange("start_date", e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1 space-y-2">
              <Label htmlFor="end_date" className="font-sans text-sm font-bold">
                End Date
              </Label>
              <Input
                id="end_date"
                value={localData.end_date || ""}
                onChange={(e) => handleChange("end_date", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="skills" className="font-sans text-sm font-bold">
              Skills
            </Label>
            <SkillsInput
              value={localData.skills || []}
              onChange={(val) => handleChange("skills", val)}
            />
          </div>

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
                value={localData.gpa || ""}
                onChange={(e) => handleChange("gpa", e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="degree" className="font-sans text-sm font-bold">
                Degree
              </Label>
              <Textarea
                id="degree"
                placeholder="Enter your degree"
                className="text-sm"
                value={localData.degree || ""}
                onChange={(e) => handleChange("degree", e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="school" className="font-sans text-sm font-bold">
                School
              </Label>
              <Textarea
                id="school"
                placeholder="Enter your school"
                className="text-sm"
                value={localData.school || ""}
                onChange={(e) => handleChange("school", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="courses" className="font-sans text-sm font-bold">
              Courses
            </Label>
            <CoursesInput
              value={localData.relevant_course || []}
              onChange={(val) => handleChange("relevant_course", val)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="awards" className="font-sans text-sm font-bold">
              Awards
            </Label>
            <HonoursInput
              value={localData.awards || []}
              onChange={(val) => handleChange("awards", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
