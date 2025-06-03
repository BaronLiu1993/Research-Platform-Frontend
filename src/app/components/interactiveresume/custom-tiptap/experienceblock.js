import { Node, mergeAttributes } from '@tiptap/core'

export const ExperienceBlock = Node.create({
  name: 'experienceBlock',
  group: 'block',
  content: 'heading heading paragraph bulletList?',
  draggable: true,
  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="experience-block"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'experience-block',
        class: 'p-4 border rounded-md bg-neutral-100 dark:bg-neutral-800 mb-4',
      }),
      0,
    ]
  },

  addCommands() {
    return {
      insertExperienceBlock:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: 'experienceBlock',
            content: [
              {
                type: 'heading',
                attrs: { level: 3 },
                content: [{ type: 'text', text: 'Job Title' }],
              },
              {
                type: 'heading',
                attrs: { level: 4 },
                content: [{ type: 'text', text: 'Company | Location' }],
              },
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Start Date - End Date' }],
              },
              {
                type: 'bulletList',
                content: [
                  {
                    type: 'listItem',
                    content: [
                      {
                        type: 'paragraph',
                        content: [
                          { type: 'text', text: 'Description point' },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          })
        },
    }
  },
})
