// Contributor
const contributor =
{
  name: 'contributor',
  title: 'Contributors',
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
      name: 'magicLinkExpires',
      type: 'datetime'
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
// Submission schema with custom preview titles
const submission = {
  name: 'submission',
  title: 'Submissions',
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
    },
    {
      name: 'caption',
      type: 'text'
    },
    {
      name: 'createdAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
        ]
      },
      initialValue: 'pending'
    }
  ],
  preview: {
    select: {
      contributorName: 'contributor.name',
      status: 'status',
      createdAt: 'createdAt',
      assetCount: 'assets',
      firstAsset: 'assets.0.asset' // Get first asset for thumbnail
    },
    prepare(selection: {
      contributorName: string;
      status: string;
      createdAt: string;
      firstAsset: any; // or a more specific type if you know what it is
    }) {
      const { contributorName, status, createdAt, firstAsset } = selection;
      const date = new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      return {
        title: `${contributorName || 'Unknown'} - ${date}`,
        subtitle: `${status}`,
        media: firstAsset // Use the first uploaded asset as thumbnail, or remove this line entirely
      };
    }
  }
}

export { contributor, submission }