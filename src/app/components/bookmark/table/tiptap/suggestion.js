import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { Braces, BookText, Lightbulb, Atom, School2 } from "lucide-react";


import mentionlist from './mentionlist'

export default {
  items: ({ query }) => {
    return [
        {
          title: "Add Variable",
          description: "Repeat Repetitive Variables",
          icon:  <Braces className = "p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#37352F]"/>,
          searchTerms: ["paragraph"],
          variable: "{{variable}}"
        },
        {
          title: "Publications",
          description: "Query Relevant Publications Variable",
          icon: <BookText className = "p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#9F6B53]"/>,
          searchTerms: ["unordered", "point"],
          variable: "{{publicationTitle}}"
        },
        {
          title: "Research Interests",
          description: "Query Relevant Publications Variable",
          icon: <Lightbulb className = "p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#CB912F]"/>,
          searchTerms: ["ordered", "point", "numbers"],
          variable: "{{researchInterests}}"
        },
        {
            title: "AI Context Component",
            description: "Query Relevant Publications Variable",
            icon: <Atom className = "p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#337EA9]"/>,
            searchTerms: ["ordered", "point", "numbers"],
            variable: "{{AIcontext}}"
        },
        {
            title: "School",
            description: "Query Relevant Publications Variable",
            icon: <School2 className = "p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#37352F]"/>,
            searchTerms: ["ordered", "point", "numbers"],
            variable: "{{professorSchool}}"
        },
        {
            title: "Faculty",
            description: "Query Relevant Publications Variable",
            icon: <School2 className = "p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#37352F]"/>,
            searchTerms: ["ordered", "point", "numbers"],
            variable: "{{professorSchool}}"
        },
        {
            title: "Labs",
            description: "Query Relevant Publications Variable",
            icon: <School2 className = "p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#37352F]"/>,
            searchTerms: ["ordered", "point", "numbers"],
            variable: "{{professorSchool}}"
        },
      ]
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 5)
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new ReactRenderer(mentionlist, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}