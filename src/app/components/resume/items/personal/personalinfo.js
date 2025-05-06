import { Label } from "@/shadcomponents/ui/label";
import { Input } from "@/shadcomponents/ui/input";
import { Textarea } from "@/shadcomponents/ui/textarea";

export default function PersonalInfo() {
  return (
    <div className="p-8 rounded-md">
      <div>
        <h1 className="font-sans text-2xl font-semibold">
          Personal Information
        </h1>
        <p className="text-sm font-sans text-gray-400">
          Show employers where they can contact you
        </p>
      </div>

      <div className="py-6 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="school">School</Label>
          <Input id="school" defaultValue="University of Toronto" />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="major">Major</Label>
          <Input id="major" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1 space-y-2">
            <Label htmlFor="start_year">Start Year</Label>
            <Input id="start_year" />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <Label htmlFor="end_year">End Year</Label>
            <Input id="end_year" />
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Textarea
            id="skills"
            placeholder="e.g., Python, Java, React, SQL, AWS..."
          />
        </div>

        {/* Education Section */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="education">Education Summary</Label>
          <Textarea
            id="education"
            placeholder="Summarize your degrees, courses, GPA, honors, etc."
          />
        </div>
      </div>
    </div>
  );
}
