"use client";

import { useState, useEffect, useTransition, useRef, useCallback } from "react";
import { Button } from "@/shadcomponents/ui/button";
import { Info, Trash2, GripVertical } from "lucide-react";
import EmploymentForm from "./employmentform";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function EmploymentSection({ experienceArray, onExperienceArrayChange }) {
  const [isPending, startTransition] = useTransition();
  const [localExperienceForms, setLocalExperienceForms] = useState([]);
  const debouncedUpdateParent = useRef(
    debounce((updatedForms) => {
      startTransition(() => {
        const cleaned = updatedForms.map(({ _localId, key, ...d }) => d);
        onExperienceArrayChange(cleaned);
      });
    }, 300)
  ).current;

  useEffect(() => {
    setLocalExperienceForms(prev => {
      const map = Object.fromEntries(prev.map(f => [f.key, f]));
      return experienceArray.map((exp, i) => {
        const key = exp.id ?? i;
        if (map[key]) return map[key];
        return { 
          ...exp, 
          key, 
          _localId: `exp-${key}` 
        };
      });
    });
  }, [experienceArray]);

  const handleChange = useCallback((localId, updatedFields) => {
    setLocalExperienceForms(prevForms => {
      const updatedForms = prevForms.map(form =>
        form._localId === localId ? { ...form, ...updatedFields } : form
      );
      debouncedUpdateParent(updatedForms);
      return updatedForms;
    });
  }, [debouncedUpdateParent]);

  const handleAddExperience = () => {
    const newForm = {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: [""],
      _localId: `exp-new-${Date.now()}`,
      key: `new-${Date.now()}`
    };
    const updatedForms = [...localExperienceForms, newForm];
    setLocalExperienceForms(updatedForms);
    startTransition(() => {
      debouncedUpdateParent(updatedForms);
    })
  };

  const handleRemoveExperience = (localId) => {
    const updatedForms = localExperienceForms.filter(f => f._localId !== localId);
    setLocalExperienceForms(updatedForms);
    startTransition(() => {
      debouncedUpdateParent(updatedForms);
    })
  };

  return (
    <div className="border-gray-400 p-8 space-y-5 overflow-hidden font-sans">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Employment History</h1>
        <p className="text-sm text-gray-400">
          Show employers your past experience and what you have accomplished
        </p>
        <p className="border p-2 text-xs rounded-md bg-purple-100 flex items-center border-purple-200">
          <Info className="w-5 h-5 mr-2 text-purple-500" />
          <span className="text-purple-500">Click Here To See Our Tips for Using AI</span>
        </p>
      </div>
      
      {localExperienceForms.map((experienceWithId) => (
        <div key={experienceWithId._localId} className="flex justify-center items-center space-x-2">
          <GripVertical className="h-4 w-4 text-gray-400" />
          <div className="flex-grow">
            <EmploymentForm
              key={experienceWithId._localId}
              id={experienceWithId._localId}
              data={experienceWithId}
              onChange={handleChange}
            />
          </div>
          <Trash2
            className="h-5 w-5 text-gray-400 hover:text-red-400 hover:bg-gray-50 rounded-md cursor-pointer"
            onClick={() => handleRemoveExperience(experienceWithId._localId)}
          />
        </div>
      ))}
      
      <Button
        onClick={handleAddExperience}
        className="rounded-md w-fit bg-purple-400 p-2 text-white font-sans font-semibold mx-6 hover:bg-purple-300"
      >
        Add More +
      </Button>
    </div>
  );
}
