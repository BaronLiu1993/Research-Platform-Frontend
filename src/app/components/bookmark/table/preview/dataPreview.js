import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { Badge } from "@/shadcomponents/ui/badge";

export default function DataPreview({ rowData, userId }) {
  console.log(rowData);
  return (
    <div className="font-main antialiased text-gray-800 ">
      <div className="text-xs font-semibold px-6">
        <div className = "flex gap-2 items-center">
          <h1>Preview Recipients</h1>
          <Badge className = "text-xs rounded-xs text-[#D44C47] bg-[#FDEBEC]">Not Synced</Badge>
        </div>
        <div className="font-light text-xs">
          Get a dedicated view of the variables for each professor{" "}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full p-4 max-w-[30rem]">
        {rowData.map((row) => (
          <AccordionItem
            value={row.original.id}
            key={row.original.id}
            className=" border-gray-200 border-none"
          >
            <AccordionTrigger className="flex items-center gap-2 p-3 text-xs hover:no-underline rounded-xs font-medium text-[#37352F] hover:bg-[#F1F1EF] transition-colors duration-200 cursor-pointer group border-none">
              <div className="flex items-center gap-1.5 flex-grow">
                <div className="text-gray-900 group-hover:text-[#337EA9]">
                  {row.original.name}
                </div>
                <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                <div className="text-gray-500">{row.original.email}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-2 pt-0 px-3 text-sm text-gray-600 bg-gray-50 border-t border-gray-100">
              <div className="grid grid-cols-1 gap-1 py-2">
                {row.original.labs && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Labs:</span>
                    <span>{row.original.labs}</span>
                  </div>
                )}
                {row.original.department && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Department:
                    </span>
                    <span>{row.original.department}</span>
                  </div>
                )}
                {row.original.faculty && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Faculty:</span>
                    <span>{row.original.faculty}</span>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
