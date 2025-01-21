import { sanityFetch } from '@/sanity/config/client-config'
import SearchResultsPage from '../components/SearchResults/SearchResultsPage'
import { categoriesQuery, projectsQuery } from '@/sanity/sanity-utils'
import { Category, Project } from '@/sanity/models/project'
import { Suspense } from 'react'

export default async function SearchResults() {
  // Sanity query with WEBHOOK: refer to this documentation:
  // https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs#step-4-configure-revalidatetag-in-sanity-client
  // Revalidates document when "project" is changed
  const projects: Project[] = await sanityFetch({
    query: projectsQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['project'],
  })

  console.log({ projects })

  // TODO: Query Catgories and prop drill
  const categories: Category[] = await sanityFetch({
    query: categoriesQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['category'],
  })

  console.log({ categories })

  // TODO: Query Services and prop drill

  return (
    <>
      <Suspense>
        <SearchResultsPage projects={projects} categories={categories} />
      </Suspense>
    </>
  )
}
