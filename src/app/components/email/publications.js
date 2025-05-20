"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Switch } from "@/shadcomponents/ui/switch";
import { Label } from "@/shadcomponents/ui/label";

export default function Publications({ publication_data }) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [publications, setPublications] = useState([]);

  const sendInputPublication = (publication) => {
    publication_data(publication);
  };

  async function fetchPublications() {
    setStatus("loading");
    setProgress(10);
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/email/query-publications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ professor_name: name, professor_url: email }),
        }
      );

      let count = 10;
      const interval = setInterval(() => {
        count += 10;
        if (count < 90) setProgress(count);
      }, 100);

      const data = await res.json();
      const processedData = removeSingleQuoteOrJson(data.result);
      const response = JSON.parse(processedData);
      setPublications(response);
      clearInterval(interval);
      setProgress(100);
      setStatus(response ? "done" : "idle");
    } catch (err) {
      setStatus("idle");
    }
  }

  return (
    <div className="w-fit border font-san bg-white rounded-md shadow-none p-4 flex flex-col justify-start items-start space-y-2">
      <div className="text-sm flex justify-start items-start font-sans">
        <div>
          <h1 className="font-semibold">Publications Mode</h1>
          <h2 className="text-xs font-light">
            Personalise your email with the professor's publications that best
            align with your interests and skills.
          </h2>
        </div>
        <div className="flex space-x-2">
          <Switch id="airplane-mode" />
        </div>
      </div>
    </div>
  );
}
