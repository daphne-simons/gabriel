'use client'
import MoonWidget from '../../components/MoonWidget'
import Link from 'next/link'
import { useState } from 'react'
import Details from './Details'
import { useSearchParams } from 'next/navigation'
import SearchResultBar from './SearchResultBar'
import SearchResultLogo from '../Logos/SearchResultLogo'
import { Category, Project, Tier } from '@/sanity/models/sanity-client-models'
import SearchOptionsList from './SearchOptionsList'

export type View = 'all' | 'details'
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
        <div className="flex flex-col relative border-b border-[#7d8084] ">
          <div
            id="header"
            className="flex max-md:flex-wrap max-md:gap-0 gap-4 p-2"
          >
            {/* SMALL devices - Logo and Moon Widget*/}
            <div className="flex flex-row w-full justify-between md:hidden lg:hidden xl:hidden 2xl:hidden">
              <div className="pr-8 pl-5 pt-2 items-center order-1">
                <Link href="/">
                  <SearchResultLogo />
                </Link>
              </div>
              <div className="pt-2 px-5 flex order-2 items-center text-[#F8F9FA] text-sm md:hidden lg:hidden xl:hidden 2xl:hidden">
                <MoonWidget size="smallMoon" />
              </div>
            </div>
            {/* MEDIUM TO LARGE devices - Logo and Moon Widget*/}
            <div className="max-md:hidden pr-8 pl-5 pt-2 items-center">
              <Link href="/">
                <SearchResultLogo />
              </Link>
            </div>
            <div className="pr-20 pt-2 flex items-center order-3 max-md:order-2  text-[#F8F9FA] text-sm max-md:hidden">
              <MoonWidget size="smallMoon" />
            </div>
            <div className="max-md:order-3 max-md:w-[90%] max-md:ml-4 md:w-full order-2 ">
              <SearchResultBar
                setActiveView={setActiveView}
                categories={categories}
                chosenCategory={decodedCategory}
              />
            </div>
          </div>
          {/* 2nd Nav - All and Details*/}
          <div className="flex text-[#F8F9FA]">
            <ul className="flex flex-row max-md:ml-6 md:ml-28 lg:ml-40 xl:ml-40 gap-8">
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
        {/* MAIN PAGE CONTENT: Tiers and Details*/}
        <div
          className="flex flex-col max-md:px-6 md:pl-28 md:pr-24 lg:flex-row lg:pl-40 xl:flex-row xl:pl-40  bg-[#202124] h-screen pb-6
        "
        >
          {activeView === 'all' ? (
            <SearchOptionsList
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
