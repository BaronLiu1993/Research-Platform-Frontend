// items/experience/ExperienceForm.jsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";

import EmploymentWordProcessor from "./employmentwordprocessor";

import { Button } from "@/shadcomponents/ui/button"; // For adding/removing bullet points
import { PlusCircle, XCircle } from "lucide-react";

// Accordion components if you still want the collapsible interface
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";

export default function ExperienceForm({ data, onChange }) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const changedFields = { [name]: value };
    setFormData((prev) => ({ ...prev, ...changedFields }));
    onChange(changedFields);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescription = [...(formData.description || [])];
    newDescription[index] = value;
    const changedFields = { description: newDescription };
    setFormData((prev) => ({ ...prev, ...changedFields }));
    onChange(changedFields);
  };

  const addDescriptionPoint = () => {
    const newDescription = [...(formData.description || []), ""];
    const changedFields = { description: newDescription };
    setFormData((prev) => ({ ...prev, ...changedFields }));
    onChange(changedFields);
  };

  const removeDescriptionPoint = (index) => {
    const newDescription = [...(formData.description || [])].filter(
      (_, i) => i !== index
    );
    const changedFields = { description: newDescription };
    setFormData((prev) => ({ ...prev, ...changedFields }));
    onChange(changedFields);
  };

  const baseId =
    formData.job_title?.replace(/\s+/g, "-") ||
    `exp-form-${Math.random().toString(36)}`;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={`item-${baseId}`}
      className="w-full font-sans bg-white border rounded-md"
    >
      <AccordionItem value={`item-${baseId}`}>
        <AccordionTrigger className="px-4 font-semibold text-lg hover:no-underline">
          <div className="flex flex-col text-left w-full">
            <div>{formData.job_title || "New Position"}</div>
            <div className="text-sm font-extralight text-gray-500">
              {formData.company || "Company Name"}
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`${baseId}-job_title`}>Job Title</Label>
              <Input
                id={`${baseId}-job_title`}
                name="job_title"
                value={formData.job_title || ""}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor={`${baseId}-company`}>Company</Label>
              <Input
                id={`${baseId}-company`}
                name="company"
                value={formData.company || ""}
                onChange={handleInputChange}
                placeholder="e.g., Tech Solutions Inc."
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor={`${baseId}-location`}>Location</Label>
              <Input
                id={`${baseId}-location`}
                name="location"
                value={formData.location || ""}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:space-y-0 space-y-2">
              <div className="flex flex-col flex-1 space-y-2">
                <Label htmlFor={`${baseId}-start_date`}>Start Date</Label>
                <Input
                  id={`${baseId}-start_date`}
                  name="start_date"
                  type="month"
                  value={formData.start_date || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col flex-1 space-y-2">
                <Label htmlFor={`${baseId}-end_date`}>
                  End Date (or "Present")
                </Label>
                <Input
                  id={`${baseId}-end_date`}
                  name="end_date"
                  type="month"
                  value={formData.end_date || ""}
                  onChange={handleInputChange}
                  placeholder="YYYY-MM or Present"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Description (Bullet Points)</Label>
              {(formData.description || [""]).map((point, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <EmploymentWordProcessor
                    value={point}
                    content={point}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                    placeholder={`Responsibility or achievement ${index + 1}`}
                    rows={2}
                    className="flex-grow"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDescriptionPoint(index)}
                    disabled={
                      (formData.description || []).length <= 1 &&
                      index === 0 &&
                      point === ""
                    }
                    className="text-gray-400 hover:text-red-500 mt-1"
                    aria-label="Remove bullet point"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addDescriptionPoint}
                className="self-start mt-2 text-purple-600 border-purple-300 hover:bg-purple-50"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Bullet Point
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
