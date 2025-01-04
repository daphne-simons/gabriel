// import Projects from '../components/Projects'
import { sanityFetch } from '@/sanity/config/client-config'
import SearchResultsPage from '../components/SearchResults/SearchResultsPage'
// Sanity stuff for getProjects:
// import { getProjects } from '@/sanity/sanity-utils'
import { projectsQuery } from '@/sanity/sanity-utils'
import { Project } from '@/types/project'

export default async function SearchResults() {
  // OLD WITHOUT WEBHOOK - doesn't update when sanity studio content is changed
  // const projects = await getProjects()
  // console.log('projects', projects)

  // NEW WITH WEBHOOK: refer to this documentation:
  // https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs#step-4-configure-revalidatetag-in-sanity-client

  // Revalidate document when "post" is changed
  const projects: Project[] = await sanityFetch({
    query: projectsQuery,
    // You can add multiple tags that matches with your document _id: ['post', 'about', ...]
    tags: ['projects', 'pages'],
  })
  return <SearchResultsPage projects={projects} />
}
