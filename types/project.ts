import { PortableTextBlock } from 'next-sanity'

export type Project = {
  _id: string
  _createdAt: Date
  name: string
  slug: string
  image: string
  url: string
  gem: string
  content: PortableTextBlock[] // This is how Sanity stores 'rich' content.
}
