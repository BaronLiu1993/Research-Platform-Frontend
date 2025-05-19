"use client";

import { useState, useEffect, useRef, useTransition, useCallback } from "react";
import { Label } from "@/shadcomponents/ui/label";
import { Input } from "@/shadcomponents/ui/input";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function Contact({ contactArray = {}, onContactArrayChange = () => {} }) {
  const [isPending, startTransition] = useTransition();
  const [localContactData, setLocalContactData] = useState(contactArray || {});
  console.log(contactArray)
  console.log(localContactData)

  const debouncedUpdateParent = useRef(
    debounce((updatedContact) => {
      startTransition(() => {
        onContactArrayChange(updatedContact);
      });
    }, 300)
  ).current;

  useEffect(() => {
    if (JSON.stringify(contactArray) !== JSON.stringify(localContactData)) {
      setLocalContactData(contactArray || {});
    }
  }, [contactArray]);
  

  const handleFieldChange = useCallback((field, value) => {
    setLocalContactData((prev) => {
      const updated = { ...prev, [field]: value };
      debouncedUpdateParent(updated);
      return updated;
    });
  }, [debouncedUpdateParent]);

  return (
    <div className="p-8 rounded-md">
      <div>
        <h1 className="font-sans text-2xl font-semibold">Contact Information</h1>
        <p className="text-sm font-sans text-gray-400">
          Show employers where they can contact you
        </p>
      </div>

      <div className="py-6 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={localContactData.email || ""}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={localContactData.linkedin || ""}
            onChange={(e) => handleFieldChange("linkedin", e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={localContactData.phone || ""}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={localContactData.country || ""}
            onChange={(e) => handleFieldChange("country", e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1 space-y-2">
            <Label htmlFor="province">Province</Label>
            <Input
              id="province"
              value={localContactData.province || ""}
              onChange={(e) => handleFieldChange("province", e.target.value)}
            />
          </div>

          <div className="flex flex-col flex-1 space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={localContactData.address || ""}
              onChange={(e) => handleFieldChange("address", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            value={localContactData.university || "University of Toronto"}
            onChange={(e) => handleFieldChange("university", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
