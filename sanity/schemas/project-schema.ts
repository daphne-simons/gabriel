const project = {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name', // relates to 'name' schema above
        // maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // gives more editing functionality in the studio
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'tier',
      title: 'Tier',
      type: 'reference',
      to: [{ type: 'tier' }],
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'category' }],
    },
    {
      name: 'description', //
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
}

export default project
