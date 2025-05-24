"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/dialog";
import { Button } from "@/shadcomponents/ui/button";
import { Badge } from "@/shadcomponents/ui/badge";
import { Label } from "@/shadcomponents/ui/label";
import Link from "next/link";
import { Check, University, BrainCircuit, Microscope } from "lucide-react";

export default function RowDialog({ data, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] font-sans">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{data.name}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Research Profile
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right font-semibold">School</Label>
            <Badge className="col-span-3 bg-sky-500">
              <University />
              {data.school || "—"}
            </Badge>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right font-semibold">Department</Label>
            <Badge className="col-span-3 bg-purple-500">
              <BrainCircuit />
              {data.department || "—"}
            </Badge>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right font-semibold">Faculty</Label>
            <Badge className="col-span-3 bg-green-500">
              <Microscope />
              {data.faculty || "—"}
            </Badge>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right font-semibold">Email</Label>
            <div className="col-span-3 underline text-blue-500">
              {data.email || "—"}
            </div>
          </div>
          <div className="grid grid-cols-3 items-start gap-4">
            <Label className="text-right font-semibold">Research Interests</Label>
            <div className="col-span-3 flex flex-wrap gap-1">
              {(data.research_interests || []).length ? (
                data.research_interests.map((interest, i) => (
                  <Badge key={i} className="text-xs">
                    {interest}
                  </Badge>
                ))
              ) : (
                <p>—</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2 p-2">
          <Label className="text-right font-semibold">Description</Label>
          <div className="border-2 rounded-md border-gray-100 p-4 font-extralight text-xs">
            {data.bio || "No bio available."}
          </div>
        </div>

        <DialogFooter>
          <Link
            href={{
              pathname: `/resume/${data.name}`,
              query: {
                research_interests: data.research_interests,
                professor_email: data.email,
                professor_name: data.name,
                professor_id: data.id,
              },
            }}
            className="w-full flex justify-end"
          >
            <Button>
              <Check className="w-4 h-4" />
              Apply
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
