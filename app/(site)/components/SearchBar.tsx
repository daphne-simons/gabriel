'use client'
import Link from 'next/link'
import { useState } from 'react'
export default function HomeSearchBar() {
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
  return (
    <>
      <div
        className={`relative flex flex-col w-full max-w-xl justify-start rounded-full   hover:outline-none pl-14 py-3.5 hover:shadow-md  ${
          isOpen ? '' : 'outline outline-gray-300 outline-1'
        }`}
        onClick={toggleDropdown}
      >
        {/* Main Search Bar */}
        <div className="flex flex-row relative cursor-pointer">
          <div className="">
            <span className="h-6 w-6 -ml-[40px] mb-[5px] absolute">
              <svg
                focusable="false"
                fill="#9aa0a6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </span>
          </div>
          {/* Search input */}
          <p className=" pl-1">What are you looking for?</p>
        </div>
        {/* Dropdown Menu */}
        <div
          id="dropdown"
          className={`absolute z-10 pl-10 py-1.5 py-["5px"] max-w-xl   w-full rounded-[25px] left-1/2 -translate-x-1/2 -translate-y-3.5 flex flex-col gap-2  ${
            isOpen ? 'block bg-transparent shadow-lg' : 'hidden'
          }`}
        >
          {/* Landing Option*/}
          <div className="flex flex-row relative rounded-full">
            <span className="h-6 w-6 -ml-[24px] mt-[8px] absolute">
              <svg
                focusable="false"
                fill="#9aa0a6"
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
          <div className="translate-x-4 -translate-y-2.5 border-b w-[90%] h-1 border-gray-400 "></div>
          {/* Options - Map through services state */}
          {services.map((service, index) => (
            <div key={index} className=" ">
              <div className="flex flex-row relative ">
                <span className="h-6 w-6 -ml-[24px] mt-[8px] absolute">
                  <svg
                    focusable="false"
                    fill="#9aa0a6"
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
          <button className="px-4 py-2 rounded-lg outline outline-gray-400 hover:outline hover:outline-gray-500 outline-1 hover:shadow-mdtext-sm">
            I&apos;m Feeling Lucky
          </button>
        </Link>
      </div>
    </>
  )
}
