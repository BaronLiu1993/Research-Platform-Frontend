"use client";

// ShadCN Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";

import { useState, useEffect } from "react";
import EmploymentWordProcessor from "./employmentwordprocessor";

export default function EmploymentForm({ data, onChange }) {
  const [local, setLocal] = useState(data);

  useEffect(() => {
    setLocal(data);
  }, [data]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const updated = { ...local, [name]: value };
    setLocal(updated);
    onChange(updated);
  };

  const handleDescriptionChange = (newDescriptionArray) => {
    const updated = { ...local, description: newDescriptionArray };
    setLocal(updated);
    onChange(updated);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border border-muted rounded-xl bg-white shadow-sm"
    >
      <AccordionItem value="employment-section">
        <AccordionTrigger onClick={() => setIsOpen((prev) => !prev)}>
          {local.job_title || "Untitled Position"}
        </AccordionTrigger>

        <AccordionContent>
          <div className="p-4 flex flex-col gap-4">
            {/* Job Title */}
            <div className="flex flex-col">
              <Label htmlFor="job_title">Job Title</Label>
              <Input
                name="job_title"
                id="job_title"
                value={local.job_title}
                onChange={handleInput}
              />
            </div>

            {/* Company */}
            <div className="flex flex-col">
              <Label htmlFor="company">Company</Label>
              <Input
                name="company"
                id="company"
                value={local.company}
                onChange={handleInput}
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <Label htmlFor="location">Location</Label>
              <Input
                name="location"
                id="location"
                value={local.location}
                onChange={handleInput}
              />
            </div>

            {/* Dates */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col flex-1">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  type="date"
                  name="start_date"
                  id="start_date"
                  value={local.start_date}
                  onChange={handleInput}
                />
              </div>
              <div className="flex flex-col flex-1">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  type="date"
                  name="end_date"
                  id="end_date"
                  value={local.end_date}
                  onChange={handleInput}
                />
              </div>
            </div>

            {/* Bullet Points */}
            <div className="flex flex-col">
              <Label>Bullet Points</Label>
              <EmploymentWordProcessor
                bullets={local.description}
                onChange={handleDescriptionChange}
                className="w-full"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
