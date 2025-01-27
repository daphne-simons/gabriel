import { PortableTextBlock } from 'next-sanity'

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}
export type Project = {
  _id: string
  name: string
  image: string
  url: string
  gem: string
  category: string
  description: PortableTextBlock[] // This is how Sanity stores 'rich' content.
}

export type Category = {
  _id: string
  name: string
  details: PortableTextBlock[] // This is how Sanity stores 'rich' content.
}

export type Tier = {
  _id: string
  gem: string
  level: string
  cost: string
  details: PortableTextBlock[]
}

export type EnquiryPage = {
  _id: string
  title: string
  slug?: Slug
  content: PortableTextBlock[]
}

export type AboutPageModel = {
  _id: string
  title: string
  slug?: Slug
  description: PortableTextBlock[]
  address: PortableTextBlock[]
  contact: PortableTextBlock[]
  team: PortableTextBlock[]
  consultants: PortableTextBlock[]
  clients_collaborators: PortableTextBlock[]
}
