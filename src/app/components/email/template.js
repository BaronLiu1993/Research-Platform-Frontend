import { Button } from "@/shadcomponents/ui/button";
import { Textarea } from "@/shadcomponents/ui/textarea";

import {
  ChevronsUpDown,
  SquarePen,
  Grid3X3,
  Lightbulb,
  Sparkles,
  RefreshCw,
  Plus,
} from "lucide-react";

export function Template() {
  return (
    <div className="min-h-screen font-sans bg-white flex flex-col items-center py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Hello!{" "}
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </h1>
        <p className="text-gray-500 mt-2">
          Load an Email Template to Get Started
        </p>
      </div>

      {/* Chat Input Section */}
      <div className="w-full max-w-2xl font-sans bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" className="text-gray-600 flex items-center">
            <SquarePen className="mr-2 h-4 w-4" /> Composing New Email
          </Button>
          <Button variant="ghost" size="icon">
            <Grid3X3 className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div className="relative mb-4">
          <Textarea
            placeholder="Loaded Template Here"
            className="w-full p-3 pr-10 min-h-[100px] resize-none border-gray-300 focus-visible:ring-offset-0 focus-visible:ring-transparent"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-gray-500"
          >
            <Sparkles className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-full max-w-2xl">
            {/*These are all going to be dialog boxes that people can view and then insert a template from a website that is known to work and why is it good and thing like that*/}
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Suggested Template Choices
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full">
                Mystical Forest Portal
              </Button>
              <Button variant="outline" className="rounded-full">
                Neon City Streets
              </Button>
              <Button variant="outline" className="rounded-full">
                Lotus Temple
              </Button>
            </div>
            <div className="flex items-center mt-4 text-sm text-gray-600">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh Templates
            </div>
          </div>
          <div className = "flex justify-end gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" /> Suggest
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" /> Insert Your Own
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
