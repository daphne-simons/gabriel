'use client'
import { Category } from '@/sanity/models/sanity-client-models'
import Link from 'next/link'
import { useState } from 'react'
interface Props {
  id: number
  bgColor: string
  bgImg: string
  textColor: string
  outlineColor: string
  btnSearchBg: string
  hoverSearchBg: string
}

export default function HomeSearchBar({
  theme,
  categories,
  isOpen,
  setIsOpen,
}: {
  theme: Props
  categories: Category[]
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  if (theme)
    return (
      <>
        <div
          className={`relative flex flex-col justify-start rounded-full pl-14 pr-14 py-2.5 ${theme.btnSearchBg} ${theme.hoverSearchBg} sm:w-1/3 m:w-1/3 md:w-1/2 lg:w-2/5 xl:w-1/3
            ${
              isOpen
                ? `shadow-none hover:none`
                : `shadow-customSearchLight hover:shadow-customSearchDark`
            }`}
          onClick={toggleDropdown}
        >
          {/* Main Search Bar */}
          <div className="flex flex-row relative cursor-pointer ">
            <div className="">
              {/* magnifying glass icon svg */}
              <span
                className={
                  !isOpen
                    ? 'block h-6 w-6 -ml-[40px] mb-[5px] absolute'
                    : 'h-6 w-6 -ml-[40px] mb-[5px] absolute opacity-0'
                }
              >
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
            </div>
            {/* Search input */}
            <p className={!isOpen ? 'block pl-1' : 'opacity-0 pl-1'}>
              What are you looking for?
            </p>
          </div>
          {/* Dropdown Menu */}
          <div
            id="dropdown"
            className={`${theme.btnSearchBg} absolute z-10 pl-10 rounded-[22px] p-custom pb-2 left-1/2 -translate-x-1/2 -translate-y-2.5 flex flex-col w-full ${
              // CHANGE the BG to be dynamic
              isOpen ? 'block shadow-customSearchDark' : 'hidden'
            }`}
          >
            {/* Landing Option*/}
            <div className="flex flex-row relative rounded-full gap-1.5">
              <span className="h-6 w-6 -ml-[24px] mt-[8px] absolute">
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
              <p className="px-5 py-2">What are you looking for?</p>
            </div>
            {/* Options - Map through categories state */}
            {categories.map((category) => (
              <div key={category._id} className="flex flex-row relative ">
                <Link
                  href={{
                    pathname: '/search-results',
                    query: {
                      category: encodeURIComponent(category.name ?? ''), // Encode category string, returns empty string if category is null
                    },
                  }}
                >
                  <span className={`h-6 w-6 -ml-[24px] mt-[8px] absolute`}>
                    <svg
                      className="fill-current"
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                    >
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                  </span>
                  <li className="block px-5 py-2">
                    I want{' '}
                    <span className="font-roboto font-bold">
                      {category.name}
                    </span>
                  </li>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* "I'm Feeling Lucky"  uses the <a> mailto: functionality to open a user's default email client*/}
        <div className={`pt-6 $ ${!isOpen ? 'opacity-1' : 'opacity-0'}`}>
          <a
            className={`px-4 py-2.5 rounded-lg shadow-customSearchLight hover:shadow-customSearchDark ${theme.outlineColor} ${theme.btnSearchBg}`}
            // TODO: change this email address to Ella's official Gabriel Email
            href="mailto:daphnejasminesimons@gmail.com?subject=I%27m%20Feeling%20Lucky"
          >
            I&apos;m Feeling Lucky
          </a>
        </div>
      </>
    )
}
