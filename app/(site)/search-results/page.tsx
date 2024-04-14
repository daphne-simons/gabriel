import Image from 'next/image'
import SearchBar from '../components/SearchBar'

export default function SearchResults() {
  return (
    <>
      <div className="h-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-300 p-2">
          {/* Logo */}
          <div className="place-self-center px-2">
            <Image
              id="searchbarimage"
              src="/google-logo.png"
              width="200"
              height="100"
              alt="Search Bar Image"
              className="mt-4 sm:mt-6 md:mt-8 mx-2 sm:mx-4 md:mx-6 sm:w-24 md:w-32  h-auto sm:h-auto md:h-auto"
              // src="images/googlelogo_color_92x30dp.png"
            />
          </div>
          {/* Searchbar */}
          <div id="search-area" className="flex flex-row-reverse relative">
            <button
              id="search-btn"
              className="h-20 w-6 mt-1 top-0 right-4 absolute "
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
              className="mt-[20px] p-[20px] w-[640px] h-[46px] border border-gray-300 rounded-full text-black placeholder-gray-500 outline-none text-base focus:shadow-md focus:border-transparent hover:border-transparent"
              placeholder="Search..."
              type="text"
              // value="computer engineering mutex concept"
            />
          </div>
          <div className="flex flex-row align-items-center justify-center">
            {/* Apps Area */}
            <div id="apps-area" className="p-4">
              <a href="#" role="button">
                <svg
                  viewBox="0 0 24 24"
                  className="p-1.5 w-10 h-10 text-gray-600 rounded-full fill-gray-600 bg-gray-200 hover:text-gray-800 focus:outline-none"
                >
                  <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                </svg>
              </a>
            </div>
            {/* Sign in area   */}
            <div id="signin-area" className="mt-6">
              <a
                href="#"
                id="sign-in"
                className="mr-2 px-6 py-3 font-normal text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
