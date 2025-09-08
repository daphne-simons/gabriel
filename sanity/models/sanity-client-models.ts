import { PortableTextBlock } from 'next-sanity'

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}
export type Project = {
  _id: string
  name: string
  imageUrl: string
  altText: string
  blurData: string
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

// CONTRIBUTOR SCHEMA TYPES: 

// Base Sanity types
interface SanityReference {
  _type: 'reference';
  _ref: string;
}

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

interface SanityFile {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// CONTRIBUTOR SCHEMA: 
export interface ContributorModel extends SanityDocument {
  _type: 'contributor';
  name: string;
  email: string;
  magicLinkToken: string;
  magicLinkExpires?: string; // ISO date string, optional
  active: boolean;
  lastNudgedAt?: string; // ISO date string, optional
  avatar?: SanityImage; // Optional image field
}

// SUBMISSION SCHEMA:
export interface SubmissionModel extends SanityDocument {
  _type: 'submission';
  contributor: { email: string | null, name: string }; // References a contributor
  assets: { filename: string, mimeType: string, url: string }[]; // Array of files OR images
  caption: string;
  createdAt: string; // ISO date string
  status?: 'pending' | 'approved' | 'rejected'; // Added status field from schema
}

// SUBMISSION with Contributor SCHEMA:
// For use with Sanity's GROQ queries, you might want a populated version
export interface SubmissionWithContributor extends Omit<SubmissionModel, 'contributor'> {
  contributor: ContributorModel;
}