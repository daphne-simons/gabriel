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
      <div className="h-2/5 ">
        <Gallery
          handleClickSelection={handleClickSelection}
          chosenProjects={chosenProjects}
        />
      </div>
      {/* Text Part */}
      <div className="h-1/5 px-2 pt-2">
        <h1 className={`${headingColor[option.gem]} text-3xl`}>{option.gem}</h1>
        <p className="pt-2 text-[#BDC1C5] text-sm">{option.level}</p>
      </div>
      <div className="px-2 pt-2 h-2/5 border-t  border-[#7d8084]">
        <p className=" text-[#BDC1C5] text-base">
          <PortableText value={option.details} />
        </p>
        {/* Dynamically updates Query Parameters - cleaner query building */}
        <Link
          href={{
            pathname: '/contact',
            query: {
              // TODO: fix this chosenCategory bug
              category: encodeURIComponent(chosenCategory ?? ''), // Encode category string, returns empty string if chosenCategory is null
              gem: option.gem,
              level: option.level,
              cost: option.cost,
            },
          }}
        >
          <h3 className="pt-2 text-l font-bold text-[#8AB4F7]">Enquire</h3>
        </Link>
      </div>
    </div>
  )
}
