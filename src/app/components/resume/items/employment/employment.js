"use client";

import { useState, useEffect, useTransition, useRef, useCallback } from "react";
import { Button } from "@/shadcomponents/ui/button";
import {
  Info,
  Trash2,
  GripVertical,
  Sheet,
  Wrench,
  ArrowLeftRight,
  BrainCircuit,
  ChevronsUpDown,
  Mic,
} from "lucide-react";
import EmploymentForm from "./employmentform";
import { Badge } from "@/shadcomponents/ui/badge";
import { Separator } from "@/shadcomponents/ui/separator";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function Employment({
  experienceArray,
  onExperienceArrayChange,
}) {
  const [isPending, startTransition] = useTransition();
  const [localExperienceForms, setLocalExperienceForms] = useState([]);
  const [loadedResumePoints, setLoadedResumePoints] = useState([]);
  const [useAIRanker, setUseAIRanker] = useState(false);

  const handleLoadingResumePoints = useCallback(
    (data) => {
      setLoadedResumePoints((prevPoints) => [...prevPoints, data]);
    },
    [loadedResumePoints]
  );

  const handleRemoveResumePoint = useCallback((pointToRemove) => {
    setLoadedResumePoints((prevPoints) => {
      const updatedPoints = prevPoints.filter(
        (point) => point !== pointToRemove
      );
      return updatedPoints;
    });
  }, []);

  const toggleAIResumeLoading = () => {
    if (useAIRanker) {
      setUseAIRanker(false);
    } else {
      setUseAIRanker(true);
    }
  };

  const debouncedUpdateParent = useRef(
    debounce((updatedForms) => {
      startTransition(() => {
        const cleaned = updatedForms.map(({ _localId, key, ...d }) => d);
        onExperienceArrayChange(cleaned);
      });
    }, 300)
  ).current;

  useEffect(() => {
    setLocalExperienceForms((prev) => {
      const map = Object.fromEntries(prev.map((f) => [f.key, f]));
      return experienceArray.map((exp, i) => {
        const key = exp.id ?? i;
        if (map[key]) return map[key];
        return {
          ...exp,
          key,
          _localId: `exp-${key}`,
        };
      });
    });
  }, [experienceArray]);

  const handleChange = useCallback(
    (localId, updatedFields) => {
      setLocalExperienceForms((prevForms) => {
        const updatedForms = prevForms.map((form) =>
          form._localId === localId ? { ...form, ...updatedFields } : form
        );
        debouncedUpdateParent(updatedForms);
        return updatedForms;
      });
    },
    [debouncedUpdateParent]
  );

  const handleAddExperience = () => {
    const newForm = {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: [""],
      _localId: `exp-new-${Date.now()}`,
      key: `new-${Date.now()}`,
    };
    const updatedForms = [...localExperienceForms, newForm];
    setLocalExperienceForms(updatedForms);
    startTransition(() => {
      debouncedUpdateParent(updatedForms);
    });
  };

  const handleRemoveExperience = (localId) => {
    const updatedForms = localExperienceForms.filter(
      (f) => f._localId !== localId
    );
    setLocalExperienceForms(updatedForms);
    startTransition(() => {
      debouncedUpdateParent(updatedForms);
    });
  };

  return (
    <div className="border-gray-400 p-8 w-[40rem] space-y-5 overflow-hidden font-main">
      <div className="space-y-2 bg-neutral-100 p-4 rounded-xs border-1">
        <h1 className="text-xl font-semibold text-neutral-800 flex gap-2 items-center">
          Maximisming Experience
          <Badge>
            <Mic />
            Some Advice
          </Badge>
          <ChevronsUpDown className="h-4 w-4" />
        </h1>
        <p className="text-xs font-semibold">
          By Jie Xuan Liu @ {"McMaster Medical School"}
        </p>
        <p className="text-[13px] text-neutral-700 mt-10">
          Agents can be{" "}
          <span className="text-black font-semibold px-0.5">unreliable</span>{" "}
          and may need human input to successfully accomplish tasks. Similarly,
          for some actions, you may want to require human{" "}
          <span className="bg-neutral-200 px-0.5">approval</span> before running
          to ensure that everything is running as intended.
        </p>
        <p className="text-[13px] text-neutral-700">
          LangGraph's <span className="text-blue-700">persistence</span> layer
          supports{" "}
          <span className="font-semibold text-black">human-in-the-loop</span>{" "}
          workflows, allowing execution to pause and resume based on user
          feedback. The primary interface to this functionality is the interrupt
          function.
        </p>
        <p></p>
        <p className="border p-2 text-xs rounded-md bg-blue-100 flex items-center border-blue-200">
          <Info className="w-5 h-5 mr-2 text-blue-700" />
          <span className="text-blue-500">
            Click Here To See Our Tips for Using AI Responsibly
          </span>
        </p>
        <Separator className="my-5" />
        <h2 className="text-sm font-semibold text-black mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Loaded Resume Points</span>
            {useAIRanker ? (
              <Badge>
                <Wrench />
                Manual
              </Badge>
            ) : (
              <Badge>
                <BrainCircuit />
                AI Assisted
              </Badge>
            )}
          </div>
          <button
            onClick={() => toggleAIResumeLoading()}
            className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeftRight className="h-4 w-4 cursor-pointer" />
          </button>
        </h2>

        <div className=" text-gray-800 text-sm font-light">
          {loadedResumePoints.length === 0 ? (
            <h1>No Points Loaded</h1>
          ) : (
            loadedResumePoints.map((point, index) => (
              <div className="list-disc list-item" key={index}>
                <h1 className="text-xs">{point}</h1>
              </div>
            ))
          )}
        </div>
        <div>
        {localExperienceForms.map((experienceWithId) => (
        <div
          key={experienceWithId._localId}
          className="flex justify-center items-center space-x-2"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
          <div className="flex-grow">
            <EmploymentForm
              key={experienceWithId._localId}
              id={experienceWithId._localId}
              data={experienceWithId}
              onChange={handleChange}
              loadedResumePoints={loadedResumePoints}
              sendResumePoint={handleLoadingResumePoints}
              removeResumePoint={handleRemoveResumePoint}
            />
          </div>
          <Trash2
            className="h-4 w-4 text-gray-400 hover:text-red-400 hover:bg-gray-50 rounded-md cursor-pointer"
            onClick={() => handleRemoveExperience(experienceWithId._localId)}
          />
        </div>
      ))}
        </div>
      </div>

      

      <Button
        onClick={handleAddExperience}
        className="rounded-md w-fit bg-purple-400 p-2 text-white font-main font-semibold mx-6 hover:bg-purple-300"
      >
        Add More +
      </Button>
    </div>
  );
}
