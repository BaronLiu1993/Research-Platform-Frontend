"use client";

import { useState, useEffect, useRef, useTransition, useCallback } from "react";
import { Button } from "@/shadcomponents/ui/button";
import { GripVertical, Trash2, Info } from "lucide-react";
import ProjectForm from "./projectform";

// Debounce helper
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
  const [projectForms, setProjectForms] = useState([]);

  const debouncedUpdateParent = useRef(
    debounce((updatedForms) => {
      const cleaned = updatedForms.map(({ _localId, key, ...rest }) => rest);
      startTransition(() => {
        onProjectsArrayChange(cleaned);
      });
    }, 300)
  ).current;

  // Sync with incoming props
  useEffect(() => {
    setProjectForms((prev) => {
      const existingMap = Object.fromEntries(prev.map((p) => [p.key, p]));
      return projectArray.map((proj, i) => {
        const key = proj.id ?? i;
        return (
          existingMap[key] || {
            project_name: proj.project_name || proj.name || "",
            achievements: proj.achievements || "",
            bullets: proj.bullets || proj.description || [],
            _localId: `proj-${key}`,
            key,
          }
        );
      });
    });
  }, [projectArray]);

  const handleChange = useCallback(
    (localId, updatedFields) => {
      setProjectForms((prevForms) => {
        const updated = prevForms.map((form) =>
          form._localId === localId ? { ...form, ...updatedFields } : form
        );
        debouncedUpdateParent(updated);
        return updated;
      });
    },
    [debouncedUpdateParent]
  );

  const handleAddProject = () => {
    const timestamp = Date.now();
    const newForm = {
      project_name: "",
      achievements: "",
      bullets: [],
      _localId: `proj-${timestamp}`,
      key: `new-${timestamp}`,
    };
    const updated = [...projectForms, newForm];
    setProjectForms(updated);
    startTransition(() => debouncedUpdateParent(updated));
  };

  const handleRemoveProject = (localId) => {
    const updated = projectForms.filter((form) => form._localId !== localId);
    setProjectForms(updated);
    startTransition(() => debouncedUpdateParent(updated));
  };

  return (
    <div className="border-gray-400 p-8 space-y-5 overflow-hidden font-sans">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-sm text-gray-400">
          Show employers your past experience and what you have accomplished
        </p>
        <p className="border p-2 text-xs rounded-md bg-blue-100 flex items-center border-blue-200">
          <Info className="w-5 h-5 mr-2 text-blue-500" />
          <span className="text-blue-500">
            Click here to see project formatting tips
          </span>
        </p>
      </div>

      {projectForms.map((form) => (
        <div
          key={form._localId}
          className="flex justify-center items-start space-x-2"
        >
          <GripVertical className="h-4 w-4 text-gray-400 mt-4" />
          <div className="flex-grow">
            <ProjectForm
              key={form._localId}
              data={form}
              onChange={(data) => handleChange(form._localId, data)} // ✅ stays as is
            />
          </div>
          <Trash2
            className="h-5 w-5 text-gray-400 hover:text-red-400 hover:bg-gray-50 rounded-md cursor-pointer mt-4"
            onClick={() => handleRemoveProject(form._localId)}
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
