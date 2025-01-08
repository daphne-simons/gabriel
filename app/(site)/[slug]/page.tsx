// import { getPage } from '@/sanity/sanity-utils'
// import { PortableText } from '@portabletext/react'
// import { revalidatePath } from 'next/cache'
// type Props = {
//   params: { slug: string }
// }

// export default async function Page({ params }: Props) {
//   const staleRoute = `/${params.slug}`
//   revalidatePath(staleRoute)
//   const page = await getPage(params.slug)
//   return (
//     <div>
//       <h1 className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent text-5xl font-extrabold drop-shadow">
//         {page.title}
//       </h1>
//       <div className="text-lg text-gray-700 mt-10">
//         <PortableText value={page.content} />
//       </div>
//     </div>
//   )
// }
