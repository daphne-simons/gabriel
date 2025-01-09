import { Project } from '@/types/project'
import Image from 'next/image'

interface Props {
  handleClickSelection: (index: number) => void
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
      {/* TODO: map through chosenImages and render just like the HARDCODED GOOGLE STYLE IMG GRID- but dynamic*/}

      {/* Map through chosenProjects and dynamically apply grid styles */}
      {chosenProjects.slice(0, gridStyles.length).map((project, index) => (
        <div
          key={project._id}
          id={project._id}
          onClick={() => handleClickSelection(index)}
          className={`relative overflow-hidden ${gridStyles[index]} `}
        >
          <Image
            src={project.image}
            alt={project.name}
            width={0}
            height={0}
            className="rounded-lg fill object-cover"
          />
        </div>
      ))}
    </div>
  )
}
