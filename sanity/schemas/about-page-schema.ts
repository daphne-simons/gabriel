const aboutPage = {
  name: 'about-page',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [{ name: 'color', title: 'Color', type: 'textColor' }],
          },
        },
      ],
    },
    {
      name: 'address',
      title: 'Address',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'contact',
      title: 'Contact',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'team',
      title: 'Team',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'consultants',
      title: 'Consultants',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'clients_collaborators',
      title: 'Past Clients and Collaborators',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
}

export default aboutPage
