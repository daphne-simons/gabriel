'use client'
import MoonWidget from '../components/MoonWidget'
import { PT_Serif } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../components/Header'
import SearchOptionsList from '../components/SearchOptionsList'
import All from '../components/All'
import Details from '../components/Details'
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
            <div className="pr-8 pl-5 pt-2 flex items-center">
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
        {activeLink ? <Details /> : <All />}
      </div>
    </>
  )
}
