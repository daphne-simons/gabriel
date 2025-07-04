'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category } from '@/sanity/models/sanity-client-models'
import { View } from './SearchResultsPage'

export default function SearchResultBar({
  categories,
  chosenCategory,
  setActiveView,
  isOpen,
  setIsOpen,
}: {
  categories: Category[]
  chosenCategory: string | null
  setActiveView: React.Dispatch<React.SetStateAction<View>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleCategoryClick = (category: string) => {
    setIsOpen(false) // Close dropdown after selection
    const newUrl = `/search-results?category=${encodeURIComponent(category)}`
    router.push(newUrl)
  }

  const handleOptionClick = (category: string) => {
    handleCategoryClick(category)
  }

  return (
    <div className="z-50 relative w-full md:w-full lg:w-full xl:w-[45%] 2xl:w-[60%] max-md:ml-0 max-md:w-full max-md:order-3 order-2">
      {/* Closed search bar */}
      <div
        onClick={toggleDropdown}
        className={`max-md:mt-6 max-md:mb-4 h-[46px] pl-12 text-[#F8F9FA] placeholder-[#F8F9FA] text-base bg-[#3d3d3d] hover:bg-[#505050] rounded-full drop-shadow-lg flex flex-row items-center w-full cursor-pointer ${isOpen ? 'drop-shadow-2xl hidden' : 'drop-shadow-lg block'
          }`}
      >
        <h2 className="">
          <span className="font-thin ">I want </span>
          <span className="font-bold">{chosenCategory || '...'}</span>
        </h2>
      </div>
      <span
        className={`h-6 w-6 max-md:top-[20px] -top-[4px] pt-4 left-4 absolute pointer-events-none ${isOpen ? 'opacity-0' : ''
          }`}
      >
        <svg
          focusable="false"
          fill="#9aa0a6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </span>
      {/* Open searchbar */}
      {isOpen && (
        <div
          id="dropdown"
          className={`w-full flex flex-col pl-8 max-md:mt-6 py-1 pb-2 text-[#F8F9FA] rounded-[25px] gap-2 bg-[#303134] drop-shadow-lg z-50 relative ${isOpen ? 'block' : 'hidden'
            }`}
        >
          {/* Landing Option*/}
          <div className="flex flex-row relative rounded-full">
            <span className="h-6 w-6 top-[13px] -mt-[5px] -ml-4 absolute pointer-events-none">
              <svg
                focusable="false"
                fill="#9aa0a6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </span>
            <li className="text-[#F8F9FA] font-thin block px-4 py-2 pointer-events-none">
              What are you looking for?
            </li>
          </div>
          {categories.map((category, index) => (
            <div className="flex flex-row relative hover:bg-[#3c4043] rounded cursor-pointer" key={index}>
              <span className="h-6 w-6 -ml-4 mt-2.5 absolute pointer-events-none">
                <svg
                  focusable="false"
                  fill="#9aa0a6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
              <li
                onClick={() => handleOptionClick(category.name)}
                className="block px-4 py-2 w-full cursor-pointer"
              >
                <span className="font-thin">I want </span>
                <span className="font-bold">{category.name}</span>
              </li>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}