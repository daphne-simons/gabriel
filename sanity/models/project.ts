import { PortableTextBlock } from 'next-sanity'

export type Project = {
  _id: string
  name: string
  image: string
  url: string
  gem: string
  category: string
  description: PortableTextBlock[] // This is how Sanity stores 'rich' content.
}
