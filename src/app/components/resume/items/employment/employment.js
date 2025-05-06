"use client";

import { useState } from "react";
import EmploymentForm from "./employmentform";

import { Button } from "@/shadcomponents/ui/button";

import { Info } from "lucide-react"

import { Grip } from "lucide-react"


export default function Employment({ experience_data }) {
  const [employmentForms, setEmploymentForms] = useState(
    experience_data.map((item, i) => ({ id: i + 1, ...item }))
  );
  const [nextId, setNextId] = useState(employmentForms.length + 1);
  const addEmploymentForm = () => {
    setEmploymentForms((prev) => [
      ...prev,
      {
        id: nextId,
        job_title: "",
        company: "",
        location: "",
        start_date: "",
        end_ate: "",
        description: [""],
      },
    ]);
    setNextId((id) => id + 1);
  };

  const handleFormChange = (id, updatedFields) => {
    setEmploymentForms((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedFields } : f))
    );
  };

  return (
    <div className=" border-gray-400 p-8 space-y-5 overflow-hidden font-sans">
      <div className = "space-y-2">
        <h1 className="font-sans text-2xl font-semibold">
          Employment History
        </h1>
        <p className="text-sm ">
          Show employers your past experience and what you have accomplished{" "}
        </p>

        <p className = "border-1 p-1 text-xs rounded-md bg-purple-100 flex items-center border-purple-200">
          <Info className = "w-6 h-6 p-1 text-purple-500" />
          <span className = "text-purple-500">
          Click Here To See Our Tips for Using AI
          </span>
        </p>
      </div>

      {employmentForms.map((form) => (
        <div className = "flex justify-center items-center space-x-2" key={form.id}>
          <Grip className = "h-4 w-4 text-gray-400"/>
          <EmploymentForm
            key={form.id}
            data={form}
            onChange={(updated) => handleFormChange(form.id, updated)}
        />
        </div>
      ))}

      <Button
        onClick={addEmploymentForm}
        className="rounded-md w-fit bg-purple-400 p-2 text-white font-sans font-semibold mx-6 hover:bg-purple-300"
      >
        Add More +
      </Button>
    </div>
  );
}
