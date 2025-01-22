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

export type Page = {
  _id: string
  title: string
  slug?: Slug
  content: PortableTextBlock[]
}
