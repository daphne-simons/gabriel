const tier = {
  name: 'tier',
  title: 'Tiers',
  type: 'document',
  fields: [
    {
      name: 'gem',
      title: 'Gem',
      type: 'string',
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
    },
    {
      name: 'cost',
      title: 'Cost',
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

export default tier
