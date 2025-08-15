// Contributor
const contributor =
{
  name: 'contributor',
  title: 'Contributor',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string'
    },
    {
      name: 'email',
      type: 'string'
    },
    {
      name: 'magicLinkToken',
      type: 'string'
    },
    {
      name: 'active',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'lastNudgedAt',
      type: 'datetime'
    },
    {
      name: 'avatar',
      type: 'image'
    }
  ]
}
// Submission
const submission =
{
  name: 'submission',
  title: 'Submission',
  type: 'document',
  fields: [
    {
      name: 'contributor',
      type: 'reference',
      to: [{ type: 'contributor' }]
    },
    {
      name: 'assets',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'caption',
      type: 'string'
    },
    {
      name: 'createdAt',
      type: 'datetime', initialValue: () => new Date().toISOString()
    }
  ]
}

export { contributor, submission }