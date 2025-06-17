import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import {
  BookText,
  Lightbulb,
  Atom,
  School2,
  Microscope,
  LayoutTemplate,
  SquareLibrary,
  Newspaper,
} from "lucide-react";

import MentionList from "./mentionlist";

export default {
  items: ({ query }) => {
    return [
      {
        title: "Publications",
        description: "Query Relevant Publications Variable",
        icon: (
          <BookText className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#9F6B53]" />
        ),
        searchTerms: ["unordered", "point"],
        variable: "{{publicationTitle}}",
      },
      {
        title: "Labs",
        description: "Get The Lab Associated With the Professor",
        icon: (
          <Microscope className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#9065B0]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{labs}}",
      },
      {
        title: "Research Interests",
        description: "Query Relevant Publications Variable",
        icon: (
          <Lightbulb className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#CB912F]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{researchInterests}}",
      },
      {
        title: "AI Context Component",
        description: "Let AI Generate Text Snippets",
        icon: (
          <Atom className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#337EA9]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{AIcontext}}",
      },
      {
        title: "Professor School",
        description: "Professor School",
        icon: (
          <School2 className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#37352F]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{professorSchool}}",
      },
      {
        title: "Faculty",
        description: "Professor Faculty",
        icon: (
          <SquareLibrary className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#9F6B53]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{professorSchool}}",
      },
      {
        title: "Resume Point",
        description: "Pick a Resume Point to Incorporate",
        icon: (
          <Newspaper className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#C14C8A]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{resumePoint}}",
      },
      {
        title: "Department",
        description: "Professor Department",
        icon: (
          <LayoutTemplate className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#448361]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{department}}",
      },
    ]
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 5);
  },

  render: () => {
    let component;
    let popup;

    return {
      onStart: (props) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: props.editor.view.dom.parentElement,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
          hideOnClick: false,
          trigger: "manual",
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
