import { useCallback, useEffect, useState } from 'react'
import AllProjects from './AllProjects'
import SelectedProject from './SelectedProject'
import { Project } from '@/types/project'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
interface Props {
  options: {
    gem: string
    level: string
    cost: string
  }[]
  chosenService: string
  projects: Project[]
}

export default function SearchOptionsList({
  options,
  chosenService,
  projects,
}: Props) {
  // HOOKS
  const searchParams = useSearchParams()
  const path = usePathname()
  const router = useRouter()
  const [option, setOption] = useState({
    gem: 'Sapphire',
    level: 'Essential',
    cost: '2000-4000',
  })
  // STATES
  const [chosenProjects, setChosenProjects] = useState<Project[]>([
    {
      _id: '',
      _createdAt: new Date(),
      name: '',
      slug: '',
      image: '',
      url: '',
      gem: '',
      content: [],
    },
  ])
  // State for toggling between AllProjects and SelectedProject on the side-bar gallery
  // null shows all, a specific id will show a specific project
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  )
  // USE EFFECTS
  // Filter projects by gem
  useEffect(() => {
    const projectsByGem = projects.filter((project) => {
      return project.gem === option.gem
    })
    setChosenProjects(projectsByGem)
  }, [projects, option.gem])

  // Syncs up the gem query from the URL with the gem option state
  useEffect(() => {
    const gemParam = searchParams.get('gem')
    if (gemParam) {
      setOption((prev) => ({ ...prev, gem: gemParam }))
    }
  }, [searchParams])

  // Resets the gem to default 'Sapphire' when chosenService changes
  useEffect(() => {
    setOption((prev) => ({
      ...prev,
      gem: 'Sapphire', // Default gem
    }))
    // Optionally clear the gem query from the URL if needed
    const params = new URLSearchParams(searchParams.toString())
    params.delete('gem')
    router.push(`${path}?${params.toString()}`)
  }, [chosenService])

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  const handleClickSelection = (id: string | null) => {
    setSelectedProjectId(id)
  }

  const handleGemClick = (gemOption: {
    gem: string
    level: string
    cost: string
  }) => {
    setOption(gemOption)
    handleClickSelection(null)

    const queryString = createQueryString('gem', gemOption.gem)

    // Update the URL with the new query string
    router.push(`${path}?${queryString}`)
  }

  return (
    <>
      <div className="pt-6 flex flex-row">
        {/* LEFT SIDE BAR - SERVICES INFO  */}
        <div className="flex flex-col w-2/3">
          {options.map((option) => (
            <div key={option.gem} className="">
              <div id="searchresult">
                <div className="pt-6">
                  <div className="flex flex-row">
                    <div
                      onClick={() => handleGemClick(option)}
                      className={`rounded-full w-10 h-10 ${
                        option.gem === 'Sapphire'
                          ? 'bg-blue-600'
                          : option.gem === 'Emerald'
                            ? 'bg-green-600'
                            : option.gem === 'Ruby'
                              ? 'bg-red-600'
                              : ''
                      }`}
                    ></div>
                    <div>
                      <h2 className=" pl-2 text-sm  text-[#F8F9FA]">
                        {option.level} Identity
                      </h2>
                      <div className="flex flex-row">
                        <a href="#" className="pl-2  text-sm text-[#BDC1C5]">
                          Cost Guide AUD {option.cost}
                        </a>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleGemClick(option)}>
                    <h2 className={`pt-2 text-xl font-medium text-[#8AB4F7]`}>
                      {option.gem}
                    </h2>
                  </button>
                  <p className="w-5/6 text-base text-[#BDC1C5]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero quos iure quia veritatis obcaecati, consequuntur cumque
                    consequatur similique alias vel animi beatae modi itaque
                    officiis quisquam quasi autem voluptatum. Officiis.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 flex flex-col pr-32 pt-6">
          {/* Show SELECTED project: */}
          {selectedProjectId ? (
            <SelectedProject
              project={projects.find((p) => p._id === selectedProjectId)!}
              chosenProjects={chosenProjects}
              updateSelectedProject={(id: string) => setSelectedProjectId(id)}
              handleClickSelection={() => handleClickSelection(null)}
            />
          ) : (
            // Show ALL projects:
            <AllProjects
              option={option}
              chosenService={chosenService}
              handleClickSelection={handleClickSelection}
              chosenProjects={chosenProjects}
            />
          )}
        </div>
      </div>
    </>
  )
}
