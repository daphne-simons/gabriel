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
    <div className="h-full ring-1 rounded-xl ring-[#7d8084] flex flex-col">
      {/* GALLERY Grid */}
      <div className="flex-1">
        <Gallery
          handleClickSelection={handleClickSelection}
          chosenProjects={chosenProjects}
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-2 flex flex-col">
        {/* Top Text Part */}
        <div className="flex-shrink-0 mb-4">
          <h1 className={`${headingColor[option.gem]} text-3xl mb-2`}>
            {option.gem}
          </h1>
          <p className="text-[#BDC1C5] text-sm lg:text-lg xl:text-lg">
            {option.level}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#7d8084] mb-4"></div>

        {/* Bottom Text Part - Flexible container */}
        <div className="flex-1 flex flex-col justify-between min-h-0">
          {/* Details text */}
          <div className="flex-1 mb-4">
            <p className="text-[#BDC1C5] text-sm xl:text-base">
              <PortableText value={option.details} />
            </p>
          </div>

          {/* Button - Always at bottom */}
          <div className="flex-shrink-0 mb-4">
            <div className="bg-[#535560] hover:bg-[#5e606c] rounded-full w-1/2">
              <Link
                href={{
                  pathname: '/enquiry',
                  query: {
                    category: encodeURIComponent(chosenCategory ?? ''),
                    gem: option.gem,
                    level: option.level,
                    cost: option.cost,
                  },
                }}
              >
                <h3 className="text-googleLightGray text-base px-5 py-2 text-center"
                  data-testid="enquire-button">
                  Enquire
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}