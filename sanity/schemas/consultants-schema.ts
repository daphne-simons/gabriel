import { defineType, defineField } from 'sanity'

// Contributor schema
const contributor = defineType({
  name: 'contributor',
  title: 'Contributors',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name'
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email'
    }),
    defineField({
      name: 'magicLinkToken',
      type: 'string',
      title: 'Magic Link Token'
    }),
    defineField({
      name: 'magicLinkExpires',
      type: 'datetime',
      title: 'Magic Link Expires'
    }),
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Active',
      initialValue: true
    }),
    defineField({
      name: 'lastNudgedAt',
      type: 'datetime',
      title: 'Last Nudged At'
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Avatar'
    })
  ]
})

// Submission schema with properly typed preview
const submission = defineType({
  name: 'submission',
  title: 'Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'contributor',
      type: 'reference',
      title: 'Contributor',
      to: [{ type: 'contributor' }]
    }),
    defineField({
      name: 'assets',
      type: 'array',
      title: 'Assets',
      of: [
        {
          type: 'file',
          title: 'File Upload'
        },
        {
          type: 'image',
          title: 'Image Upload'
        }
      ]
    }),
    defineField({
      name: 'caption',
      type: 'text',
      title: 'Caption'
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
        ]
      },
      initialValue: 'pending'
    })
  ],
  preview: {
    select: {
      contributorName: 'contributor.name',
      status: 'status',
      createdAt: 'createdAt',
      assetCount: 'assets',
      firstAsset: 'assets.0.asset'
    },
    prepare(selection) {
      const { contributorName, status, createdAt, firstAsset } = selection

      let date = 'No date'
      if (createdAt) {
        date = new Date(createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      }

      return {
        title: `${contributorName || 'Unknown'} - ${date}`,
        subtitle: `${status || 'No status'}`,
        media: firstAsset
      }
    }
  }
})

export { contributor, submission }

// Default export for schemas array
// export default [contributor, submission]