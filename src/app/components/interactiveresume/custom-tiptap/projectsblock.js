import { Node, mergeAttributes } from '@tiptap/core'

export const ProjectsBlock = Node.create({
  name: 'projectsBlock',
  group: 'block',
  content: 'heading heading paragraph bulletList?',
  draggable: true,
  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="projects-block"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-type': 'project-block',
      class: 'p-4 mb-4',
    }), 0]
  },
})
