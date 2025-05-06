import { useEffect, useMemo } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

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

  const pushHeading = (text, level = 2) => {
    doc.content.push({
      type: "heading",
      attrs: { level },
      content: [{ type: "text", text }],
    });
  };

  const pushParagraph = (text) => {
    doc.content.push({
      type: "paragraph",
      content: [{ type: "text", text }],
    });
  };

  const pushBulletList = (items) => {
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
  };

  // Title
  pushHeading(resume.name || "Untitled Resume", 1);

  // Contact Information
  pushHeading("Contact Information");
  const contact = resume.contact_information || {};
  const hasContact = Object.values(contact).some(Boolean);
  if (hasContact) {
    for (const [key, value] of Object.entries(contact)) {
      if (value) pushParagraph(`${key}: ${value}`);
    }
  } else {
    pushParagraph("No contact information provided.");
  }

  // Education
  pushHeading("Education");
  const education = resume.education || [];
  if (education.length) {
    education.forEach((edu) => {
      pushParagraph(
        `${edu.degree || "Degree"} - ${edu.school || "School"}, ${edu.location || "Location"} (${edu.end_date || "Date"})`
      );
      if (edu.details?.length) {
        pushBulletList(edu.details);
      } else {
        pushBulletList(["No details provided."]);
      }
    });
  } else {
    pushParagraph("No education entries available.");
  }

  // Experience
  pushHeading("Experience");
  const experience = resume.experience || [];
  if (experience.length) {
    experience.forEach((exp) => {
      pushParagraph(
        `${exp.job_title || "Job Title"} - ${exp.company || "Company"}, ${exp.location || "Location"} (${exp.start_date || "Start"} – ${exp.end_date || "End"})`
      );
      if (exp.description?.length) {
        pushBulletList(exp.description);
      } else {
        pushBulletList(["No description provided."]);
      }
    });
  } else {
    pushParagraph("No experience entries available.");
  }

  // Skills
  if (resume.skills?.length) {
    pushHeading("Skills");
    pushBulletList(resume.skills);
  } else {
    pushHeading("Skills");
    pushParagraph("No skills listed.");
  }

  return doc;
}


export default function ResumeView({resume}) {
  console.log(resume)
  const tiptapContent = useMemo(() => mapResumeToTipTap(resume), [resume]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }), 
    ],
    content: tiptapContent,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 font-sans",
      },
    },
  });

  // Set content to the editor if it's available
  useEffect(() => {
    if (editor && tiptapContent) {
      editor.commands.setContent(tiptapContent);
    }
  }, [editor, tiptapContent]);

  if (!editor) return <div>Loading editor...</div>;

  return (
    <>
      <div>
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-gray-50 border-1 flex items-center space-x-2 p-2 rounded-md">
            <button onClick={() => editor.chain().focus().toggleBold().run()}>
              Bold
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}>
              Italic
            </button>
            <button onClick={() => editor.chain().focus().toggleStrike().run()}>
              Strike
            </button>
          </div>
        </BubbleMenu>
      </div>
      <EditorContent className = "text-xs p-4" editor={editor} />
    </>
  );
}
