//  File that contains GROQ query functions for Sanity Content Lake
import { groq } from 'next-sanity'

// groq queries that work with the SANITY FETCH WEBHOOK:
// Refer to this documentation:
// https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs#step-4-configure-revalidatetag-in-sanity-client

export const projectsQuery = groq`*[_type == "project"]{
      _id,
      name,
      "image": image.asset->url, 
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
