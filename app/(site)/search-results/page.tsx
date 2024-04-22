'use client'
import MoonWidget from '../components/MoonWidget'
import { PT_Serif } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../components/Header'
import SearchOptionsList from '../components/SearchOptionsList'
const serif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})
export default function SearchResults() {
  const [activeLink, setActiveLink] = useState<number>(0) // state for active link

  const handleLinkClick = (index: number) => {
    setActiveLink(index)
  }
  return (
    <>
      {/* Header */}
      <div className="h-auto flex flex-col border-b border-gray-300 ">
        <div id="header" className="flex flex-row relative gap-4 p-2">
          {/* Wrapper logo and search bar */}
          <div className="flex w-full">
            {/* Logo */}
            <div className="pr-6 pl-6 pt-2 flex items-center">
              <Link href="/">
                <Header color="bg-red-600" size="text-3xl" />
              </Link>
            </div>
            {/* Searchbar */}
            <div id="search-area" className="flex flex-row relative w-[50%]">
              <button
                id="search-btn"
                className="h-20 w-6 top-1 left-3 absolute "
              >
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </button>
              <input
                id="search-bar"
                className="mt-5 p-5 w-full h-[46px] pl-10 border border-gray-300 rounded-full text-black placeholder-gray-500 outline-none text-base focus:shadow-md focus:border-transparent hover:border-transparent"
                placeholder="I want an identity"
                type="text"
              />
            </div>
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
        {/* Options List */}
        <div className="w-2/3">
          <SearchOptionsList />
        </div>
        {/* Side bar - Photo, info, etc */}
        <div className="w-1/2 flex flex-col pr-32 pt-6">
          <div className="h-full border rounded-2xl">
            {/* Gallery Grid */}
            <div className="h-2/5 border-b border-gray-200">
              <div
                id="gallery-grid"
                className="w-full h-full grid grid-cols-8 grid-rows-4 gap-1"
              >
                {/* TODO - Add Images to Gallery */}
                {/* Gallery Item1 */}
                <div className="bg-blue-200 col-span-4 row-span-4 rounded-tl-2xl"></div>
                {/* Gallery Item2 */}
                <div className="bg-blue-300 col-span-3 row-span-2"></div>
                {/* Gallery Item3 */}
                <div className="bg-blue-400 col-span-1 row-span-2 rounded-tr-2xl"></div>
                {/* Gallery Item4 */}
                <div className="bg-blue-500 col-span-2 row-span-2"></div>
                {/* Gallery Item5 */}
                <div className="bg-blue-600 col-span-2 row-span-2"></div>
              </div>
            </div>
            {/* Text Part */}
            <div className="h-1/5 px-2 pt-2">
              <h1 className="text-blue-600 text-3xl">Sapphire</h1>
              <p className="pt-2 text-gray-500 text-sm">Essential Identity</p>
            </div>
            <div className="px-2 pt-2 h-2/5 border-t  border-gray-200">
              <p className=" text-gray-500 text-base">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt, veritatis tempora eum eos a dolore exercitationem
                assumenda et officiis commodi explicabo beatae voluptas sint quo
                eveniet omnis eligendi accusantium hic.
              </p>
              <h3 className="pt-2 text-l font-bold text-blue-400">Enquire</h3>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
