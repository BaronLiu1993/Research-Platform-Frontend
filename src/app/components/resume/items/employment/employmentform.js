"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";
import EmploymentWordProcessor from "./employmentwordprocessor";
import { Button } from "@/shadcomponents/ui/button";
import { Plus, PlusCircle, X, XCircle } from "lucide-react";
import { usePointStore } from "@/app/store/usePointStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 here too, if needed for internal IDs

function EmploymentForm({
  id, // This 'id' is the unique _localId (a UUID string) passed from the parent
  data,
  onChange,
  sendResumePoint,
  loadedResumePoints,
  removeResumePoint,
}) {
  // We use a ref to store the last processed ID to prevent infinite loops
  // and ensure formData is only reset when the *actual* form ID changes.
  const lastProcessedIdRef = useRef(null);

  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    location: "",
    start_date: "",
    end_date: "",
    description: [""],
    ...data, // Initial data will be from the 'data' prop
  });

  const [openItem, setOpenItem] = useState(null);
  const addResumeZustandPoint = usePointStore((state) => state.addResumePoint);
  const removeResumeZustandPoint = usePointStore(
    (state) => state.removeResumePoint
  );

  const handleToggleResumePoint = useCallback(
    (point) => {
      if (loadedResumePoints.includes(point)) {
        removeResumePoint(point);
        removeResumeZustandPoint(point);
      } else {
        sendResumePoint(point);
        addResumeZustandPoint(point);
        toast("Resume Point Has Been Added", {
          description: point,
          action: {
            label: "Undo",
            onClick: () => removeResumePoint(point),
          },
        });
      }
    },
    [
      loadedResumePoints,
      sendResumePoint,
      removeResumePoint,
      addResumeZustandPoint,
      removeResumeZustandPoint,
    ]
  );

  useEffect(() => {
    // This effect ensures that formData is updated when the 'id' (which is the _localId) or 'data' changes.
    // The 'id' prop is now reliably unique from the parent (a UUID string).
    // We only update formData if the form's identity (ID) has changed,
    // or if the data itself has changed for the current ID.
    if (id !== lastProcessedIdRef.current || JSON.stringify(data) !== JSON.stringify(formData)) {
        lastProcessedIdRef.current = id;
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
  }, [id, data]); // Depend on 'id' and 'data' object itself

  const push = useCallback(
    (fields) => {
      const updatedFormData = { ...formData, ...fields };
      setFormData(updatedFormData);
      onChange(id, updatedFormData); // Use the 'id' prop received from parent (the UUID)
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
    // We can add an empty string, or if each description point needed its own unique ID, you could use uuidv4() here too.
    push({ description: [...formData.description, ""] });
  }, [formData.description, push]);

  const removeDescriptionPoint = useCallback(
    (idx) => {
      const pointToRemove = formData.description[idx];
      if (loadedResumePoints.includes(pointToRemove)) {
        removeResumePoint(pointToRemove);
      }
      push({
        description: formData.description.filter((_, i) => i !== idx),
      });
    },
    [formData.description, push, loadedResumePoints, removeResumePoint]
  );

  return (
    <Accordion
      type="single"
      collapsible
      value={openItem}
      onValueChange={setOpenItem}
      className="w-[31rem] font-main bg-white border rounded-md"
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
              <div className="flex flex-col space-y-2" key={`${id}-${field}`}> {/* Unique key for these divs */}
                <Label
                  className="text-sm font-bold"
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
                <div className="flex flex-col space-y-2" key={`${id}-${field}`}> {/* Unique key for these divs */}
                  <Label
                    className="text-sm font-bold"
                    htmlFor={`${id}-${field}`} // Unique HTML 'id'
                  >
                    {field
                      .replace("_", " ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </Label>
                  <Input
                    id={`${id}-${field}`} // Unique HTML 'id'
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-bold">
                <h1>Experience Points</h1>
                <p className="text-xs bg-blue-100 p-1 rounded-md border-1 border-blue-700 text-blue-700 font-extralight">
                  Highlight Text and Rewrite With AI
                </p>
              </Label>
              {formData.description.map((point, idx) => {
                const handleRemove = () => removeDescriptionPoint(idx);
                const isPointLoaded = loadedResumePoints.includes(point);
                return (
                  <div key={`${id}-desc-${uuidv4()}`} className="flex items-center space-x-2"> {/* Generate UUID for each description point key */}
                    <div className="relative w-full">
                      <EmploymentWordProcessor
                        id={`${id}-desc-processor-${uuidv4()}`} // Unique HTML 'id' for the word processor
                        value={point}
                        onChange={(val) => handleDescriptionChange(idx, val)}
                      />
                      {isPointLoaded ? (
                        <Button
                          className="absolute text-xs w-fit h-fit p-1 bottom-5 right-5 z-10 cursor-pointer bg-red-400 hover:bg-red-500"
                          size="icon"
                          onClick={() => handleToggleResumePoint(point)}
                        >
                          <X />
                          Remove
                        </Button>
                      ) : (
                        <Button
                          className="absolute bg-neutral-500 text-neutral-100 hover:bg-neutral-600 text-xs w-fit h-fit p-1 bottom-5 right-5 z-10 cursor-pointer"
                          size="icon"
                          onClick={() => handleToggleResumePoint(point)}
                        >
                          <Plus />
                          Add to Email
                        </Button>
                      )}
                    </div>
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