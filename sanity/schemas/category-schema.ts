const category = {
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
}

export default category
