import { Label } from "@/shadcomponents/ui/label";
import { Input } from "@/shadcomponents/ui/input";

export default function Contact({ contact_data }) {
  return (
    <div className="p-8 rounded-md">
      <div>
        <h1 className="font-sans text-2xl font-semibold">Contact Information</h1>
        <p className="text-sm font-sans text-gray-400">
            Show employers where they can contact you
        </p>
      </div>

      <div className="py-6 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            defaultValue={contact_data.email}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            defaultValue={contact_data.linkedin}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            defaultValue={contact_data.phone}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            defaultValue={contact_data.country || ""}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1 space-y-2">
            <Label htmlFor="province">Province</Label>
            <Input
              id="province"
              defaultValue={contact_data.province || ""}
            />
          </div>

          <div className="flex flex-col flex-1 space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              defaultValue={contact_data.address || ""}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            defaultValue={contact_data.university || "University of Toronto"}
          />
        </div>
      </div>
    </div>
  );
}
