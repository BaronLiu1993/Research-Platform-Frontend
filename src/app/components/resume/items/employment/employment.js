"use client";

import { useState } from "react";
import EmploymentForm from "./employmentform";

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
    <div className=" border-gray-400 p-8 space-y-5 overflow-hidden">
      <div>
        <h1 className="font-sans text-md font-semibold">
          Employment History
        </h1>
        <p className="text-gray-400 text-sm">
          Show employers your past experience and what you have accomplished.…{" "}
        </p>
      </div>

      {employmentForms.map((form) => (
        <div className = "flex justify-center items-center" key={form.id}>
          <EmploymentForm
            key={form.id}
            data={form}
            onChange={(updated) => handleFormChange(form.id, updated)}
        />
        </div>
      ))}

      <button
        onClick={addEmploymentForm}
        className="rounded-md w-full bg-blue-500 p-2 text-white font-sans font-extralight"
      >
        Add More +
      </button>
    </div>
  );
}
