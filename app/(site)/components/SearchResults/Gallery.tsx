import { Project } from '@/sanity/models/project'
import Image from 'next/image'

interface Props {
  handleClickSelection: (index: string | null) => void
  chosenProjects: Project[]
}
export default function Gallery({
  handleClickSelection,
  chosenProjects,
}: Props) {
  // Define grid styles dynamically for each item
  const gridStyles = [
    'col-span-4 row-span-4 rounded-tl-xl',
    'col-span-3 row-span-2',
    'col-span-1 row-span-2 rounded-tr-xl',
    'col-span-2 row-span-2',
    'col-span-2 row-span-2',
  ]
  return (
    <div
      id="gallery-grid"
      className="w-full h-full grid grid-cols-8 grid-rows-4 gap-1"
    >
      {/* Map through gem related chosenProjects and dynamically apply grid styles */}
      {chosenProjects.map((project, index) => (
        <div
          key={project._id}
          id={project._id}
          onClick={() => handleClickSelection(project._id)}
          className={`relative overflow-hidden ${gridStyles[index % gridStyles.length]} `}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="100vw"
            className="object-cover hover:scale-125 transition duration-500 ease-in-out"
          />
        </div>
      ))}
    </div>
  )
}
