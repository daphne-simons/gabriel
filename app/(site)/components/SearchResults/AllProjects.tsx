import Link from 'next/link'
import Gallery from './Gallery'

interface Props {
  option: {
    gem: string
    level: string
    cost: string
  }
  chosenService: string
  chosenGemLevel: string
  handleClickSelection: (index: number) => void
}
export default function AllProjects({
  option,
  chosenService,
  chosenGemLevel,
  handleClickSelection,
}: Props) {
  // Changes the gem selection heading colour:
  const headingColor: { [key: string]: string } = {
    Sapphire: 'text-blue-600',
    Emerald: 'text-green-600',
    Ruby: 'text-red-600',
  }
  console.log('option', option)
  console.log('chosenService', chosenService)

  return (
    <div className="h-full ring-1 rounded-xl ring-[#7d8084]">
      {/* GALLERY Grid */}
      <div className="h-2/5 ">
        <Gallery handleClickSelection={handleClickSelection} />
      </div>
      {/* Text Part */}
      <div className="h-1/5 px-2 pt-2">
        <h1
          className={`${headingColor[chosenGemLevel]} ${headingColor[option.gem]} text-3xl`}
        >
          {option.gem}
        </h1>
        <p className="pt-2 text-[#BDC1C5] text-sm">{option.level}</p>
      </div>
      <div className="px-2 pt-2 h-2/5 border-t  border-[#7d8084]">
        <p className=" text-[#BDC1C5] text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          veritatis tempora eum eos a dolore exercitationem assumenda et
          officiis commodi explicabo beatae voluptas sint quo eveniet omnis
          eligendi accusantium hic.
        </p>
        {/* Dynamically updates Query Parameters - cleaner query building */}
        <Link
          href={{
            pathname: '/contact',
            query: {
              service: encodeURIComponent(chosenService), // Encode service string
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
