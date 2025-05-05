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
      <div className="h-1/2">
        <Gallery
          handleClickSelection={handleClickSelection}
          chosenProjects={chosenProjects}
        />
      </div>
      <div className="h-1/2 w-full py-2 ">
        {/* Top Text Part */}
        <div className="max-md:h-[40%] md:h-[45%] lg:h-[40%] xl:h-1/2  px-2 pb-2 flex flex-col justify-around">
          <h1 className={`${headingColor[option.gem]} text-3xl `}>
            {option.gem}
          </h1>
          <p className="text-[#BDC1C5] text-sm lg:text-lg xl:text-lg">{option.level}</p>
        </div>
        {/* Bottom Text Part */}
        <div className="max-md:h-[60%] md:h-[55%] lg:h-[60%] xl:h-1/2 px-2 pt-2 flex flex-col justify-around border-t border-[#7d8084]">
          <div>
            <p className=" text-[#BDC1C5] text-sm xl:text-base">
              <PortableText value={option.details} />
            </p>
          </div>

          {/* Dynamically updates Query Parameters - cleaner query building */}
          <div className="bg-[#535560] hover:bg-[#5e606c] rounded-full w-1/2">
            <Link
              href={{
                pathname: '/enquiry',
                query: {
                  category: encodeURIComponent(chosenCategory ?? ''), // Encode category string, returns empty string if chosenCategory is null
                  gem: option.gem,
                  level: option.level,
                  cost: option.cost,
                },
              }}
            >
              <h3 className="text-googleLightGray text-base px-5 py-2 text-center">
                Enquire
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
