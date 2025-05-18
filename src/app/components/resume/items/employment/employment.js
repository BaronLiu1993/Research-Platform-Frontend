"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shadcomponents/ui/button";
import { Info, Trash2, GripVertical } from "lucide-react";
import EmploymentForm from "./employmentform";

export default function EmploymentSection({ experienceArray, onExperienceArrayChange }) {
  const [localExperienceForms, setLocalExperienceForms] = useState([]);
  
  useEffect(() => {
    setLocalExperienceForms(prev => {
      const map = Object.fromEntries(prev.map(f => [f.key, f]));      
      return experienceArray.map((exp, i) => {
        const key = exp.id ?? i;
        if (map[key]) return map[key];
        return { 
          ...exp, 
          key, 
          _localId: `exp-${key}-${Date.now()}` 
        };
      });
    });
  }, [experienceArray]);
  
  const strip = ({ _localId, key, ...d }) => d;
  
  const handleChange = (localId, updatedFormData) => {
    const updatedForms = localExperienceForms.map(form => 
      form._localId === localId ? { ...form, ...updatedFormData } : form
    );
    
    setLocalExperienceForms(updatedForms);
    
    const cleanedData = updatedForms.map(strip);
    onExperienceArrayChange(cleanedData);
  };
  
  // Handler for adding a new experience
  const handleAddExperience = () => {
    const newExperienceEntry = {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: [""],
      _localId: `exp-new-${Date.now()}`,
      key: `new-${Date.now()}`
    };
    
    // Update local state first
    const updatedForms = [...localExperienceForms, newExperienceEntry];
    setLocalExperienceForms(updatedForms);
    
    // Then notify parent with cleaned data
    const cleanedData = updatedForms.map(strip);
    onExperienceArrayChange(cleanedData);
  };
  
  // Handler for removing an experience
  const handleRemoveExperience = (formLocalId) => {
    // Update local state first
    const updatedForms = localExperienceForms.filter(form => 
      form._localId !== formLocalId
    );
    setLocalExperienceForms(updatedForms);
    
    // Then notify parent with cleaned data
    const cleanedData = updatedForms.map(strip);
    onExperienceArrayChange(cleanedData);
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
      
      {localExperienceForms.map((experienceWithId, index) => (
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