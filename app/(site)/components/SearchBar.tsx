'use client'
import { useState } from 'react'
export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div
      className={`relative flex flex-col w-full max-w-xl justify-start bg-[#202124] border border-gray-500 rounded-full hover:ring-none hover:bg-[#303134] outline-none pl-14 py-3 ${
        isOpen ? 'h-auto ring-none w-[90%]' : ''
      }`}
      onClick={toggleDropdown}
    >
      {/* Main Search Bar */}
      <div className="flex flex-row relative cursor-pointer">
        <div className="">
          <span className="h-5 w-5 -ml-8 mt-0.5 absolute">
            <svg
              focusable="false"
              fill="#9aa0a6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
        </div>
        {/* Search input */}
        <p className="text-gray-400">What are you looking for?</p>
      </div>
      {/* Dropdown Menu */}
      <div
        id="dropdown"
        className={`absolute z-10 pl-10 py-1.5 max-w-xl text-gray-400  w-full rounded-[25px] left-1/2 -translate-x-1/2 -translate-y-3.5 flex flex-col gap-2 bg-[#303134] ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Option */}
        <div className="flex flex-row relative hover:bg-[#303134]">
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
        {/* Option 2 */}
        <div className="flex flex-row relative hover:bg-[#303134]">
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
          <li className="block px-4 py-2">Option 1</li>
        </div>
        {/* Option 3 */}
        <div className="flex flex-row relative hover:bg-[#303134]">
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
          <li className="block px-4 py-2">Option 2</li>
        </div>
        {/* Option 4 */}
        <div className="flex flex-row relative hover:bg-[#303134]">
          <span className="h-5 w-5 -ml-4 mt-2 absolute">
            <svg
              focusable="false"
              fill="#9aa0a6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
          <li className="block px-4 py-2 ">Option 3</li>
        </div>
        {/* Option 5 */}
        <div className="flex flex-row relative">
          <span className="h-5 w-5 -ml-4 mt-2 absolute">
            <svg
              focusable="false"
              fill="#9aa0a6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
          <li className="block px-4 py-2 hover:bg-[#303134]">Option 4</li>
        </div>
      </div>
    </div>
  )
}
