// import { getProject } from '@/sanity/sanity-utils'
// import { PortableText } from '@portabletext/react'
// import Image from 'next/image'
// type Props = {
//   params: { project: string }
// }
// export default async function Project({ params }: Props) {
//   const slug = params.project
//   // get project by slug:
//   const project = await getProject(slug)

//   return (
//     <div>
//       <header className="flex items-center justify-between">
//         <h1 className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent text-5xl font-extrabold drop-shadow">
//           {project.name}
//         </h1>
//         {/* Link that opens a new tab */}
//         <a
//           href={project.url}
//           title="View Project"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-gray-100 text-gray-500 font-bold px-4 py-3 rounded-lg whitespace-nowrap hover:bg-pink-500 hover:text-pink-100 transition"
//         >
//           View Project
//         </a>
//       </header>
//       {/* content goes here */}
//       <div className="text-lg text-gray-700 mt-5">
//         {/* This allows react to read the values of portable txt content */}
//         <PortableText value={project.content} />
//       </div>

//       {/* image goes here */}
//       <Image
//         src={project.image}
//         alt={project.name}
//         width={1920}
//         height={1080}
//         className="mt-10 border-2 border-gray-700 object-cover rounded-xl"
//       />
//     </div>
//   )
// }
