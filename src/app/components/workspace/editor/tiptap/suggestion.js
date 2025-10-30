import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import {
  School2,
  Microscope,
  LayoutTemplate,
  SquareLibrary,
  WholeWord,
  Pencil,
} from "lucide-react";

import MentionList from "./mentionlist";

const suggestion = {
  items: ({ query }) => {
    return [
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
        title: "Last Name",
        description: "Professor Last Name",
        icon: (
          <WholeWord className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#CB912F]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{lastName}}",
      },
      {
        title: "First Name",
        description: "Professor First Name",
        icon: (
          <Pencil className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#337EA9]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{firstName}}",
      },
      {
        title: "Professor Institution",
        description: "Professors School/Institution",
        icon: (
          <School2 className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#37352F]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{school}}",
      },
      {
        title: "Faculty",
        description: "Professors Faculty",
        icon: (
          <SquareLibrary className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#9F6B53]" />
        ),
        searchTerms: ["ordered", "point", "numbers"],
        variable: "{{faculty}}",
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

export default suggestion;