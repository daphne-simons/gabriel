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
  // FIX: setServices is unused here, a regular variable can be used
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
      <div
        className={`mt-5 p-5 w-full h-[46px] pl-12 text-[#F8F9FA] placeholder-[#F8F9FA] text-base bg-[#303134] rounded-full drop-shadow-lg ${
          isOpen ? 'drop-shadow-2xl hidden' : 'drop-shadow-lg'
        }`}
      >
        <h2 className="absolute top-[12px]">
          <span className="font-thin ">I want </span>
          <span className="font-bold">{activeService}</span>
        </h2>
      </div>
      <span className="h-6 w-6 top-[15px] pt-4 left-4 absolute">
        <svg
          focusable="false"
          fill="#9aa0a6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </span>
      {/* Dropdown Menu */}
      <div
        id="dropdown"
        className={`absolute z-10 pl-8 py-1 pb-2 text-[#F8F9FA]  w-full rounded-[25px] flex flex-col gap-2 bg-[#303134] top-5 drop-shadow-lg ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Landing Option*/}
        <div className="flex flex-row relative rounded-full">
          <span className="h-6 w-6 top-[12px] -mt-[5px] -ml-4  absolute">
            <svg
              focusable="false"
              fill="#9aa0a6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
          <li className="text-[#F8F9FA] font-thin block px-4 py-2 ">
            What are you looking for?
          </li>
        </div>
        <div className="translate-x-4 -translate-y-2.5 border-b w-[90%] h-1 border-gray-400"></div>
        {/* Options - Map through services state */}
        {services.map((service) => (
          <>
            <div className="flex flex-row relative ">
              <span className="h-6 w-6 -ml-4 mt-2.5 absolute">
                <svg
                  focusable="false"
                  fill="#9aa0a6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
              <Link
                onClick={() => setActiveService(service)}
                href={`/search-results?service=${service}`}
              >
                <li className="block px-4 py-2">
                  <span className="font-thin">I want </span>
                  <span className="font-bold">{service}</span>
                </li>
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
