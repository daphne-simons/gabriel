'use client'
import MoonWidget from '../../components/MoonWidget'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import Details from './Details'
import { useSearchParams } from 'next/navigation'
import SearchResultBar from './SearchResultBar'
import SearchResultLogo from '../Logos/SearchResultLogo'
import { Category, Project, Tier } from '@/sanity/models/sanity-client-models'
import SearchOptionsList from './SearchOptionsList'
import { calculateBgColor, getMoonPhaseForWidget } from '../../utils/moon-utils'

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
  const [isClient, setIsClient] = useState(false)

  // Ref to track if we're currently scrolling
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const searchParams = useSearchParams()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const [chosenCategory, setChosenCategory] = useState<string | null>(null)

  useEffect(() => {
    setChosenCategory(searchParams.get('category'))
  }, [searchParams])

  const theme = calculateBgColor()
  console.log('search result theme:', theme);
  const phase = getMoonPhaseForWidget()
  console.log('search result phase:', phase);

  // Enhanced closeDropDown function that respects scrolling
  function closeDropDown(e: React.MouseEvent) {
    // Don't close if we're currently scrolling
    if (isScrollingRef.current) return

    // Only close dropdown if clicking on the background element itself
    if (e.target !== e.currentTarget) return

    // Only proceed if dropdown is actually open
    if (!isOpen) return

    setIsOpen(false)
  }

  // Handle scroll events to track scrolling state
  const handleScroll = () => {
    isScrollingRef.current = true

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Set scrolling to false after scroll ends
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
    }, 150)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Show loading state during hydration to prevent layout shift
  if (!isClient) {
    return (
      <div className="bg-[#202124] h-screen relative">
        <div className="flex flex-col relative border-b border-[#7d8084]">
          <div className="flex max-md:flex-wrap max-md:gap-0 gap-8 py-6 px-7 h-24 max-md:h-40 max-md:px-5">
            <div className="flex flex-row w-full h-[36px] md:hidden lg:hidden xl:hidden 2xl:hidden justify-between">
              <div className="items-center order-1 sm:text-xl">
                <div className="w-32 h-8 bg-gray-600 animate-pulse rounded"></div>
              </div>
              <div className="order-2 text-[#F8F9FA] text-sm md:hidden lg:hidden xl:hidden 2xl:hidden">
                <div className="w-16 h-8 bg-gray-600 animate-pulse rounded-full"></div>
              </div>
            </div>
            <div className="max-md:hidden">
              <div className="w-32 h-8 bg-gray-600 animate-pulse rounded"></div>
            </div>
            <div className="flex-1 bg-gray-600 animate-pulse rounded h-10"></div>
          </div>
          <div className="flex text-[#F8F9FA]">
            <ul className="flex flex-row max-md:ml-6 md:ml-28 lg:ml-40 xl:ml-40 gap-8">
              <div className="w-12 h-6 bg-gray-600 animate-pulse rounded"></div>
              <div className="w-16 h-6 bg-gray-600 animate-pulse rounded"></div>
            </ul>
          </div>
        </div>
        <div className="flex flex-col max-md:px-6 md:pl-28 md:pr-24 lg:flex-row lg:pl-40 xl:flex-row xl:pl-40 xl:gap-8 bg-[#202124] h-screen pb-6">
          <div className="w-full space-y-4 p-4">
            <div className="h-32 bg-gray-600 animate-pulse rounded"></div>
            <div className="h-32 bg-gray-600 animate-pulse rounded"></div>
            <div className="h-32 bg-gray-600 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (categories) {
    const decodedCategory = chosenCategory
      ? decodeURIComponent(chosenCategory)
      : null
    const fullCategory = categories.find(
      (category) => category.name === decodedCategory
    ) as Category

    return (
      <div className="bg-[#202124] h-screen relative">
        {/* Top Nav and Search Bar - No click handler here */}
        <div className="flex flex-col relative border-b border-[#7d8084]">
          <div
            id="header"
            className="flex max-md:flex-wrap max-md:gap-0 gap-8 py-6 px-7 h-24 max-md:h-40 max-md:px-5"
          >
            {/* SMALL devices - Logo and Moon Widget*/}
            <div className="flex flex-row w-full h-[36px] md:hidden lg:hidden xl:hidden 2xl:hidden justify-between">
              <div className="items-center order-1 sm:text-xl">
                <Link href="/">
                  <SearchResultLogo logoColor={theme.logoColor} />
                </Link>
              </div>
              <div className="order-2 text-[#F8F9FA] text-sm md:hidden lg:hidden xl:hidden 2xl:hidden">
                <MoonWidget size={"smallMoon"} phase={phase} />
              </div>
            </div>
            {/* MEDIUM TO LARGE devices - Logo and Moon Widget*/}
            <div className="max-md:hidden">
              <Link href="/">
                <SearchResultLogo logoColor={theme.logoColor} />
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
              <div className="md:text-sm lg:text-sm xl:text-sm 2xl:text-base text-googleLightGray max-md:hidden">
                <MoonWidget size="smallMoon" phase={phase} />
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

        {/* Backdrop for dropdown - only appears when dropdown is open */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={closeDropDown}
            style={{ touchAction: 'none' }}
          />
        )}

        {/* MAIN PAGE CONTENT: Tiers and Details*/}
        <div
          className="flex flex-col max-md:px-6 md:pl-28 md:pr-24 lg:flex-row lg:pl-40 xl:flex-row xl:pl-40 xl:gap-8 bg-[#202124] pb-6"
          onScroll={handleScroll}
          style={{
            // Calculate height to avoid issues with h-screen
            height: 'calc(100vh - 144px)', // Adjust based on your header height
            overflowY: 'auto',
            // Ensure proper touch scrolling behavior
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            // Prevent momentum scrolling issues
            overscrollBehavior: 'contain',
            // Prevent elastic scroll on iOS
            position: 'relative'
          }}
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