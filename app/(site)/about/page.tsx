import { AboutPageModel } from '@/sanity/models/sanity-client-models'
import { AboutPageQuery } from '@/sanity/sanity-utils'
import { sanityFetch } from '@/sanity/config/client-config'

import { Suspense } from 'react'
import AboutPage from '../components/About/AboutPage'

export default async function About() {
  // Query Catgories and prop drill into HomePage client component
  const aboutPageData: AboutPageModel[] = await sanityFetch({
    query: AboutPageQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['about-page'],
  })

  const [data] = aboutPageData

  return (
    <>
      <Suspense>
        <AboutPage data={data} />
      </Suspense>
    </>
  )
}
