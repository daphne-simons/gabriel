import Link from 'next/link'
import Gallery from './Gallery'

interface Props {
  option: {
    gem: string
    level: string
    cost: string
  }
  chosenService: string
}
export default function SearchSideBar({ option, chosenService }: Props) {
  return (
    <div className="h-full ring ring-1 rounded-xl ring-[#7d8084]">
      {/* Gallery Grid */}
      <div className="h-2/5 ">
        <Gallery />
      </div>
      {/* Text Part */}
      <div className="h-1/5 px-2 pt-2">
        <h1 className="text-blue-600 text-3xl">{option.gem}</h1>
        <p className="pt-2 text-[#BDC1C5] text-sm">{option.level}</p>
      </div>
      <div className="px-2 pt-2 h-2/5 border-t  border-[#7d8084]">
        <p className=" text-[#BDC1C5] text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          veritatis tempora eum eos a dolore exercitationem assumenda et
          officiis commodi explicabo beatae voluptas sint quo eveniet omnis
          eligendi accusantium hic.
        </p>
        {/* this should be a query parameter, instead of a path */}
        <Link
          href={`/contact?service=${chosenService}&gem=${option.gem}&level=${option.level}&cost=${option.cost}`}
        >
          <h3 className="pt-2 text-l font-bold text-[#8AB4F7]">Enquire</h3>
        </Link>
      </div>
    </div>
  )
}
