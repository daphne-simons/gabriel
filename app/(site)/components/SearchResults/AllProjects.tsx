import Link from 'next/link'
import Gallery from './Gallery'
import { Project, Tier } from '@/sanity/models/sanity-client-models'
import { PortableText } from 'next-sanity'
interface Props {
  option: Tier
  chosenCategory: string | null
  chosenProjects: Project[]
  handleClickSelection: (index: string | null) => void
}
export default function AllProjects({
  option,
  chosenCategory,
  chosenProjects,
  handleClickSelection,
}: Props) {
  // Changes heading colour according to gem:
  const headingColor: { [key: string]: string } = {
    Sapphire: 'text-blue-600',
    Emerald: 'text-green-600',
    Ruby: 'text-red-600',
  }

  return (
    <div className="h-full ring-1 rounded-xl ring-[#7d8084]">
      {/* GALLERY Grid */}
      <div className="h-1/2 ">
        <Gallery
          handleClickSelection={handleClickSelection}
          chosenProjects={chosenProjects}
        />
      </div>
      <div className="w-full px-2 py-2">
        {/* Top Text Part */}
        <div className="flex flex-col items-stretch">
          <h1 className={`${headingColor[option.gem]} text-3xl py-2`}>
            {option.gem}
          </h1>
          <p className="text-[#BDC1C5] text-sm pt-2 pb-4">{option.level}</p>
        </div>
        {/* Bottom Text Part */}
        <div className="flex flex-col items-stretch border-t border-[#7d8084]">
          <p className=" text-[#BDC1C5] text-sm py-2">
            <PortableText value={option.details} />
          </p>
          {/* Dynamically updates Query Parameters - cleaner query building */}
          <Link
            className=""
            href={{
              pathname: '/contact',
              query: {
                category: encodeURIComponent(chosenCategory ?? ''), // Encode category string, returns empty string if chosenCategory is null
                gem: option.gem,
                level: option.level,
                cost: option.cost,
              },
            }}
          >
            <button className=" bg-[#535560] hover:bg-[#5e606c] align-middle rounded-full text-googleLightGray text-base px-3 py-2 w-1/2">
              <h3 className="px-2">Enquire</h3>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
