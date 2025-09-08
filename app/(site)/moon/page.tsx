import { sanityFetch } from '@/sanity/config/client-config'
import { activeContributorsQuery, submissionsQuery } from '@/sanity/sanity-utils'
import { Suspense } from 'react'
import MoonPage from '../components/Constellation/MoonPage'
import { ContributorModel, SubmissionModel } from '@/sanity/models/sanity-client-models'

export default async function Moon() {
  // Timer for transition page
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  // Query Catgories and prop drill into MoonPage 'use client' component
  const contributors: ContributorModel[] = await sanityFetch({
    query: activeContributorsQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['contributor'],
  })

  const submissions: SubmissionModel[] = await sanityFetch({
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
