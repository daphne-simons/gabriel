import { Category } from '@/sanity/models/sanity-client-models'
import { PortableText } from 'next-sanity'

export default function Details({
  chosenCategory,
}: {
  chosenCategory: Category
}) {
  return (
    <div className="pt-2 w-1/3">
      <h1 className="text-xl text-[#8AB4F7] py-4">
        Additional details about {chosenCategory.name}
      </h1>
      <p className="text-[#BDC1C5]">
        <PortableText value={chosenCategory.details} />
      </p>
    </div>
  )
}
