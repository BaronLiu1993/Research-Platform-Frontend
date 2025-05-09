"use client";

import { useState, useEffect } from "react";
import EmploymentForm from "./employmentform";
import { Button } from "@/shadcomponents/ui/button";
import { Info, Trash2, GripVertical } from "lucide-react";

export default function ExperienceSection({ experienceArray, onExperienceArrayChange }) {
  const [localExperienceForms, setLocalExperienceForms] = useState([]);

  useEffect(() => {
    setLocalExperienceForms(
      experienceArray.map((exp, index) => ({
        ...exp,
        _localId: exp.id || `exp-${Date.now()}-${index}`,
      }))
    );
  }, [experienceArray]);

  const stripLocalId = (formWithId) => {
    const { _localId, ...data } = formWithId;
    return data;
  };

  const handleAddExperience = () => {
    const newExperienceEntryRaw = {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: [""],
    };
    const updatedDataArray = [...localExperienceForms.map(stripLocalId), newExperienceEntryRaw];
    onExperienceArrayChange(updatedDataArray);
  };

  const handleFormChange = (formLocalId, changedFields) => {
    const updatedDataArray = localExperienceForms.map((form) =>
      form._localId === formLocalId
        ? stripLocalId({ ...form, ...changedFields })
        : stripLocalId(form)
    );
    onExperienceArrayChange(updatedDataArray);
  };

  const handleRemoveExperience = (formLocalId) => {
    const updatedDataArray = localExperienceForms
      .filter((form) => form._localId !== formLocalId)
      .map(stripLocalId);
    onExperienceArrayChange(updatedDataArray);
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
              data={stripLocalId(experienceWithId)}
              onChange={(changedFields) =>
                handleFormChange(experienceWithId._localId, changedFields)
              }
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