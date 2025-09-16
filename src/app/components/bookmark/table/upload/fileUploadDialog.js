"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/shadcomponents/ui/composedialog";
import { Button } from "@/shadcomponents/ui/button";
import {
  CloudUpload,
  Download,
  File as FileIcon,
  FileCheck2,
  FileX2,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export function FileUploadDialog({
  id, 
  title,
  parsedData, 
  file, 
  setFile, 
  onUpload, 
  accept = ".pdf,.png,.jpg,.jpeg",
}) {
  const [submitting, setSubmitting] = useState(false);
  const present = Boolean(parsedData?.success);
  const triggerText = present
    ? `${title} on Drive – View / Replace`
    : `${title} Missing – Upload`;

  const handleUpload = async () => {
    if (!file || submitting) return;
    try {
      setSubmitting(true);
      await onUpload();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs ${
            present ? "bg-[#EDF3EC] text-[#448361]" : "bg-[#FDEBEC] text-[#D44C47]"
          }`}
        >
          {present ? <FileCheck2 className="h-4 w-4" /> : <FileX2 className="h-4 w-4" />}
          <span>{triggerText}</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xl p-0 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white border-b">
          <div className="px-6 py-4">
            <DialogHeader>
              <DialogTitle className="text-lg">{title}</DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Preview the file on Drive or upload a new version.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {present && (
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3
                    className="font-medium text-sm truncate"
                    title={parsedData?.data?.name}
                  >
                    {parsedData?.data?.name}
                  </h3>
                  <p className="text-[11px] text-gray-500">Stored on Google Drive</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {parsedData?.data?.webViewLink && (
                    <a
                      className="text-[#37352F] rounded-md hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs px-2 py-1 inline-flex items-center"
                      target="_blank"
                      href={parsedData.data.webViewLink}
                    >
                      <FileIcon className="mr-1 w-4 h-4" /> View
                    </a>
                  )}
                  {parsedData?.data?.webContentLink && (
                    <a
                      className="text-[#37352F] hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs px-2 py-1 rounded-md inline-flex items-center"
                      target="_blank"
                      href={parsedData.data.webContentLink}
                    >
                      <Download className="mr-1 w-4 h-4" /> Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg border-2 border-dashed border-slate-300 p-5 text-center">
            {!file ? (
              <label htmlFor={`file-input-${id}`} className="cursor-pointer inline-flex flex-col items-center gap-1">
                <CloudUpload className="w-6 h-6" />
                <span className="font-medium text-sm">Choose a file or drag and drop</span>
                <span className="text-gray-400 text-xs">PDF, PNG, JPG</span>
              </label>
            ) : (
              <div className="flex items-center justify-between gap-3 text-left">
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm truncate" title={file.name}>{file.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{Math.ceil(file.size / 1000)} KB</span>
                    <span className="bg-gray-300 rounded-full h-1 w-1" />
                    <span className="text-red-500 font-medium">Not uploaded</span>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="p-1 rounded-md hover:bg-[#FDEBEC]"
                  aria-label={`Remove ${title} file`}
                >
                  <Trash2 className="text-gray-500 w-5 h-5" />
                </button>
              </div>
            )}
            <input
              id={`file-input-${id}`}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              type="file"
              accept={accept}
              className="hidden"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-white flex justify-end gap-2">
          <DialogClose className="text-sm font-medium inline-flex items-center gap-1 text-white bg-[#D44C47] px-3 py-1.5 rounded-md hover:bg-[#B91C1C]">
            Close
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleUpload}
              disabled={!file || submitting}
              className="text-sm font-medium inline-flex items-center gap-1 text-white bg-[#4DAB9A] px-3 py-1.5 rounded-md hover:bg-[#3B8C7E] disabled:opacity-60"
            >
              {submitting ? "Uploading…" : "Upload"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
