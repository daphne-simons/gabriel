import { Project } from '@/sanity/models/sanity-client-models'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import Link from 'next/link'

interface Props {
  project: Project
  handleClickSelection: () => void
  chosenProjects: Project[]
  updateSelectedProject: (id: string) => void
}
export default function SelectedProject({
  project,
  chosenProjects,
  updateSelectedProject,
  handleClickSelection,
}: Props) {
  // Find the current project's index
  const currentIndex = chosenProjects.findIndex((p) => p._id === project._id)
  // Determine the next and previous projects
  const previousProject =
    currentIndex > 0 ? chosenProjects[currentIndex - 1] : null
  const nextProject =
    currentIndex < chosenProjects.length - 1
      ? chosenProjects[currentIndex + 1]
      : null
  return (
    <div className="h-full rounded-xl text-white bg-[#171717] flex flex-col">
      <section className="flex flex-row justify-end gap-4 py-4 px-6">
        {/* Left Arrow button */}
        <button
          className="text-md"
          onClick={() =>
            previousProject && updateSelectedProject(previousProject._id)
          }
          disabled={!previousProject}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="#BDC1C5"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
        {/* Right Arrow button */}
        <button
          className="text-md"
          onClick={() => nextProject && updateSelectedProject(nextProject._id)}
          disabled={!nextProject}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="#BDC1C5"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>
        {/* Close button  */}
        <button onClick={handleClickSelection} className="text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#BDC1C5"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </section>
      <section className="flex bg-black h-full">
        <div className="w-full relative ">
          <Image
            src={project.image}
            className="object-contain"
            alt="book"
            fill
            sizes="100vw"
          />
        </div>
      </section>
      <section className="flex flex-row gap-4 py-4 px-6 justify-between">
        <div>
          <h2 className={`text-xl font-medium text-[#8AB4F7]`}>
            {/* Project Title: */}
            {project.name}
          </h2>
          <p className="w-5/6 text-sm text-[#BDC1C5]">
            {/* Project Description: */}
            <PortableText value={project.description} />
          </p>
        </div>
        <div className="flex items-center">
          {/* Project External URL: */}
          {project.url ? (
            <Link href={project.url}>
              <button className="bg-[#8AB4F7] flex flex-row items-center rounded-full text-[#303134] text-sm px-3 py-2">
                <p className="px-2">Visit</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 -960 960 960"
                  width="16px"
                  fill="#303134"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
              </button>
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  )
}
