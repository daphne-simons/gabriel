import { PortableTextBlock } from 'next-sanity'

export type Page = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  content: PortableTextBlock[] // This is how Sanity stores 'rich' content.
}
