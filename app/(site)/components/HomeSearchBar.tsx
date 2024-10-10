'use client'
import Link from 'next/link'
import { useState } from 'react'
import classNames from 'classnames'
interface Props {
  id: number
  bgColor: string
  bgImg: string
  textColor: string
  outlineColor: string
}

export default function HomeSearchBar(theme: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [services, setServices] = useState([
    'an identity',
    'a publication',
    'ephemera',
    'a website',
    'a design subscription',
    'something else',
  ])
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const outline = theme.outlineColor as string
  console.log('searchBar:', outline)

  if (outline)
    return (
      <>
        <div
          className={`relative flex flex-col lg:w-1/2 md:w-2/3 sm:w-2/3 justify-start rounded-full pl-14 pr-14 py-2.5 ${
            isOpen
              ? `outline-none shadow-none`
              : `outline outline-1 hover:shadow-xl ${outline}`
          }`}
          onClick={toggleDropdown}
        >
          {/* Main Search Bar */}
          <div className="flex flex-row relative cursor-pointer">
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
            className={`absolute z-10 pl-10 rounded-[22px] p-custom left-1/2 -translate-x-1/2 -translate-y-2.5 flex flex-col w-full ${
              isOpen
                ? 'block bg-transparent shadow-xl outline outline-1'
                : 'hidden'
            }`}
          >
            {/* Landing Option*/}
            <div className="flex flex-row relative rounded-full gap-1.5 lg:w-1/2 md:w-2/3 sm:w-2/3 ">
              <span className="h-6 w-6 -ml-[24px] mt-[8px] absolute">
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
              <li className=" block px-3 pt-2 pb-4 pl-5">
                What are you looking for?
              </li>
            </div>
            {/* Options - Map through services state */}
            {services.map((service, index) => (
              <div key={index} className=" ">
                <div className="flex flex-row relative ">
                  <span className="h-6 w-6 -ml-[24px] mt-[8px] absolute">
                    <svg
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                    >
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                  </span>
                  <Link href={`/search-results?service=${service}`}>
                    <li className="block px-5 py-2">
                      I want{' '}
                      <span className="font-roboto font-bold">{service}</span>
                    </li>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* I'm Feeling Lucky */}
        <div className={`pt-4 ${!isOpen ? 'opacity-1' : 'opacity-0'}`}>
          <Link href="/contact">
            <button className="px-4 py-2 rounded-lg outline outline-1 hover:shadow-lg">
              I&apos;m Feeling Lucky
            </button>
          </Link>
        </div>
      </>
    )
}
