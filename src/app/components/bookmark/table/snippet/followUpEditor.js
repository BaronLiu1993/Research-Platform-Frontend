"use client";

import "tippy.js/dist/tippy.css";

import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Mention from "@tiptap/extension-mention";
import suggestion from "../tiptap/suggestion";
import StarterKit from "@tiptap/starter-kit";
import {
  ALargeSmall,
  Bold,
  IndentDecrease,
  IndentIncrease,
  Italic,
  List,
  ListTodo,
  Pencil,
  Strikethrough,
  Wand2,
  X,
} from "lucide-react";
import { useSelectedVariablesStore } from "@/app/store/useSelectedRowsStore";

import { Badge } from "@/shadcomponents/ui/badge";
import { toast } from "sonner";
import { DialogClose } from "@/shadcomponents/ui/dialog";
import { GenerateSnippet } from "@/app/actions/generateSnippet";
import { SyncSnippetData } from "@/app/actions/syncSnippetData";
import { createMassFollowUpDrafts } from "@/app/actions/queue/createMassFollowUpDrafts";
import FollowUpButton from "./followUpButton";
import { ExecuteMassFollowUpDraftsWithAttachments } from "@/app/actions/queue/executeMassSendFollowUpDraftsWithAttachments";
import { ExecuteMassSendFollowUpDrafts } from "@/app/actions/queue/executeMassSendFollowUpDrafts";

export default function FollowUpEditor({
  userId,
  fromName,
  fromEmail,
  professorIDArray,
  totalProfessorData,
}) {
  const [subject, setSubject] = useState("");
  const closeRef = useRef(null);

  const setSelectedVariables = useSelectedVariablesStore(
    (s) => s.setSelectedVariables
  );
  const selectedVariables = useSelectedVariablesStore(
    (s) => s.selectedVariables
  );

  useEffect(() => {
    setSelectedVariables([]);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class:
            "prose bg-[#F6F3F9] text-[#9065B0] font-mono text-[14px] rounded-md",
        },
        suggestion: {
          ...suggestion,
          char: "/",
          ignoreEvents: true,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
        "prose prose-p:my-0 max-w-[35.9rem] w-full h-full min-h-[300px] p-2 text-[14px]",
      },
    },
    content: "",
    onUpdate({ editor }) {
      let mentions = [];

      editor.state.doc.descendants((node) => {
        if (node.type.name === "mention") {
          mentions.push(node.attrs.id);
        }
      });
      useSelectedVariablesStore.getState().setSelectedVariables(mentions);
    },
  });

  const handleCreateFollowUpDrafts = async () => {
    try {
      const response = await GenerateSnippet(userId, editor.getHTML(), subject);

      const dynamicFields = await SyncSnippetData(
        userId,
        professorIDArray,
        selectedVariables
      );
      const draftResponse = await createMassFollowUpDrafts(
        userId,
        response.snippetId,
        fromName,
        fromEmail,
        dynamicFields
      );
      if (draftResponse.success) {
        await ExecuteMassSendFollowUpDrafts(
          userId,
          fromName,
          fromEmail,
          totalProfessorData
        );
        closeRef.current?.click();
        toast("Follow Up Emails Sent!");
      } else {
        toast("Failed To Queue Follow Up Emails");
      }
    } catch (error) {
      toast("Failed To Send Follow Up Email");
    }
  };

  const handleCreateFollowUpDraftsWithAttachments = async () => {
    try {
      const response = await GenerateSnippet(userId, editor.getHTML(), subject);
      const dynamicFields = await SyncSnippetData(
        userId,
        professorIDArray,
        selectedVariables
      );
      if (response.snippetId) {
        const draftResponse = await createMassFollowUpDrafts(
          userId,
          response.snippetId,
          fromName,
          fromEmail,
          dynamicFields
        );
        if (draftResponse.success) {
          await ExecuteMassFollowUpDraftsWithAttachments(
            userId,
            fromName,
            fromEmail,
            totalProfessorData
          );
          closeRef.current?.click();
          toast("Follow Up Email With Attachments Sent!");
        } else {
          toast("Failed To Queue Follow Up Emails");
        }
      }
    } catch {
      toast("Failed To Send Follow Up Email With Attachments");
    }
  };

  return (
    <div>
      <div className="text-sm">
        <div className="flex justify-between px-4">
          <Badge className="text-[#D9730D] bg-[#FAEBDD] rounded-xs">
            Unsent Follow Up
          </Badge>
          <DialogClose className="text-[#37352F] hover:bg-[#F1F1EF] cursor-pointer hover:text-red-500">
            <X className="h-6 w-6 p-1 rounded-xs" />
          </DialogClose>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">{fromName}</h1>
            <h2 className="text-[#787774]">{fromEmail}</h2>
          </div>
          <input
            onChange={(e) => setSubject(e.target.value)}
            className="px-4 py-1 w-full"
            placeholder="Subject"
            defaultValue={""}
          />
        </div>
      </div>
      <EditorContent editor={editor} />
      <div className="font-main p-4 flex items-center">
        <FollowUpButton
          sendFollowUp={handleCreateFollowUpDrafts}
          sendFollowUpWithAttachments={
            handleCreateFollowUpDraftsWithAttachments
          }
        />
      </div>
      <DialogClose asChild>
        <button ref={closeRef} style={{ display: "none" }} />
      </DialogClose>
    </div>
  );
}
