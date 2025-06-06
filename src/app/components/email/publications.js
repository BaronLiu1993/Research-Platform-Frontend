import { Switch } from "@/shadcomponents/ui/switch";

export default function Publications() {
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
