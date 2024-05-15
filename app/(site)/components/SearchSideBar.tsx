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
    <div className="h-full border rounded-2xl">
      {/* Gallery Grid */}
      <div className="h-2/5 border-b border-gray-200">
        <Gallery />
      </div>
      {/* Text Part */}
      <div className="h-1/5 px-2 pt-2">
        <h1 className="text-blue-600 text-3xl">{option.gem}</h1>
        <p className="pt-2 text-gray-500 text-sm">{option.level}</p>
      </div>
      <div className="px-2 pt-2 h-2/5 border-t  border-gray-200">
        <p className=" text-gray-500 text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          veritatis tempora eum eos a dolore exercitationem assumenda et
          officiis commodi explicabo beatae voluptas sint quo eveniet omnis
          eligendi accusantium hic.
        </p>
        {/* this should be a query parameter, instead of a path */}
        <Link
          href={`/contact?service=${chosenService}&gem=${option.gem}&level=${option.level}&cost=${option.cost}`}
        >
          <h3 className="pt-2 text-l font-bold text-blue-400">Enquire</h3>
        </Link>
      </div>
    </div>
  )
}
