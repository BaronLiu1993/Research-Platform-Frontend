"use client"

import { usePublicationStore } from "@/app/data/usePublicationStore"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/shadcomponents/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion"

import { removeSingleQuoteOrJson } from "@/app/api/fixjson"

import { Button } from "@/shadcomponents/ui/button"
import { Progress } from "@/shadcomponents/ui/progress"

export default function Publications() {
  const { setSelectedPublication } = usePublicationStore()

  const searchParams = useSearchParams()
  const name = searchParams.get("name")
  const email = searchParams.get("email")

  const [status, setStatus] = useState("idle")
  const [progress, setProgress] = useState(0)
  const [publications, setPublications] = useState([])

  async function integrateEditor () {
    try {
        
        const res = await fetch("http://127.0.0.1:8000/email/ai-publication-insertion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, //Hard Coded for now change later 
            body: JSON.stringify({ academic_publication: publications[0].url, interests: ["Biomedical Engineering"], related_skills: ["Python"]})
        })
        console.log(res.result)
        setSelectedPublication(res.result)
        //Change error handling to something else later
    } catch (err) {
        console.error(err)
    }
  }

  async function fetchPublications () {
    setStatus("loading")
    setProgress(10)
    //Clean up and separate into another component later
    try {
      const res = await fetch("http://127.0.0.1:8000/email/query-publications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ professor_name: name, professor_url: email }),
      })

      let count = 10
      const interval = setInterval(() => {
        count += 10
        if (count < 90) setProgress(count)
      }, 100)

      const data = await res.json()
      const processedData = removeSingleQuoteOrJson(data.result)
      const response = JSON.parse(processedData)
      setPublications(response)
      clearInterval(interval)
      setProgress(100)

      if (response) {
        setStatus("done")
      } else {
        throw new Error("Internal Server Error")
      }
    } catch (err) {
      setStatus("idle")
    }
  }

  return (
    <Card className="w-full p-2 h-full border-1 shadow-none">
      <div className="font-sans text-sm space-x-2">
        Publications
        <CardDescription className="font-sans text-xs">
          Personalise your cold email with the professors research.
        </CardDescription>
      </div>

      <div className="space-y-4">
        {status === "idle" && (
          <Button className = "text-xs" onClick={fetchPublications}>Fetch Publications</Button>
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
          <Accordion type="single" collapsible className="w-full mt-4 p-2">
            {publications.map((pub, idx) => (
              <AccordionItem className = "" key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="p-3 flex items-center space-x-2">
                    <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                    <div className ="font-sans">{pub.title}</div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className ="font-sans font-light text-xs">{pub.summary}</p>
                  <div className="space-x-2 flex justify-end">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="text-xs font-sans bg-white border border-gray-300 shadow-sm text-black hover:bg-white hover:text-black hover:shadow-md hover:border-gray-300 cursor-pointer">
                        View Source
                      </Button>
                    </a>
                    <Button
                        className="text-xs font-sans"
                        onClick={integrateEditor}
                    >
                    Incorporate
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Card>
  )
}
