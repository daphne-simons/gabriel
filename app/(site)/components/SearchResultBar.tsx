'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useState } from 'react'

export default function SearchResultBar({
  chosenService,
}: {
  chosenService: string
}) {
  // This useEffect will trigger if the chosenService changes, and will set the activeService to the chosenService
  useEffect(() => {
    setActiveService(chosenService)
  }, [chosenService])
  const [activeService, setActiveService] = useState(chosenService)
  const [isOpen, setIsOpen] = useState(false)
  // For mapping the drop down options
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
    <div
      onClick={toggleDropdown}
      id="search-area"
      className={`flex flex-row relative w-[50%] `}
    >
      <span className="h-20 w-5 top-[18px] pt-4 left-4 absolute">
        <svg
          focusable="false"
          fill="#9aa0a6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </span>
      <input
        id="search-bar"
        className={`mt-5 p-5 w-full h-[46px] pl-12 text-black placeholder-gray-600 text-base outline outline-offset-0 outline-1 outline-gray-500 rounded-full hover:outline-gray-300 ${
          isOpen ? 'outline-transparent' : 'outline'
        }`}
        placeholder={`I want ${activeService}`}
        type="text"
      />
      {/* Dropdown Menu */}
      <div
        id="dropdown"
        className={`absolute z-10 pl-8 py-1 pb-2 text-gray-600  w-full rounded-[25px] flex flex-col gap-2 bg-[#ffffff] top-5 outline outline-offset-0 outline-1 outline-gray-300 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Landing Option*/}
        <div className="flex flex-row relative hover:bg-[#ffffff] rounded-full">
          <span className="h-5 w-5 -ml-4 mt-2.5 absolute">
            <svg
              focusable="false"
              fill="#9aa0a6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
          <li className="text-gray-400 block px-4 py-2 ">
            What are you looking for?
          </li>
        </div>
        <div className="translate-x-4 -translate-y-2.5 border-b w-[90%] h-1 border-gray-400"></div>
        {/* Options - Map through services state */}
        {services.map((service) => (
          <>
            <div className="flex flex-row relative hover:bg-[#ffffff]">
              <span className="h-5 w-5 -ml-4 mt-2.5 absolute">
                <svg
                  focusable="false"
                  fill="#9aa0a6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
              <Link
                onClick={() => setActiveService(service)}
                href={`/search-results?service=${service}`}
              >
                <li className="block px-4 py-2">
                  I want{' '}
                  <span className="font-roboto font-bold">{service}</span>
                </li>
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
