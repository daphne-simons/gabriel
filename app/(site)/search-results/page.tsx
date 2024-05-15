import { Suspense } from 'react'
import SearchResultsPage from '../components/SearchResultsPage'

export default function SearchResults() {
  return (
    <Suspense>
      <SearchResultsPage />
    </Suspense>
  )
}
