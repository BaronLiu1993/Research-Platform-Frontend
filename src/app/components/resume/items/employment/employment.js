"use client";

import { useState, useEffect, useTransition, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid"; // Make sure uuidv4 is imported
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
  Pencil,
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
      const prevFormsMap = new Map(prev.map((f) => [f._localId, f]));

      return experienceArray.map((exp) => {
        let newLocalId = exp._localId;
        if (!newLocalId) {
          newLocalId = uuidv4();
        } else if (typeof newLocalId === "number") {
          newLocalId = uuidv4();
        }

        const existingLocalForm = prevFormsMap.get(newLocalId);

        if (existingLocalForm) {
          return {
            ...existingLocalForm,
            ...exp,
            _localId: newLocalId,
            key: newLocalId,
          };
        } else {
          return {
            ...exp,
            _localId: newLocalId,
            key: newLocalId,
          };
        }
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
    const newUniqueId = uuidv4();
    const newForm = {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: [""],
      _localId: newUniqueId,
      key: newUniqueId,
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
          By Jie Xuan Liu
          <span className="text-blue-700 font-normal">
            {" "}
            @ Temerty School of Medicine
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
        <p className="text-[13px] text-neutral-700">
          These points provide contextual grounding for your outreach email.
          Manually select your most impactful resume highlights—or allow AI to
          optimize the selection{" "}
        </p>

        <div className=" text-gray-800 text-sm font-light">
          {loadedResumePoints.length === 0 ? (
            <h1 className="text-sm text-neutral-400">No Points Loaded</h1>
          ) : (
            <div className="flex flex-wrap gap-2">
              {loadedResumePoints.map((point, index) => (
                <Badge
                  key={uuidv4()} // Using uuidv4 for these badges too, to be absolutely sure.
                  className="text-xs font-normal px-2 py-1 bg-neutral-300 text-neutral-800"
                >
                  {point.slice(0, 20)}
                  {point.length > 30 ? "..." : ""}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Separator className="my-5" />
        <div className="space-y-5">
          <h2 className="text-sm font-semibold text-black mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Experience Editor</span>
              <Badge>
                <Pencil />
                Edit With AI
              </Badge>
            </div>
          </h2>
          <p className="text-[13px] text-neutral-700">
            <span className="bg-yellow-200 px-0.5">Highlight any text</span>{" "}
            you’d like to refine, then choose an option—whether it's improving{" "}
            <span className="text-blue-700">grammar</span>, enhancing{" "}
            <span className="text-blue-700">clarity</span>, or generating{" "}
            <span className="text-blue-700">ideas</span>.
          </p>
          {localExperienceForms.map((experienceWithId) => (
            <div
              key={experienceWithId.key} // THIS MUST BE UNIQUE! (guaranteed by uuidv4 in useEffect)
              className="flex justify-center items-center space-x-2"
            >
              <GripVertical className="h-5 w-5 text-neutral-400" />
              <div className="flex-grow">
                <EmploymentForm
                  id={experienceWithId._localId} // The EmploymentForm's 'id' prop will be the UUID
                  data={experienceWithId}
                  onChange={handleChange}
                  loadedResumePoints={loadedResumePoints}
                  sendResumePoint={handleLoadingResumePoints}
                  removeResumePoint={handleRemoveResumePoint}
                />
              </div>
              <Trash2
                className="h-5 w-5 text-gray-400 hover:text-red-400 hover:bg-gray-50 rounded-md cursor-pointer"
                onClick={() =>
                  handleRemoveExperience(experienceWithId._localId)
                }
              />
            </div>
          ))}
        </div>
        <Separator className="my-6" />
        <button
          onClick={handleAddExperience}
          className="rounded-md w-fit p-2 text-white font-main font-semibold cursor-pointer"
        >
          <Badge>Add More +</Badge>
        </button>
      </div>
    </div>
  );
}
