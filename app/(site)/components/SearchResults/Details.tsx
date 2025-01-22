import { Category } from '@/sanity/models/sanity-client-models'
import { PortableText } from 'next-sanity'

export default async function Details({
  categories,
  chosenCategory,
}: {
  categories: Category[]
  chosenCategory: string | null
}) {
  const category = categories.find(
    (category) => category.name === chosenCategory
  )

  if (!category) {
    return null
  }

  return (
    <div className="pt-2 w-1/3">
      <h1 className="text-xl text-[#8AB4F7] py-4">
        Additional details about {category.name}
      </h1>
      <p className="text-[#BDC1C5]">
        <PortableText value={category.details} />
      </p>
    </div>
  )
}
