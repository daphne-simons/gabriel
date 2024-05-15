'use client'
import MoonWidget from '../components/MoonWidget'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import Header from '../components/Header'
import ResultsComponent from '../components/ResultsComponent'
import Details from '../components/Details'
import { useSearchParams } from 'next/navigation'
import SearchResultBar from '../components/SearchResultBar'

export default function SearchResults() {
  const [activeLink, setActiveLink] = useState<number>(0) // state for active link

  const handleLinkClick = (index: number) => {
    setActiveLink(index)
  }
  const [service, setService] = useState('')
  const chosenService = useSearchParams().get('service')

  useEffect(() => {
    setService(chosenService || 'What are you looking for?')
  }, [])

  return (
    <>
      <div className="">
        {/* Header */}
        <div className="h-auto flex flex-col border-b border-gray-300 ">
          <div id="header" className="flex flex-row relative gap-4 p-2">
            {/* Wrapper logo and search bar */}
            <div className="flex w-full">
              {/* Logo */}
              <div className="pr-8 pl-5 pt-2 flex items-center">
                <Link href="/">
                  <Header color="bg-red-600" size="text-3xl" />
                </Link>
              </div>
              {/* Searchbar */}
              <Suspense>
                <SearchResultBar chosenService={service} />
              </Suspense>
            </div>
            <div className="flex flex-row">
              {/* </div> */}
              <div className="mr-8 flex items-center">
                <MoonWidget />
              </div>
            </div>
          </div>
          {/* Second Nav bar - All Pricing Terms */}
          <div className="flex text-gray-500">
            <ul className="flex flex-row ml-40 gap-8">
              <Link
                href="/search-results"
                onClick={() => handleLinkClick(0)}
                className={`cursor-pointer ${
                  activeLink === 0
                    ? 'text-blue-500 border-b-4 border-blue-500'
                    : ''
                }`}
              >
                <li className="">All</li>
              </Link>
              <Link
                href="/search-results"
                onClick={() => handleLinkClick(1)}
                className={`cursor-pointer ${
                  activeLink === 1
                    ? 'text-blue-500 border-b-4 border-blue-500'
                    : ''
                }`}
              >
                <li>Details</li>
              </Link>
            </ul>
          </div>
        </div>
        {/* Body */}
        <div className="flex flex-row pl-40">
          {activeLink ? (
            <Details />
          ) : (
            <ResultsComponent chosenService={service} />
          )}
        </div>
      </div>
    </>
  )
}
