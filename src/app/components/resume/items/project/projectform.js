"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";
import ProjectWordProcessor from "./projectwordprocessor";
import { Button } from "@/shadcomponents/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";

function ProjectsForm({ id, data, onChange }) {
  const lastDataIdRef = useRef(null);
  const [formData, setFormData] = useState({
    project_name: "",
    achievements: "",
    bullets: [""],
    ...data,
  });

  useEffect(() => {
    if (data?.id !== lastDataIdRef.current) {
      lastDataIdRef.current = data?.id;
      setFormData({
        project_name: "",
        achievements: "",
        bullets: [""],
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
      const newDesc = [...formData.bullets];
      newDesc[idx] = value;
      push({ bullets: newDesc });
    },
    [formData.bullets, push]
  );

  const addDescriptionPoint = useCallback(() => {
    push({ bullets: [...formData.bullets, ""] });
  }, [formData.bullets, push]);

  const removeDescriptionPoint = useCallback(
    (idx) => {
      push({
        bullets: formData.bullets.filter((_, i) => i !== idx),
      });
    },
    [formData.bullets, push]
  );

  const baseId =
    formData.project_name.replace(/\s+/g, "-").toLowerCase() || `proj-form-${id}`;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={`item-${baseId}`}
      className="w-full max-w-3xl font-sans bg-white border rounded-md"
    >
      <AccordionItem value={`item-${baseId}`}>
        <AccordionTrigger className="px-4 font-semibold text-lg hover:no-underline">
          <div className="flex flex-col text-left w-full">
            <div>{formData.project_name || "New Project"}</div>
            <div className="text-sm font-extralight text-gray-500">
              {formData.achievements || "Achievements"}
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="p-4 flex flex-col gap-4">
            {["project_name", "achievements"].map((field) => (
              <div className="flex flex-col space-y-2" key={field}>
                <Label className = "font-sans text-sm font-bold" htmlFor={`${baseId}-${field}`}>
                  {field === "project_name" ? "Project Name" : "Achievements"}
                </Label>
                {field === "achievements" ? (
                  <textarea
                    id={`${baseId}-${field}`}
                    name={field}
                    className="border rounded px-3 py-2 resize-none"
                    rows={3}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Input
                    id={`${baseId}-${field}`}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}

            <div className="flex flex-col space-y-2">
              <Label
                className = "font-sans text-sm font-bold"
              >
                Description
              </Label>
              {formData.bullets.map((point, idx) => {
                const handleRemove = useCallback(
                  () => removeDescriptionPoint(idx),
                  [idx, removeDescriptionPoint]
                );

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-2 w-full"
                  >
                    <div className="flex-grow min-w-0">
                      <ProjectWordProcessor
                        id={`${baseId}-desc-${idx}`}
                        className="w-full"
                        value={point}
                        onChange={(val) => handleDescriptionChange(idx, val)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRemove}
                      aria-label="Remove bullet"
                      className="mt-1"
                    >
                      <XCircle />
                    </Button>
                  </div>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                className="mt-2 self-start"
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

export default React.memo(ProjectsForm);
