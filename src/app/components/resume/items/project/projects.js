"use client";

import { useState, useEffect, useTransition, useRef, useCallback } from "react";
import { Button } from "@/shadcomponents/ui/button";
import { Info, Trash2, GripVertical, Mic, Hammer } from "lucide-react";
import ProjectsForm from "./projectform";
import { Badge } from "@/shadcomponents/ui/badge";
import { Separator } from "@radix-ui/react-dropdown-menu";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function Projects({
  projectArray = [],
  onProjectsArrayChange = () => {},
}) {
  const [isPending, startTransition] = useTransition();
  const [localProjectForms, setLocalProjectForms] = useState([]);
  const debouncedUpdateParent = useRef(
    debounce((updatedForms) => {
      startTransition(() => {
        const cleaned = updatedForms.map(({ _localId, key, ...d }) => d);
        onProjectsArrayChange(cleaned);
      });
    }, 300)
  ).current;

  useEffect(() => {
    setLocalProjectForms((prev) => {
      const map = Object.fromEntries(prev.map((f) => [f.key, f]));
      return projectArray.map((proj, i) => {
        const key = proj.id ?? i;
        if (map[key]) return map[key];
        return {
          project_name: proj.project_name || proj.name || "",
          achievements: proj.achievements || "",
          bullets: proj.bullets || proj.description || [""],
          key,
          _localId: `proj-${key}`,
        };
      });
    });
  }, [projectArray]);

  const handleChange = useCallback(
    (localId, updatedFields) => {
      setLocalProjectForms((prevForms) => {
        const updatedForms = prevForms.map((form) =>
          form._localId === localId ? { ...form, ...updatedFields } : form
        );
        debouncedUpdateParent(updatedForms);
        return updatedForms;
      });
    },
    [debouncedUpdateParent]
  );

  const handleAddProject = () => {
    const newForm = {
      project_name: "",
      achievements: "",
      bullets: [""],
      _localId: `proj-new-${Date.now()}`,
      key: `new-${Date.now()}`,
    };
    const updatedForms = [...localProjectForms, newForm];
    setLocalProjectForms(updatedForms);
    startTransition(() => {
      debouncedUpdateParent(updatedForms);
    });
  };

  const handleRemoveProject = (localId) => {
    const updatedForms = localProjectForms.filter(
      (f) => f._localId !== localId
    );
    setLocalProjectForms(updatedForms);
    startTransition(() => {
      debouncedUpdateParent(updatedForms);
    });
  };

  return (
    <div className="border-gray-400 w-[40rem] p-8 space-y-5 overflow-hidden font-sans">
      <div className="space-y-2 border-1 bg-neutral-100 p-3 rounded-xs">
        <h1 className="text-xl font-semibold text-neutral-800 flex gap-2 items-center">
          Projects
          <Badge>
            <Hammer />
            Building Projects
          </Badge>
        </h1>
        <p className="text-xs font-semibold">
          By Jie Xuan Liu
          <span className="text-blue-700 font-normal">
            {" "}
            @ PhD at University of Toronto
          </span>
        </p>
        <p className="text-[13px] text-neutral-700 mt-10">
          Agents can be{" "}
          <span className="text-black font-semibold px-0.5">unreliable</span>{" "}
          and may need human input to successfully accomplish tasks.{" "}
          <span className="">{"[1]"}</span> Similarly, for some actions, you may
          want to require human{" "}
          <span className="bg-neutral-200 px-0.5">approval</span> before running
          to ensure that everything is running as intended.{" "}
          <span className="">{"[2]"}</span>
        </p>
        <p className="text-[13px] text-neutral-700">
          LangGraph's <span className="text-blue-700">persistence</span> layer
          supports{" "}
          <span className="font-semibold text-black">human-in-the-loop</span>{" "}
          workflows, allowing execution to pause and resume based on user
          feedback. <span className="">{"[3]"}</span> The primary interface to
          this functionality is the interrupt function.
        </p>
        <Separator />
        <div className="text-[10px] font-mono">
          <p>
            <span className="font-semibold">[1]</span> Smith, A., & Johnson, L.
            (2021). *Machine Learning*. Harvard
          </p>
          <p>
            <span className="font-semibold">[2]</span> Doe, J., & Chen, M.
            (2022). *Natural language*. University of Toronto
          </p>
        </div>
        <p className="border p-2 text-xs rounded-md bg-blue-100 flex items-center border-blue-200">
          <Info className="w-5 h-5 mr-2 text-blue-700" />
          <span className="text-blue-500">
            Click Here To See Our Tips for Using AI Responsibly
          </span>
        </p>
        {localProjectForms.map((projectWithId) => (
          <div
            key={projectWithId._localId}
            className="flex justify-center items-center space-x-2"
          >
            <div className="flex-shrink-0 flex items-center justify-center h-5 w-5">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex-grow">
              <ProjectsForm
                key={projectWithId._localId}
                id={projectWithId._localId}
                data={projectWithId}
                onChange={handleChange}
              />
            </div>
            <div className="flex-shrink-0 flex items-center justify-center h-5 w-5 cursor-pointer rounded-md hover:bg-gray-50">
              <Trash2
                className="h-4 w-4 text-gray-400 hover:text-red-400"
                onClick={() => handleRemoveProject(projectWithId._localId)}
              />
            </div>
          </div>
        ))}
        <Button
          onClick={handleAddProject}
          className="rounded-md bg-blue-500 p-2 text-white font-sans font-semibold hover:bg-blue-400"
        >
          Add More +
        </Button>
      </div>
    </div>
  );
}
