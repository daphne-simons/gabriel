'use client'
import MoonWidget from '../../components/MoonWidget'
import Link from 'next/link'
import { useState } from 'react'
import ResultsComponent from './ResultsComponent'
import Details from './Details'
import { useSearchParams } from 'next/navigation'
import SearchResultBar from './SearchResultBar'
import SearchResultLogo from '../Logos/SearchResultLogo'
import { Category, Project, Tier } from '@/sanity/models/sanity-client-models'
export default function SearchResultsPage({
  projects,
  categories,
  tiers,
}: {
  projects: Project[]
  categories: Category[]
  tiers: Tier[]
}) {
  const [activeLink, setActiveLink] = useState<number>(0) // state for active link

  const searchParams = useSearchParams()

  // Preserve query parameters
  const queryString = searchParams.toString()
  const searchResultsUrl = `/search-results${queryString ? `?${queryString}` : ''}`

  const chosenCategory = searchParams.get('category')

  const decodedCategory = chosenCategory
    ? decodeURIComponent(chosenCategory)
    : null

  function handleLinkClick(index: number) {
    setActiveLink(index)
  }

  return (
    <>
      <div className="bg-[#202124] h-screen w-full">
        <div className="h-auto flex flex-col border-b border-[#7d8084] ">
          <div id="header" className="flex flex-row relative gap-4 p-2">
            {/* Logo & SearchBar*/}
            <div className="flex w-full">
              {/* Logo */}
              <div className="pr-8 pl-5 pt-2 flex items-center">
                <Link href="/">
                  <SearchResultLogo />
                </Link>
              </div>
              <div className="flex flex-row w-full justify-between">
                {/* Searchbar */}
                <SearchResultBar
                  categories={categories}
                  chosenCategory={decodedCategory}
                />
                <div className="mr-8 flex items-center text-[#F8F9FA] text-sm font-roboto">
                  <MoonWidget size="smallMoon" />
                </div>
              </div>
            </div>
          </div>
          {/* 2nd Nav - All and Details*/}
          <div className="flex text-[#F8F9FA]">
            <ul className="flex flex-row ml-40 gap-8">
              <Link
                href={searchResultsUrl}
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
                href={searchResultsUrl}
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
        {/* Tiers and Details*/}
        <div className="flex flex-row pl-40">
          {activeLink ? (
            // TODO: fix bug where page does full refresh when selecting Details.
            <Details categories={categories} chosenCategory={decodedCategory} />
          ) : (
            <ResultsComponent
              chosenCategory={decodedCategory}
              projects={projects}
              tiers={tiers}
            />
          )}
        </div>
      </div>
    </>
  )
}
