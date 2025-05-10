"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { removeSingleQuoteOrJson } from "@/app/api/fixjson";
import { Button } from "@/shadcomponents/ui/button";
import { Progress } from "@/shadcomponents/ui/progress";

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
      <div className="text-sm flex flex-col justify-start items-start font-sans">
        <h1 className = "font-semibold">
          Publications
        </h1>
        <h2 className="text-xs font-light">
          Personalise your cold email with the professor’s research.
        </h2>
      </div>

      <div className=" text-sm break-words">
        {status === "idle" && (
          <Button size="xs" className="text-xs p-1 cursor-pointer" onClick={fetchPublications}>
            Fetch Publications
          </Button>
        )}

        {status === "loading" && (
          <div>
            <p className="text-sm text-gray-500 font-sans mb-2">
              Fetching publications...
            </p>
            <Progress value={progress} />
          </div>
        )}

        {status === "done" && publications.length > 0 && (
          <Accordion type="single" collapsible className="w-full space-y-2">
            {publications.map((pub, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border-b"
              >
                <AccordionTrigger className="text-sm font-sans break-words flex  justify-center items-center">
                  <div className="h-3 w-3 bg-green-400 rounded-full mr-2 flex-shrink-0"></div>
                  <span className="whitespace-normal break-words text-left w-full">
                    {pub.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="mt-2 space-y-2 text-xs font-light font-sans break-words">
                  <p className="whitespace-pre-wrap">{pub.summary}</p>
                  <div className="flex justify-end space-x-2 flex-wrap p-2">
                    <Link
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-[50%]"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs font-sans w-full"
                      >
                        View Source
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="text-xs font-sans max-w-[50%]"
                      onClick={sendInputPublication(pub)}
                    >
                      Load Publication
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
