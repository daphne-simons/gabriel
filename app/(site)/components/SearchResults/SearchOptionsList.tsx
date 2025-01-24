import { useCallback, useEffect, useState } from 'react'
import AllProjects from './AllProjects'
import SelectedProject from './SelectedProject'
import { Project, Tier } from '@/sanity/models/sanity-client-models'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { PortableText } from 'next-sanity'
interface Props {
  tiers: Tier[]
  chosenCategory: string | null
  projects: Project[]
}

export default function SearchOptionsList({
  tiers,
  chosenCategory,
  projects,
}: Props) {
  // --- HOOKS:
  const searchParams = useSearchParams()
  const path = usePathname()
  const router = useRouter()
  // --- STATES:

  const bgColorHover: { [key: string]: string } = {
    Sapphire: 'hover:bg-googleBlue',
    Emerald: 'hover:bg-googleGreen',
    Ruby: 'hover:bg-googleRed',
  }

  const [option, setOption] = useState<Tier>({
    _id: '',
    gem: '',
    level: '',
    cost: '',
    details: [],
  })
  const [chosenProjects, setChosenProjects] = useState<Project[]>([
    {
      _id: '',
      name: '',
      image: '',
      url: '',
      gem: '',
      category: '',
      description: [],
    },
  ])
  // State for toggling between AllProjects and SelectedProject on the side-bar gallery
  // null shows all, a specific id will show a specific project
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  )
  // --- URL PARAMS:

  const tierParam = searchParams.get('tier')
  const categoryParam = searchParams.get('category')

  // --- USE EFFECTS:

  // Filter projects by gem
  useEffect(() => {
    const projectsByGem = projects.filter((project) => {
      return project.gem === option.gem
    })
    setChosenProjects(projectsByGem)
  }, [projects, option.gem])

  // Get a new searchParams string by merging the current searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  // Update the URL with the new query string, if no tier, make default Sapphire
  useEffect(() => {
    if (tierParam === null) {
      const sapphire = tiers.find((tier) => tier.gem === 'Sapphire')
      if (sapphire) {
        setOption(sapphire)
        const queryString = createQueryString('tier', sapphire.gem)
        // Update the URL with the new query string
        router.push(`${path}?${queryString}`)
      } else {
        return
      }
    }
    // push.router creates potential ESLint errors, here are the docs and the appropriate ways to handle these errors:
    // https://nextjs.org/docs/pages/api-reference/functions/use-router#potential-eslint-errors
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam, tierParam]) // when either of these change, it runs the useEffect.

  // Set the option to Sapphire by default on page load.
  useEffect(() => {
    setOption(tiers[0])
  }, [])

  const handleClickSelection = (id: string | null) => {
    setSelectedProjectId(id)
  }

  const handleGemClick = (tier: Tier) => {
    setOption(tier)
    handleClickSelection(null)
    const queryString = createQueryString('tier', tier.gem)
    // Update the URL with the new query string
    router.push(`${path}?${queryString}`)
  }

  return (
    <>
      {/* LEFT SIDE BAR - TIERS INFO  */}
      {/* Large Screens Tiers Info: */}
      <div className="flex flex-col max-lg:hidden lg:w-4/6 xl:w-full 2xl:w-full">
        {tiers.map((tier) => (
          <div key={tier.gem} className="">
            <div id="searchresult">
              <div className="pt-6">
                <div className="flex flex-row">
                  <div
                    onClick={() => handleGemClick(tier)}
                    className={`rounded-full w-10 h-10 ${
                      tier.gem === 'Sapphire'
                        ? 'bg-googleBlue'
                        : tier.gem === 'Emerald'
                          ? 'bg-googleGreen'
                          : tier.gem === 'Ruby'
                            ? 'bg-googleRed'
                            : ''
                    }`}
                  ></div>
                  <div>
                    <h2 className=" pl-2 text-sm  text-[#F8F9FA]">
                      {tier.level} Identity
                    </h2>
                    <div className="flex flex-row">
                      <a href="#" className="pl-2  text-sm text-[#BDC1C5]">
                        Cost Guide AUD {tier.cost}
                      </a>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleGemClick(tier)}>
                  <h2 className={`pt-2 text-xl font-medium text-[#8AB4F7]`}>
                    {tier.gem}
                  </h2>
                </button>
                <div className="w-5/6 text-base text-[#BDC1C5]">
                  <PortableText value={tier.details} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Medium and Smaller Tiers Buttons */}
      <div className="pt-6 pb-2 flex justify-start gap-4 lg:hidden xl:hidden w-full">
        {tiers.map((tier) => (
          <button
            key={tier.gem}
            onClick={() => handleGemClick(tier)}
            className={`text-center w-28 h-10 rounded-3xl text-googleLightGray ${bgColorHover[tier.gem]} ${
              option.gem === tier.gem
                ? tier.gem === 'Sapphire'
                  ? 'bg-googleBlue '
                  : tier.gem === 'Emerald'
                    ? 'bg-googleGreen'
                    : tier.gem === 'Ruby'
                      ? 'bg-googleRed'
                      : ''
                : tier.gem === 'Sapphire'
                  ? 'bg-googleBlueHover'
                  : tier.gem === 'Emerald'
                    ? 'bg-googleGreenHover'
                    : tier.gem === 'Ruby'
                      ? 'bg-googleRedHover'
                      : ''
            }`}
          >
            {tier.gem}
          </button>
        ))}
      </div>
      {/* RIGHT SIDE - PROJECTS GALLERY  */}
      <div className="flex flex-col max-md:h-[80%] md:h-[65%] lg:pr-24 lg:w-5/6 lg:h-[70%] xl:w-full xl:h-[70%] xl:pr-32 pt-6">
        {/* SELECTED project: */}
        {selectedProjectId ? (
          <SelectedProject
            project={projects.find((p) => p._id === selectedProjectId)!}
            chosenProjects={chosenProjects}
            updateSelectedProject={(id: string) => setSelectedProjectId(id)}
            handleClickSelection={() => handleClickSelection(null)}
          />
        ) : (
          // ALL projects:
          <AllProjects
            option={option}
            chosenCategory={chosenCategory}
            handleClickSelection={handleClickSelection}
            chosenProjects={chosenProjects}
          />
        )}
      </div>
    </>
  )
}
