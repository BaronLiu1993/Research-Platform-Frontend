"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";
import { Button } from "@/shadcomponents/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import ProjectWordProcessor from "./projectwordprocessor";

function ProjectForm({ id, data = {}, onChange }) {
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
      const updated = { ...formData, ...fields };
      setFormData(updated);
      onChange(id, updated);
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

  const handleBulletChange = useCallback(
    (idx, value) => {
      const newBullets = [...formData.bullets];
      newBullets[idx] = value;
      push({ bullets: newBullets });
    },
    [formData.bullets, push]
  );

  const addBulletPoint = useCallback(() => {
    push({ bullets: [...formData.bullets, ""] });
  }, [formData.bullets, push]);

  const removeBulletPoint = useCallback(
    (idx) => {
      push({
        bullets: formData.bullets.filter((_, i) => i !== idx),
      });
    },
    [formData.bullets, push]
  );

  const baseId = useMemo(() => (
    formData.project_name?.replace(/\s+/g, "-").toLowerCase() || `project-form-${id}`
  ), [id]); 
  

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
            <div>{formData.project_name || "New Project"}</div>
            <div className="text-sm font-extralight text-gray-500">
              {formData.achievements || "Achievements Summary"}
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="p-4 flex flex-col gap-4">
            {["project_name", "achievements"].map((field) => (
              <div className="flex flex-col space-y-2" key={field}>
                <Label htmlFor={`${baseId}-${field}`}>
                  {field
                    .replace("_", " ")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </Label>
                <Input
                  id={`${baseId}-${field}`}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <div className="flex flex-col space-y-2">
              <Label>Bullet Points</Label>
              {formData.bullets.map((point, idx) => {
                const handleChange = useCallback(
                  (val) => handleBulletChange(idx, val),
                  [idx, handleBulletChange]
                );

                const handleRemove = useCallback(
                  () => removeBulletPoint(idx),
                  [idx, removeBulletPoint]
                );

                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <ProjectWordProcessor
                      id={`${baseId}-bullet-${idx}`}
                      content={point}
                      onChange={handleChange}
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
                onClick={addBulletPoint}
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

export default React.memo(ProjectForm);
