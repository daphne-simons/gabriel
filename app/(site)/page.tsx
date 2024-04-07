import Image from 'next/image'
import Projects from './components/Projects'
import Link from 'next/link'
import { PT_Serif } from 'next/font/google'

const serif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

export default async function Home() {
  return (
    <>
      <div className="flex flex-col justify-between h-screen bg-[#202124] text-white">
        {/* Nav */}
        <div className="flex justify-between mt-5 px-7 text-sm">
          <Link href="#" className="flex gap-8 hover:underline">
            About
          </Link>
          <Link href="#" className="flex gap-8 hover:underline">
            Moon Widget
          </Link>
        </div>
        {/* Middle section  */}
        <div className="middle flex flex-col justify-evenly items-center h-[30%] -mt-40">
          {/* Heading */}
          <h1 className={serif.className}>
            <span className="text-5xl">Gabriel</span>
          </h1>
          {/* Div for Search Input */}
          <div className="flex flex-row relative w-[90%] max-w-lg px-4">
            <div className="">
              <span className="h-5 w-5 absolute mt-4 ml-4">
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
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-[100%] bg-[#202124] border border-gray-500 text-white pl-12 pr-20 py-3 rounded-full hover:bg-[#303134] outline-none"
            />
          </div>
          <div>
            {/* Feeling Lucky/ Contact Button */}
            <button className="px-4 py-2 bg-[#303134] rounded border border-[#202124] hover:border hover:border-gray-500 text-sm">
              I&apos;m Feeling Lucky
            </button>
          </div>
        </div>
        {/* Footer */}
        <div></div>
      </div>
    </>
  )
}
