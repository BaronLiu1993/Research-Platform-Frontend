"use client";

import { useEffect, useState } from "react";
import ProjectForm from "./projectform";
import { Trash, Grip } from "lucide-react";

export default function Projects({ project_data }) {
  const [projectForms, setProjectForms] = useState([]);

  useEffect(() => {
    if (project_data) {
      const parsed = project_data.map((item, index) => ({
        id: index + 1,
        data: {
          project_name: item.name,
          bullets: item.description,
        },
      }));
      setProjectForms(parsed);
    }
  }, [project_data]);

  const addProjectForm = () => {
    setProjectForms((prevForms) => [
      ...prevForms,
      { id: prevForms.length + 1, data: {} },
    ]);
  };

  const handleChange = (index, updatedData) => {
    const updatedForms = [...projectForms];
    updatedForms[index].data = updatedData;
    setProjectForms(updatedForms);
  };

  return (
    <div className="rounded-md p-8 space-y-5">
      <div>
        <h1 className="font-sans text-2xl font-semibold">Projects</h1>
        <p className="text-sm font-sans text-gray-400">
          Show employers your past experience and what you have accomplished
        </p>
      </div>
      <div className="space-y-4">
        {projectForms.map((form, index) => (
          <div key={form.id} className="flex items-center space-x-2">
            <Grip className="h-4 w-4 text-gray-400" />
            <ProjectForm
              key={form.id}
              data={form.data}
              onChange={(data) => handleChange(index, data)}
            />
            <Trash
              className="h-5 w-5 text-gray-400 hover:text-red-400 hover:bg-gray-50 rounded-md cursor-pointer mt-4"
              onClick={() => {
                const updated = projectForms.filter((_, i) => i !== index);
                setProjectForms(updated);
              }}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={addProjectForm}
          className="rounded-md w-full bg-blue-500 p-2 text-white font-sans font-extralight"
        >
          Add More +
        </button>
      </div>
    </div>
  );
}
