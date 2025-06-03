export const convertExperienceToTiptapJSON = (experienceArray) => {
    if (!experienceArray || experienceArray.length === 0) {
      return {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'No experience added yet.' },
            ],
          },
        ],
      };
    }
  
    const content = experienceArray.map((exp) => ({
      type: 'experienceBlock',
      content: [
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: exp.job_title || 'Job Title' }],
        },
        {
          type: 'heading',
          attrs: { level: 4 },
          content: [{ type: 'text', text: `${exp.company || 'Company'} | ${exp.location || 'Location'}` }],
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: `${exp.start_date || ''} - ${exp.end_date || 'Present'}` }],
        },
        ...(Array.isArray(exp.description) && exp.description.length > 0
          ? [{
              type: 'bulletList',
              content: exp.description.map((desc) => ({
                type: 'listItem',
                content: [{
                  type: 'paragraph',
                  content: [{ type: 'text', text: desc }],
                }],
              })),
            }]
          : []),
      ],
    }));
  
    return {
      type: 'doc',
      content,
    };
  };
  