import React, { useEffect, useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

// ShadCN UI Components (adjust import path as per your setup)
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shadcomponents/ui/dialog";

import { Badge } from "@/shadcomponents/ui/badge"; 
import { Button } from "@/shadcomponents/ui/button";

import { Check } from "lucide-react";

import { Hand } from 'lucide-react';


function mapResumeToTipTap(resume) {
  if (!resume || typeof resume !== "object") {
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "No resume data available." }],
        },
      ],
    };
  }

  const doc = {
    type: "doc",
    content: [],
  };

  const pushHeading = (text, level = 2, attrs = {}) => {
    doc.content.push({
      type: "heading",
      attrs: { level, ...attrs },
      content: [{ type: "text", text, marks: [{ type: "bold" }] }],
    });
  };

  const pushParagraph = (text, marks = [], attrs = {}) => {
    if (text && text.trim() !== "") {
        doc.content.push({
            type: "paragraph",
            attrs,
            content: [{ type: "text", text, marks }],
        });
    }
  };

  const pushBulletList = (items) => {
    if (items && items.length > 0) {
        doc.content.push({
            type: "bulletList",
            content: items.map((item) => ({
            type: "listItem",
            content: [
                {
                type: "paragraph",
                content: [{ type: "text", text: item }],
                },
            ],
            })),
        });
    }
  };

  const pushHeaderLineWithDate = (leftText, rightText, leftMarks = [], leftAttrs = {}, rightAttrs = {}) => {
    doc.content.push({
      type: 'table',
      content: [
        {
          type: 'tableRow',
          content: [
            { 
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1 },
              content: [{
                type: 'paragraph',
                attrs: { textAlign: 'left', ...leftAttrs },
                content: [{ type: 'text', text: leftText, marks: leftMarks }],
              }],
            },
            { 
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1 },
              content: [{
                type: 'paragraph',
                attrs: { textAlign: 'right', ...rightAttrs },
                content: [{ type: 'text', text: rightText }],
              }],
            },
          ],
        },
      ],
    });
  };

  pushHeading(resume.name || "Your Name", 1, { textAlign: "center" });
  const contact = resume.contact_information || {};
  const contactLines = [];
  if (contact.phone) contactLines.push(contact.phone);
  if (contact.email) contactLines.push(contact.email);
  if (contact.linkedin) contactLines.push(`linkedin: ${contact.linkedin}`);
  if (contact.github) contactLines.push(`github: ${contact.github}`);
  if (contact.website) contactLines.push(contact.website);
  if (contactLines.length) {
    pushParagraph(contactLines.join("  |  "), [], { textAlign: "center", class: "contact-info" });
  }

  if (resume.education && resume.education.length > 0) {
    pushHeading("EDUCATION", 2, { class: "section-title" });
    doc.content.push({ type: "horizontalRule" });
    resume.education.forEach((edu) => {
      const dateRange = `${edu.start_date ? `${edu.start_date} - ` : ""}${edu.end_date || "Present"}`;
      pushHeaderLineWithDate(edu.school || "University Name", dateRange, [{ type: "bold" }]);
      pushParagraph(edu.degree || "Degree Name", [{ type: "italic" }]);
      pushParagraph(edu.location || "City, Country");
      if (edu.details?.length) pushBulletList(edu.details);
    });
  } else if (resume.education !== undefined) {
    pushHeading("EDUCATION", 2, { class: "section-title" });
    doc.content.push({ type: "horizontalRule" });
    pushParagraph("No education entries available.");
  }

  if (resume.experience && resume.experience.length > 0) {
    pushHeading("WORK EXPERIENCE", 2, { class: "section-title" });
    doc.content.push({ type: "horizontalRule" });
    resume.experience.forEach((exp) => {
      const dateRange = `${exp.start_date ? `${exp.start_date} - ` : ""}${exp.end_date || "Present"}`;
      pushHeaderLineWithDate(exp.job_title || "Job Title", dateRange, [{ type: "bold" }]);
      pushParagraph(exp.company || "Company Name", [{ type: "italic" }]);
      pushParagraph(exp.location || "City, Country");
      if (exp.description?.length) pushBulletList(exp.description);
    });
  } else if (resume.experience !== undefined) {
    pushHeading("WORK EXPERIENCE", 2, { class: "section-title" });
    doc.content.push({ type: "horizontalRule" });
    pushParagraph("No experience entries available.");
  }

  if (resume.projects?.length) {
    pushHeading("EXTRACURRICULAR + PROJECTS", 2, { class: "section-title" });
    doc.content.push({ type: "horizontalRule" });
    resume.projects.forEach((project) => {
      pushParagraph(project.name || "Project Name", [{ type: "bold" }]);
      if (project.link) pushParagraph(project.link, [], { class: "project-link" });
      if (project.description?.length) pushBulletList(project.description);
    });
  }

  if (resume.skills?.length) {
    pushHeading("SKILLS", 2, { class: "section-title" });
    doc.content.push({ type: "horizontalRule" });
    const skillsText = resume.skills.join(", ");
    pushParagraph(`Technical Skills: ${skillsText}`); 
  }
  return doc;
}

function ActualResumeContent({ editorInstance }) {
  if (!editorInstance) return null;
  return (
    <div className="px-8 py-10 bg-white"> 
      <EditorContent editor={editorInstance} />
    </div>
  );
}

export default function ResumeDisplayWrapper({ resume }) {
  const [isZoomedDialogOpen, setIsZoomedDialogOpen] = useState(false);
  const tiptapContent = useMemo(() => mapResumeToTipTap(resume), [resume]);

  const editorConfig = {
    extensions: [
      StarterKit.configure({ table: false }), 
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: false }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: tiptapContent,
    editable: false, 
    editorProps: {
      attributes: {
        class: "prose-mirror-editor font-sans text-[10pt] leading-normal",
      },
    },
  };

  const miniatureEditor = useEditor({
    ...editorConfig,
    content: {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "Loading..." }] }],
    },
  });
  
  const zoomedEditor = useEditor({
    ...editorConfig,
    content: {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "Loading..." }] }],
    },
  });

  useEffect(() => {
    const newContent = mapResumeToTipTap(resume);
    if (miniatureEditor && JSON.stringify(miniatureEditor.getJSON()) !== JSON.stringify(newContent)) {
      miniatureEditor.commands.setContent(newContent, false);
    }
    if (zoomedEditor && JSON.stringify(zoomedEditor.getJSON()) !== JSON.stringify(newContent)) {
      zoomedEditor.commands.setContent(newContent, false);
    }
  }, [resume, miniatureEditor, zoomedEditor]); 

  if (!miniatureEditor || !zoomedEditor) {
    return <div>Loading resume preview...</div>;
  }


  const originalWidth = 816; 
  const originalHeight = 1056; 
  const scaleFactor = 0.50; 

  const miniatureDisplayWidth = originalWidth * scaleFactor;
  const miniatureDisplayHeight = originalHeight * scaleFactor;

  return (
    <>
      <div className = "border-l-1 p-4">
      <div className = "mb-5 mx-5 space-y-2">
        <div className = "flex space-x-2">
        <h1 className = "font-sans text-purple-800 font-light">Resume Preview</h1>
          <Badge className = "bg-gray-700">
            <Check />
            Auto Saved
          </Badge>
        </div>
        <p className="border-1 p-1 text-xs rounded-md bg-purple-100 flex items-center border-purple-200">
              <Hand className="w-6 h-6 p-1 text-purple-500" />
              <span className="text-purple-500">
                Click Preview to Expand
              </span>
            </p>
      </div>
      
      <style jsx global>{`
        .ProseMirror {
          font-family: Helvetica, Arial, sans-serif;
          color: #212529;
          line-height: 1.45;
          /* min-height: unset; Remove fixed min-height if it interferes with scaling */
        }
        .ProseMirror:focus { outline: none; }
        .ProseMirror h1 { font-size: 20pt; font-weight: 600; text-align: center; margin-bottom: 4px; line-height: 1.2; }
        .ProseMirror p.contact-info { font-size: 9pt; text-align: center; color: #343a40; margin-top: 0; margin-bottom: 16px; line-height: 1.3; }
        .ProseMirror h2.section-title, .ProseMirror h2 { font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 18px; margin-bottom: 0px; color: #212529; }
        .ProseMirror hr { border: none; border-top: 1px solid #495057; margin-top: 2px; margin-bottom: 8px; }
        .ProseMirror p { font-size: 10pt; margin-top: 1px; margin-bottom: 1px; }
        .ProseMirror p.project-link { font-size: 9pt; color: #007bff; }
        .ProseMirror ul { font-size: 10pt; list-style-type: disc; margin-top: 4px; margin-bottom: 4px; padding-left: 20px; }
        .ProseMirror li { margin-top: 1px; margin-bottom: 1px; padding-left: 4px; }
        .ProseMirror li p { margin: 0; }
        .ProseMirror table { width: 100%; border-collapse: collapse; margin-top: 1px; margin-bottom: 1px; }
        .ProseMirror td { border: none; padding: 0; vertical-align: top; font-size: 10pt; }
        .ProseMirror td p { margin: 0; font-size: 10pt; }
        .ProseMirror td p[data-text-align="right"] { text-align: right; }
        .ProseMirror td p[data-text-align="left"] { text-align: left; }
        .Prosore Your New Resume!eMirror em { font-style: italic; }
        .ProseMirror strong { font-weight: bold; }
      `}</style>

      <div
        onClick={() => setIsZoomedDialogOpen(true)}
        style={{
          width: `${miniatureDisplayWidth}px`,
          height: `${miniatureDisplayHeight}px`,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backgroundColor: 'white',
        }}
        title="Click to view larger resume"
        className = "rounded-md m-2 border-2 border-gray-200"
      >
        <div
          style={{
            width: `${originalWidth}px`,   
            height: `${originalHeight}px`, 
            transform: `scale(${scaleFactor})`,
            transformOrigin: 'top left',
          }}
        >
          <ActualResumeContent editorInstance={miniatureEditor} />
        </div>
      </div>

      <Dialog open={isZoomedDialogOpen} onOpenChange={setIsZoomedDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[850px] lg:max-w-[900px] h-[90vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle>{resume?.name || "Resume Preview"}</DialogTitle>
            <DialogDescription>
              Scroll to view the full document.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto">
            <ActualResumeContent editorInstance={zoomedEditor} />
          </div>
          <DialogFooter className="px-6 py-4 border-t">
            <Button variant="outline" onClick={() => setIsZoomedDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
}