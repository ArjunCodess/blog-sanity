export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'publishDate',
      type: 'string',
      title: 'Blog Publish Data',
      description: 'use the DD/MM/YYYY format',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title of Blog Article',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug Of Blog Article',
      options: {
        source: 'title',
      },
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Title Image',
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{
            type: 'tags'
          }],
        },
      ],
    },
  ],
}