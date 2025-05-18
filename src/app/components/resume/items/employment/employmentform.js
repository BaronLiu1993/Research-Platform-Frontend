"use client";

import { useState, useEffect } from "react";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";
import EmploymentWordProcessor from "./employmentwordprocessor";
import { Button } from "@/shadcomponents/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";

export default function EmploymentForm({ id, data, onChange }) {
  
  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    location: "",
    start_date: "",
    end_date: "",
    description: [""],
    ...data,
  });

  useEffect(() => {
    const incoming = {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: [""],
      ...data,
    };
    if (JSON.stringify(incoming) !== JSON.stringify(formData)) {
      setFormData(incoming);
    }
  }, [data, formData]);

  const push = (fields) => {
    const updatedFormData = { ...formData, ...fields };
    setFormData(updatedFormData);
    onChange(id, updatedFormData);
  };
  console.log(formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    push({ [name]: value });
  };

  const handleDescriptionChange = (idx, value) => {
    const newDesc = [...formData.description];
    newDesc[idx] = value;
    push({ description: newDesc });
  };
  
  const addDescriptionPoint = () => {
    const newDesc = [...formData.description, ""];
    push({ description: newDesc });
  };
  
  const removeDescriptionPoint = (idx) => {
    const newDesc = formData.description.filter((_, i) => i !== idx);
    push({ description: newDesc });
  };

  const baseId =
    formData.job_title.replace(/\s+/g, "-").toLowerCase() || `exp-form-${id}`;

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
            {/* Job Title */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`${baseId}-job_title`}>Job Title</Label>
              <Input
                id={`${baseId}-job_title`}
                name="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
              />
            </div>

            {/* Company */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`${baseId}-company`}>Company</Label>
              <Input
                id={`${baseId}-company`}
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>

            {/* Location */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`${baseId}-location`}>Location</Label>
              <Input
                id={`${baseId}-location`}
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor={`${baseId}-start_date`}>Start Date</Label>
                <Input
                  id={`${baseId}-start_date`}
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor={`${baseId}-end_date`}>End Date</Label>
                <Input
                  id={`${baseId}-end_date`}
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Description list */}
            <div className="flex flex-col space-y-2">
              <Label>Description</Label>
              {formData.description.map((point, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <EmploymentWordProcessor
                    id={`${baseId}-desc-${idx}`}
                    value={point}
                    onChange={(val) => handleDescriptionChange(idx, val)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDescriptionPoint(idx)}
                    aria-label="Remove bullet"
                  >
                    <XCircle />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addDescriptionPoint}
              >
                <PlusCircle className="mr-2" /> Add Bullet Point
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}