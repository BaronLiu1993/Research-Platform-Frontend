"use client";

import { useState, useEffect, useRef, useTransition, useCallback } from "react";
import { Label } from "@/shadcomponents/ui/label";
import { Input } from "@/shadcomponents/ui/input";
import { Badge } from "@/shadcomponents/ui/badge";
import { Computer } from "lucide-react";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function Contact({
  contactArray = {},
  onContactArrayChange = () => {},
}) {
  const [isPending, startTransition] = useTransition();
  const [localContactData, setLocalContactData] = useState(contactArray || {});
  console.log(contactArray);
  console.log(localContactData);

  const debouncedUpdateParent = useRef(
    debounce((updatedContact) => {
      startTransition(() => {
        onContactArrayChange(updatedContact);
      });
    }, 300)
  ).current;

  useEffect(() => {
    if (!contactArray) return;

    const isSame = Object.entries(contactArray).every(
      ([key, value]) => localContactData[key] === value
    );

    if (!isSame) {
      setLocalContactData(contactArray);
    }
  }, [contactArray]);

  const handleFieldChange = useCallback(
    (field, value) => {
      setLocalContactData((prev) => {
        const updated = { ...prev, [field]: value };
        debouncedUpdateParent(updated);
        return updated;
      });
    },
    [debouncedUpdateParent]
  );

  return (
    <div className="border-gray-400 p-8 w-[40rem] space-y-5 overflow-hidden font-main ">
      <div className="space-y-2 bg-neutral-100 p-4 rounded-xs border-1">
        <h1 className="text-xl font-semibold text-neutral-800 flex gap-2 items-center">
          Contact Information
          <Badge>
            {" "}
            <Computer />
            Digital Presence
          </Badge>
        </h1>
        <p className="text-[13px] text-neutral-700 mt-10">
          Agents can be{" "}
          <span className="text-black font-semibold px-0.5">unreliable</span>{" "}
          and may need human input to successfully accomplish tasks. Similarly,
          for some actions, you may want to require human{" "}
          <span className="bg-neutral-200 px-0.5">approval</span> before running
          to ensure that everything is running as intended. Here are some tips:
        </p>
        <ul className="list-inside text-xs bg-[#ebebeb] rounded-xs p-2 space-y-1">
          <li className="list-disc">
            Ensure your{" "}
            <span className="font-semibold text-blue-700">LinkedIn</span> is
            complete — add a strong headline, summary, experience, and featured
            projects.
          </li>
          <li className="list-disc">
            Include a{" "}
            <span className="font-semibold text-blue-700">
              personal website or portfolio
            </span>{" "}
            (especially for engineering, science, or design roles) You can build
            one quickly with{" "}
            <span className="underline text-blue-700">Notion</span> and{" "}
            <span className="text-red-700 underline">Adobe Portfolio</span>.
          </li>

          <li className="list-disc">
            Make your contact info easy to find — use a{" "}
            <span className="font-semibold text-blue-700">school email</span>{" "}
            (e.g., you@domain.com).
          </li>
        </ul>

        <div className="py-6 flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Label className="text-sm font-bold" htmlFor="email">
              <Badge className="bg-neutral-200 text-neutral-700 border-1">
                Email
              </Badge>
            </Label>
            <Input
              id="email"
              value={localContactData.email || ""}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label className=" text-sm font-bold" htmlFor="linkedin">
              <Badge className="bg-neutral-200 text-neutral-700 border-1">
                LinkedIn
              </Badge>
            </Label>
            <Input
              id="linkedin"
              value={localContactData.linkedin || ""}
              onChange={(e) => handleFieldChange("linkedin", e.target.value)}
              className="bg-white"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className=" text-sm font-bold" htmlFor="github">
              <Badge className="bg-neutral-200 text-neutral-700 border-1">
                Github
              </Badge>
            </Label>
            <Input
              id="github"
              value={localContactData.github || ""}
              onChange={(e) => handleFieldChange("github", e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label className=" text-sm font-bold" htmlFor="website">
              <Badge className="bg-neutral-200 text-neutral-700 border-1">
                Website
              </Badge>
            </Label>
            <Input
              id="website"
              value={localContactData.website || ""}
              onChange={(e) => handleFieldChange("website", e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label className=" text-sm font-bold" htmlFor="phone">
              <Badge className="bg-neutral-200 text-neutral-700 border-1">
                Phone Number
              </Badge>
            </Label>
            <Input
              id="phone"
              value={localContactData.phone || ""}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label className=" text-sm font-bold" htmlFor="country">
              <Badge className="bg-neutral-200 text-neutral-700 border-1">
                Country
              </Badge>
            </Label>
            <Input
              id="country"
              value={localContactData.country || ""}
              onChange={(e) => handleFieldChange("country", e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1 space-y-2">
              <Label className=" text-sm font-bold" htmlFor="province">
                <Badge className="bg-neutral-200 text-neutral-700 border-1">
                  Province
                </Badge>
              </Label>
              <Input
                id="province"
                value={localContactData.province || ""}
                onChange={(e) => handleFieldChange("province", e.target.value)}
                className="bg-white"
              />
            </div>

            <div className="flex flex-col flex-1 space-y-2">
              <Label className=" text-sm font-bold" htmlFor="address">
                <Badge className="bg-neutral-200 text-neutral-700 border-1">
                  City
                </Badge>
              </Label>
              <Input
                id="address"
                value={localContactData.address || ""}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
