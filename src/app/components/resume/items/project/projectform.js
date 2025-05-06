"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";

import ProjectWordProcessor from "./projectwordprocessor";

import { useState } from "react";

export default function ProjectForm({ data = {}, onChange = () => {} }) {
  const [local, setLocal] = useState(data);
  console.log(local.bullets);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const updated = { ...local, [name]: value };
    setLocal(updated);
    onChange(updated);
  };

  const handleBulletsChange = (newBullets) => {
    const updated = { ...local, bullets: newBullets };
    setLocal(updated);
    onChange(updated);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full font-sans bg-white border rounded-md p-2"
    >
      <AccordionItem value="project-section">
        <AccordionTrigger className="px-4 py-2 font-semibold text-lg">
          <div>
            <div>{local.project_name || "Untitled Project"}</div>
            <div className="text-sm font-extralight">
              {local.achievements || "No achievements listed"}
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="project_name">Project Name</Label>
              <Input
                id="project_name"
                name="project_name"
                value={local.project_name || ""}
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="achievements">Achievements</Label>
              <Input
                id="achievements"
                name="achievements"
                value={local.achievements || ""}
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Bullet Points</Label>
              <ProjectWordProcessor
                content={local.bullets || []}
                onChange={(updatedBullets) => {
                  handleBulletsChange(updatedBullets);
                }}
                className="w-full"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
