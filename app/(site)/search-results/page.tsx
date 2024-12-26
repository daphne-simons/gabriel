'use client'
import { Suspense } from 'react'
import SearchResultsPage from '../components/SearchResults/SearchResultsPage'

export default function SearchResults() {
  return (
    <Suspense>
      <SearchResultsPage />
    </Suspense>
  )
}
