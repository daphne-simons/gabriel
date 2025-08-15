//  File that contains GROQ query functions for Sanity Content Lake
import { groq } from 'next-sanity'

// groq queries that work with the SANITY FETCH WEBHOOK:
// Refer to this documentation:
// https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs#step-4-configure-revalidatetag-in-sanity-client

export const projectsQuery = groq`*[_type == "project"]{
      _id,
      name,
      "imageUrl": image.asset->url, 
      "altText": image.altText,
      "blurData": image.asset->metadata.lqip,
      url,
      "gem": tier->gem,
      "category": category->name,
      description,
    }`

export const singleProjectQuery = groq`*[_type == "project" && slug.current == $slug][0]{ 
      _id,
      name,
      "image": image.asset->url, 
      url,
      "gem": tier->gem,
      "category": category->name,
      description,
    }`

export const categoriesQuery = groq`*[_type == "category"]{
      _id,
      name,
      details,
    }`

export const tiersQuery = groq`*[_type == "tier" ] | order(_createdAt asc) {
      _id,
      gem,
      level,
      cost,
      details,
    }`

export const AboutPageQuery = groq`*[_type == "about-page"]{
      _id,
      title,
      slug,
      description,
      address,
      contact,
      team,
      consultants,
      clients_collaborators,
    }`

// Query for getting all active contributors for cron job
export const activeContributorsQuery = groq`*[_type == "contributor" && !disabled] {
  _id,
  name,
  email,
  lastNudgedDate
}`

// Query for validating magic link token
export const contributorByTokenQuery = groq`*[_type == "contributor" && magicLinkToken == $token: string && !disabled][0] {
  _id,
  name,
  email,
  magicLinkExpires
}`

// Query for getting all contributors (for admin purposes)
export const allContributorsQuery = groq`*[_type == "contributor"] | order(_createdAt desc) {
  _id,
  name,
  email,
  bio,
  "avatar": avatar.asset->url,
  lastNudgedDate,
  _createdAt,
  disabled
}`

// Query for getting submissions with contributor details
export const submissionsQuery = groq`*[_type == "submission"] | order(submittedAt desc) {
  _id,
  submittedAt,
  status,
  "contributor": contributor-> {
    name,
    email
  },
  assets[] {
    "url": asset->url,
    "filename": asset->originalFilename,
    "mimeType": asset->mimeType,
    caption,
    credit,
    altText
  }
}`

// Query for getting single submission
export const singleSubmissionQuery = groq`*[_type == "submission" && _id == $id][0] {
  _id,
  submittedAt,
  status,
  "contributor": contributor-> {
    name,
    email,
    bio
  },
  assets[] {
    "url": asset->url,
    "filename": asset->originalFilename,
    "mimeType": asset->mimeType,
    "fileSize": asset->size,
    caption,
    credit,
    altText
  }
}`