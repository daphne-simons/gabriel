// Sanity type definitions without module augmentation

export interface ProjectsQueryResult {
  _id: string;
  name: string;
  imageUrl: string;
  altText: string;
  blurData: string;
  url: string;
  gem: string;
  category: string;
  description: string;
}

export interface SingleProjectQueryResult {
  _id: string;
  name: string;
  image: string;
  url: string;
  gem: string;
  category: string;
  description: string;
}

// Add other type definitions as needed
export interface ContributorModel {
  _id: string;
  name: string;
  email: string;
  magicLinkExpires?: string;
  magicLinkToken?: string;
}