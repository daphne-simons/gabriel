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

type View = 'all' | 'details'
export default function SearchResultsPage({
  projects,
  categories,
  tiers,
}: {
  projects: Project[]
  categories: Category[]
  tiers: Tier[]
}) {
  const [activeView, setActiveView] = useState<View>('all')

  // Search query parameters
  const searchParams = useSearchParams()
  const chosenCategory = searchParams.get('category')

  if (categories) {
    const decodedCategory = chosenCategory
      ? decodeURIComponent(chosenCategory)
      : null
    const fullCategory = categories.find(
      (category) => category.name === decodedCategory
    ) as Category

    return (
      <div className=" bg-[#202124] h-screen">
        {/* Top Nav and Search Bar */}
        <div className="flex flex-col border-b border-[#7d8084] ">
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
                  setActiveView={setActiveView}
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
              <button
                onClick={() => setActiveView('all')}
                className={`cursor-pointer ${
                  activeView === 'all'
                    ? 'text-[#8AB4F7] text-sm border-b-2 border-[#8AB4F7]'
                    : ''
                }`}
              >
                <li className="px-4 pb-2 text-sm">All</li>
              </button>

              <button
                onClick={() => setActiveView('details')}
                className={`cursor-pointer ${
                  activeView === 'details'
                    ? 'text-[#8AB4F7] border-b-2 border-[#8AB4F7]'
                    : ''
                }`}
              >
                <li className="px-4 pb-2 text-sm">Details</li>
              </button>
            </ul>
          </div>
        </div>
        {/* Tiers and Details*/}
        <div className="flex flex-row pl-40">
          {activeView === 'all' ? (
            <ResultsComponent
              chosenCategory={decodedCategory}
              projects={projects}
              tiers={tiers}
            />
          ) : (
            <Details chosenCategory={fullCategory} />
          )}
        </div>
      </div>
    )
  }
}
