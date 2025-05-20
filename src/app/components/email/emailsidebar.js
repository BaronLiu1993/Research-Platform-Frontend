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
          <Info className = "h-4 w-4"/>
          <span className="">Please Cross Reference Publications</span>
        </h2>
        <Card>
          <CardTitle className="font-sans ">
            <CardContent className="text-sm flex space-x-2">
              <div className="h-4 w-4 bg-red-500"></div>
              <span>Publications</span>
            </CardContent>
            <CardDescription className="text-xs ml-5">
              <h2>Review Publications Added</h2>
            </CardDescription>
          </CardTitle>
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
