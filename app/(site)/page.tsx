import { Suspense } from 'react'
import HomePage from './components/Home/HomePage'
import { categoriesQuery } from '@/sanity/sanity-utils'
import { Category } from '@/sanity/models/sanity-client-models'
import { sanityFetch } from '@/sanity/config/client-config'

export default async function Home() {
  // TODO: Query Catgories and prop drill
  const categories: Category[] = await sanityFetch({
    query: categoriesQuery,
    // You can add multiple tags that matches with your document _id: ['project', 'post', etc]
    tags: ['category'],
  })

  console.log({ categories })
  return (
    <>
      <Suspense>
        <HomePage categories={categories} />
      </Suspense>
    </>
  )
}
