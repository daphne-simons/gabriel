import Link from 'next/link'
import BackGround from './components/BackGround'
import SearchBar from './components/SearchBar'
import MoonWidget from './components/MoonWidget'
import Header from './components/Header'

export default async function Home() {
  return (
    <>
      {/* Background wrapper to dynamically change theme according to Moon Phase. */}
      <BackGround>
        <div className="flex flex-col justify-between h-screen">
          {/* Nav */}
          <div className="flex justify-between mt-5 px-7 text-sm">
            <Link href="#" className="flex gap-8 hover:underline">
              About
            </Link>
            <Link href="/search-results" className="flex gap-8 hover:underline">
              Search Results
            </Link>
            <Link href="/moon" className="flex gap-8 hover:underline">
              Moon Widget
              <MoonWidget />
            </Link>
          </div>
          {/* Middle section  */}
          <div className="middle flex flex-col justify-evenly items-center h-[30%] -mt-40">
            {/* Heading */}
            <Header color="bg-yellow-300" size="text-5xl" weight="thin" />
            {/* Div for Search Input */}
            <SearchBar />
            <div>
              {/* Feeling Lucky/ Contact Button */}
              <Link href="/contact">
                <button className="px-4 py-2 bg-gray-300 rounded border border-[#202124] hover:border hover:border-gray-500 text-sm">
                  I&apos;m Feeling Lucky
                </button>
              </Link>
            </div>
          </div>
          {/* TODO - Footer */}
          <div></div>
        </div>
      </BackGround>
    </>
  )
}
