import Image from 'next/image'
import SearchBar from '../components/SearchBar'
import MoonWidget from '../components/MoonWidget'
import { PT_Serif } from 'next/font/google'

const serif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})
export default function SearchResults() {
  return (
    <>
      <div className="h-auto">
        {/* Header */}
        <div className="flex flex-row relative gap-4 border-b border-gray-300 p-2">
          {/* Wrapper logo and search bar */}
          <div className="flex w-full">
            {/* Logo */}
            <div className="p-6 flex items-center">
              <h1 className={serif.className}>
                <span className="text-3xl">Gabriel</span>
              </h1>
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
                placeholder="Search..."
                type="text"
                // value="computer engineering mutex concept"
              />
            </div>
          </div>
          <div className="flex flex-row relative">
            {/* </div> */}
            <div className="absolute right-6 mt-5">
              <MoonWidget />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
