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
  const [isOpen, setIsOpen] = useState(false)

  // Search query parameters
  const searchParams = useSearchParams()
  const chosenCategory = searchParams.get('category')

  function closeDropDown() {
    if (isOpen === false) return
    else setIsOpen(!isOpen)
  }
  if (categories) {
    const decodedCategory = chosenCategory
      ? decodeURIComponent(chosenCategory)
      : null
    const fullCategory = categories.find(
      (category) => category.name === decodedCategory
    ) as Category

    return (
      <div onClick={closeDropDown} className=" bg-[#202124] h-screen relative">
        {/* Top Nav and Search Bar */}
        <div className="flex flex-col relative border-b border-[#7d8084]">
          <div
            id="header"
            className="flex max-md:flex-wrap max-md:gap-0 gap-8 py-6 px-7 h-24 max-md:h-40 max-md:px-5"
          >
            {/* SMALL devices - Logo and Moon Widget*/}
            <div className="flex flex-row w-full h-[36px] md:hidden lg:hidden xl:hidden 2xl:hidden justify-between">
              <div className="items-center order-1 sm:text-xl">
                <Link href="/">
                  <SearchResultLogo />
                </Link>
              </div>
              <div className="order-2 text-[#F8F9FA] text-sm md:hidden lg:hidden xl:hidden 2xl:hidden">
                <MoonWidget size={"smallMoon"} />
              </div>
            </div>
            {/* MEDIUM TO LARGE devices - Logo and Moon Widget*/}
            <div className="max-md:hidden">
              <Link href="/">
                <SearchResultLogo />
              </Link>
            </div>
            <SearchResultBar
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setActiveView={setActiveView}
              categories={categories}
              chosenCategory={decodedCategory}
            />
            <div className="max-lg:hidden xl:w-28 order-3"></div>
            <div className="flex justify-end items-center order-4 w-1/2">
              <div className="md:text-sm lg:text-base xl:text-base 2xl:text-base text-[#F8F9FA] max-md:hidden">
                <MoonWidget size="smallMoon" />
              </div>
            </div>
          </div>
          {/* 2nd Nav - All and Details*/}
          <div className="flex text-[#F8F9FA]">
            <ul className="flex flex-row max-md:ml-6 md:ml-28 lg:ml-40 xl:ml-40 gap-8">
              <button
                onClick={() => setActiveView('all')}
                className={`cursor-pointer ${activeView === 'all'
                  ? 'text-[#8AB4F7] text-sm border-b-2 border-[#8AB4F7]'
                  : ''
                  }`}
              >
                <li className="px-4 pb-2 text-sm">All</li>
              </button>

              <button
                onClick={() => setActiveView('details')}
                className={`cursor-pointer ${activeView === 'details'
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
          className="flex flex-col max-md:px-6 md:pl-28 md:pr-24 lg:flex-row lg:pl-40 xl:flex-row xl:pl-40 xl:gap-8 bg-[#202124] h-screen pb-6"
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
      </div >
    )
  }
}
