"use client";

import { useState, useEffect, useTransition, useRef, useCallback } from "react";
import { Button } from "@/shadcomponents/ui/button";
import { Info, Trash2, GripVertical } from "lucide-react";
import ProjectsForm from "./projectform";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};



export default function Projects({ projectArray = [], onProjectsArrayChange = () => {} }) {
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
    setLocalProjectForms(prev => {
      const map = Object.fromEntries(prev.map(f => [f.key, f]));
      return projectArray.map((proj, i) => {
        const key = proj.id ?? i;
        if (map[key]) return map[key];
        return { 
          project_name: proj.project_name || proj.name || "",
          achievements: proj.achievements || "",
          bullets: proj.bullets || proj.description || [""],
          key, 
          _localId: `proj-${key}` 
        };
      });
    });
  }, [projectArray]);

  const handleChange = useCallback((localId, updatedFields) => {
    setLocalProjectForms(prevForms => {
      const updatedForms = prevForms.map(form =>
        form._localId === localId ? { ...form, ...updatedFields } : form
      );
      debouncedUpdateParent(updatedForms);
      return updatedForms;
    });
  }, [debouncedUpdateParent]);

  const handleAddProject = () => {
    const newForm = {
      project_name: "",
      achievements: "",
      bullets: [""],
      _localId: `proj-new-${Date.now()}`,
      key: `new-${Date.now()}`
    };
    const updatedForms = [...localProjectForms, newForm];
    setLocalProjectForms(updatedForms);
    startTransition(() => {
      debouncedUpdateParent(updatedForms);
    })
  };

  const handleRemoveProject = (localId) => {
    const updatedForms = localProjectForms.filter(f => f._localId !== localId);
    setLocalProjectForms(updatedForms);
    startTransition(() => {
      debouncedUpdateParent(updatedForms);
    })
  };

  return (
    <div className="border-gray-400 w-[40rem] p-8 space-y-5 overflow-hidden font-sans">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-sm text-gray-400">
          Show employers your past experience and what you have accomplished
        </p>
        <p className="border p-2 text-xs rounded-md bg-blue-100 flex items-center border-blue-200">
          <Info className="w-5 h-5 mr-2 text-blue-500" />
          <span className="text-blue-500">Click here to see project formatting tips</span>
        </p>
      </div>
      
      {localProjectForms.map((projectWithId) => (
        <div key={projectWithId._localId} className="flex justify-center items-center space-x-2">
          <GripVertical className="h-4 w-4 text-gray-400" />
          <div className="flex-grow">
            <ProjectsForm
              key={projectWithId._localId}
              id={projectWithId._localId}
              data={projectWithId}
              onChange={handleChange}
            />
          </div>
          <Trash2
            className="h-4 w-4 text-gray-400 hover:text-red-400 hover:bg-gray-50 rounded-md cursor-pointer"
            onClick={() => handleRemoveProject(projectWithId._localId)}
          />
        </div>
      ))}
      
      <Button
        onClick={handleAddProject}
        className="rounded-md w-fit bg-blue-500 p-2 text-white font-sans font-semibold hover:bg-blue-400"
      >
        Add More +
      </Button>
    </div>
  );
}