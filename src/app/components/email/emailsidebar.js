import {
  Accordion,
  AccordionTrigger,
  AccordionHeader,
} from "@/shadcomponents/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcomponents/ui/card";
import { Info } from "lucide-react";

export default function EmailSideBar({ publications }) {
  console.log(publications);
  return (
    <>
      <div className="border-l-1 p-7 space-y-5">
        <h2 className="flex space-x-2 font-semibold border-2 text-xs font-sans items-center px-2 bg-red-200 rounded-md text-red-500">
          <Info className="h-4 w-4" />
          <span className="">Please Cross Reference Publications</span>
        </h2>
        <Card>
          <CardTitle className="font-sans ">
            <CardDescription className="text-xs mx-5">
              <h1 className="text-sm flex space-x-2 text-black">Publications</h1>
              <h2 className = "font-normal">Review Publications Added for Relevance and Accuracy</h2>
            </CardDescription>
          </CardTitle>
          <CardContent className="flex justify-center items-center gap-2 rounded-md p-3 border-1 bg-gray-100 mx-2">
            <div>
              <p className="text-gray-400 text-xs">Research</p>
              <p className="text-xs font-bold">
                Laser interstitial thermal therapy of lung lesions near large
                vessels: a numerical study
              </p>
            </div>
          </CardContent>
          <CardContent className="flex justify-center items-center gap-2 rounded-md p-3 border-1 bg-gray-100 mx-2">
            <div>
              <p className="text-gray-400 text-xs">Research</p>
              <p className="text-xs font-bold">
                Laser interstitial thermal therapy of lung lesions near large
                vessels: a numerical study
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-[13rem] ">
          <CardTitle className="font-sans ">
            <CardContent className="text-sm flex space-x-2">
              <div className="h-4 w-4 bg-red-500"></div>
              <span>Spell Check</span>
            </CardContent>
            <CardDescription className="text-xs ml-5">
              Review the provided English text and identify any spelling errors
            </CardDescription>
          </CardTitle>
        </Card>
        <Card className="w-[13rem] ">
          <CardTitle className="font-sans ">
            <CardContent className="text-sm flex space-x-2">
              <div className="h-4 w-4 bg-orange-500"></div>
              <span>Specificity</span>
            </CardContent>
            <CardDescription className="text-xs ml-5">
              Review the provided English text and identify any spelling errors
            </CardDescription>
          </CardTitle>
        </Card>
      </div>
    </>
  );
}
