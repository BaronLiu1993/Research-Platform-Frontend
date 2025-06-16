import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";

export default function DataPreview({ rowData }) {
  console.log(rowData);
  return (
    <div className="font-main antialiased text-gray-800">
      <div className = "text-md font-semibold px-6">
        <h1>Preview Recipients</h1>
        <div className = "font-light text-xs">Get a dedicated view of the variables for each </div>
      </div>
      <Accordion type="single" collapsible className="w-full p-4 max-w-[30rem]">
        {rowData.map((row) => (
          <AccordionItem
            value={row.original.id}
            key={row.original.id}
            className=" border-gray-200 border-none"
          >
            <AccordionTrigger className="flex items-center gap-2 p-3 text-sm hover:no-underline font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group border-none">
              <div className="flex items-center gap-1.5 flex-grow">
                <div className="text-gray-900 group-hover:text-blue-600">
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
