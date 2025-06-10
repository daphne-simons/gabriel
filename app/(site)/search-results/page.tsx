import { sanityFetch } from '@/sanity/config/client-config'
import SearchResultsPage from '../components/SearchResults/SearchResultsPage'
import {
  categoriesQuery,
  projectsQuery,
  tiersQuery,
} from '@/sanity/sanity-utils'
import { Category, Project, Tier } from '@/sanity/models/sanity-client-models'
import { Suspense } from 'react'
import { calculateBgColor, getMoonPhaseForWidget } from '../utils/moon-utils'

export default async function SearchResults() {
  // Sanity query with WEBHOOK: refer to this documentation:
  // https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs#step-4-configure-revalidatetag-in-sanity-client
  // Revalidates document when "project" is changed
  const projects: Project[] = await sanityFetch({
    query: projectsQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['project'],
  })

  // Sanity query for Categories - prop drill into client components
  const categories: Category[] = await sanityFetch({
    query: categoriesQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['category'],
  })

  // Sanity Query for Tiers - prop drill into client components
  const tiers: Tier[] = await sanityFetch({
    query: tiersQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['tier'],
  })

  const theme = calculateBgColor() // Uses current date by default

  const phase = getMoonPhaseForWidget()

  return (
    <Suspense>
      <SearchResultsPage
        projects={projects}
        categories={categories}
        tiers={tiers}
        phase={phase}
        theme={theme}
      />
    </Suspense>
  )
}
