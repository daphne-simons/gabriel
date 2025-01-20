// import Projects from '../components/Projects'
import { sanityFetch } from '@/sanity/config/client-config'
import SearchResultsPage from '../components/SearchResults/SearchResultsPage'
// Sanity stuff for getProjects:
// import { getProjects } from '@/sanity/sanity-utils'
import { projectsQuery } from '@/sanity/sanity-utils'
import { Project } from '@/sanity/models/project'
// import { Project } from '@/sanity.types'
import { Suspense } from 'react'

export default async function SearchResults() {
  // OLD WITHOUT WEBHOOK - doesn't update when sanity studio content is changed
  // const projects = await getProjects()

  // NEW WITH WEBHOOK: refer to this documentation:
  // https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs#step-4-configure-revalidatetag-in-sanity-client

  // Revalidate document when "project" is changed
  const projects: Project[] = await sanityFetch({
    query: projectsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['project'],
  })

  console.log({ projects })

  return (
    <>
      <Suspense>
        <SearchResultsPage projects={projects} />
      </Suspense>
    </>
  )
}
