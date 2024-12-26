import { useState } from 'react'
import AllProjects from './AllProjects'
import SelectedProject from './SelectedProject'

interface Props {
  options: {
    gem: string
    level: string
    cost: string
  }[]
  chosenService: string
}

export default function SearchOptionsList({ options, chosenService }: Props) {
  // TODO - make data structure in sanity that I can fetch with a query here and map through!
  // This state is for the sideBar component.
  const [option, setOption] = useState({
    gem: 'Sapphire',
    level: 'Essential',
    cost: '2000-4000',
  })
  // State for toggling all works or a specific work on the side-bar gallery
  // initial state is 0 - for showing all works
  const [selection, setSelection] = useState<number>(0)

  // handleClick to go between all or specific work

  const handleClickSelection = (index: number) => {
    setSelection(index)
  }

  return (
    <>
      <div className="pt-6 flex flex-row">
        <div className="flex flex-col w-2/3">
          {options.map((option) => (
            <div key={option.gem} className="">
              <div id="searchresult">
                <div className="pt-6">
                  <div className="flex flex-row">
                    <div
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
                  <button onClick={() => setOption(option)}>
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
          {/* Show SELECTED work: */}
          {/* Selected === truthy === 1 */}
          {selection ? (
            <SelectedProject handleClickSelection={handleClickSelection} />
          ) : (
            // Show ALL works:
            // Selected === falsy === 0
            <AllProjects
              option={option}
              chosenService={chosenService}
              handleClickSelection={handleClickSelection}
            />
          )}
        </div>
      </div>
    </>
  )
}
