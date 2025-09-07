import { sanityFetch } from '@/sanity/config/client-config'
import { activeContributorsQuery, submissionsQuery } from '@/sanity/sanity-utils'
import { Suspense } from 'react'
import MoonPage from '../components/Constellation/MoonPage'

export default async function Moon() {
  // Timer for transition page
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  // Query Catgories and prop drill into MoonPage 'use client' component
  const contributors = await sanityFetch({
    query: activeContributorsQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['contributor'],
  })

  const submissions = await sanityFetch({
    query: submissionsQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['submission'],
  })

  return (
    <>
      <Suspense >
        <MoonPage contributors={contributors} submissions={submissions} />
      </Suspense >
    </>
  )
}
