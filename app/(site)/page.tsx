import { revalidatePath } from 'next/cache'
import { getProjects } from '@/sanity/sanity-utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  // can use server side functions here, e.g. getProjects() db function
  const projects = await getProjects()
  // https://github.com/sanity-io/next-sanity?tab=readme-ov-file#cache-revalidation
  revalidatePath('/')
  return (
    <>
      <div>
        <h1 className="text-6xl font-bold">
          Gabriel {/* create some coloured gradient text */}
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Design
          </span>
        </h1>
        <p className="mt-3 text-xl text-gray-600">
          Kia ora! Check out my test projects!
        </p>
        <h2 className="mt-24 font-bold text-3xl text-gray-600">My Projects</h2>
        {/* responsive for devices */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <>
              <Link
                href={`projects/${project.slug}`}
                key={project._id}
                className="border-2 border-gray-500 rounded-lg p-1 hover:scale-105 hover:border-blue-500 transition"
              >
                {project.image && (
                  <div key={project._id}>
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={750}
                      height={300}
                      className="object-cover rounded-lg border border-gray-500"
                    />
                  </div>
                )}

                <div className="mt-2 font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {project.name}
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  )
}
