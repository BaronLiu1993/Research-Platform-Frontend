"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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

function EmploymentForm({ id, data, onChange }) {
  const lastDataIdRef = useRef(null);

  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    location: "",
    start_date: "",
    end_date: "",
    description: [""],
    ...data,
  });

  const [openItem, setOpenItem] = useState(null); 

  useEffect(() => {
    if (data?.id !== lastDataIdRef.current) {
      lastDataIdRef.current = data?.id;
      setFormData({
        job_title: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        description: [""],
        ...data,
      });
    }
  }, [data?.id]);

  const push = useCallback(
    (fields) => {
      const updatedFormData = { ...formData, ...fields };
      setFormData(updatedFormData);
      onChange(id, updatedFormData);
    },
    [formData, id, onChange]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      push({ [name]: value });
    },
    [push]
  );

  const handleDescriptionChange = useCallback(
    (idx, value) => {
      const newDesc = [...formData.description];
      newDesc[idx] = value;
      push({ description: newDesc });
    },
    [formData.description, push]
  );

  const addDescriptionPoint = useCallback(() => {
    push({ description: [...formData.description, ""] });
  }, [formData.description, push]);

  const removeDescriptionPoint = useCallback(
    (idx) => {
      push({
        description: formData.description.filter((_, i) => i !== idx),
      });
    },
    [formData.description, push]
  );

  return (
    <Accordion
      type="single"
      collapsible
      value={openItem}
      onValueChange={setOpenItem}
      className="w-[32rem] font-sans bg-white border rounded-md"
    >
      <AccordionItem value={`item-${id}`}>
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
            {["job_title", "company", "location"].map((field) => (
              <div className="flex flex-col space-y-2" key={field}>
                <Label
                  className="font-sans text-sm font-bold"
                  htmlFor={`${id}-${field}`}
                >
                  {field
                    .replace("_", " ")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </Label>
                <Input
                  id={`${id}-${field}`}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              {["start_date", "end_date"].map((field) => (
                <div className="flex flex-col space-y-2" key={field}>
                  <Label
                    className="font-sans text-sm font-bold"
                    htmlFor={`${id}-${field}`}
                  >
                    {field
                      .replace("_", " ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </Label>
                  <Input
                    id={`${id}-${field}`}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="font-sans text-sm font-bold">
                Description
              </Label>
              {formData.description.map((point, idx) => {
                const handleRemove = () => removeDescriptionPoint(idx);
                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <EmploymentWordProcessor
                      id={`${id}-desc-${idx}`}
                      value={point}
                      onChange={(val) => handleDescriptionChange(idx, val)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRemove}
                      aria-label="Remove bullet"
                    >
                      <XCircle />
                    </Button>
                  </div>
                );
              })}
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

export default React.memo(EmploymentForm);
