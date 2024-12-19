'use client'
import MoonWidget from '../components/MoonWidget'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ResultsComponent from '../components/ResultsComponent'
import Details from '../components/Details'
import { useSearchParams } from 'next/navigation'
import SearchResultBar from '../components/SearchResultBar'
import SearchResultLogo from './Logos/SearchResultLogo'

export default function SearchResultsPage() {
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
      <div className="bg-[#202124] h-screen w-full">
        {/* Header */}
        <div className="h-auto flex flex-col border-b border-[#7d8084] ">
          <div id="header" className="flex flex-row relative gap-4 p-2">
            {/* Wrapper logo and search bar */}
            <div className="flex w-full">
              {/* Logo */}
              <div className="pr-8 pl-5 pt-2 flex items-center">
                <Link href="/">
                  <SearchResultLogo />
                </Link>
              </div>
              <div className="flex flex-row w-full justify-between">
                {/* Searchbar */}
                <SearchResultBar chosenService={service} />

                <div className="mr-8 flex items-center text-[#F8F9FA] text-sm font-roboto">
                  <MoonWidget size="smallMoon" />
                </div>
              </div>
            </div>
          </div>
          {/* Second Nav bar - All Pricing Terms */}
          <div className="flex text-[#F8F9FA]">
            <ul className="flex flex-row ml-40 gap-8">
              <Link
                href="/search-results"
                onClick={() => handleLinkClick(0)}
                className={`cursor-pointer ${
                  activeLink === 0
                    ? 'text-[#8AB4F7] text-sm border-b-2 border-[#8AB4F7]'
                    : ''
                }`}
              >
                <li className="px-4 pb-2 text-sm">All</li>
              </Link>
              <Link
                href="/search-results"
                onClick={() => handleLinkClick(1)}
                className={`cursor-pointer ${
                  activeLink === 1
                    ? 'text-[#8AB4F7] border-b-2 border-[#8AB4F7]'
                    : ''
                }`}
              >
                <li className="px-4 pb-2 text-sm">Details</li>
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
