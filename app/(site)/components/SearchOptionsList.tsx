import { useState } from 'react'
import SearchSideBar from './SearchSideBar'

interface Props {
  options: {
    gem: string
    level: string
    cost: string
  }[]
}

export default function SearchOptionsList({ options }: Props) {
  // TODO - make data structure in sanity that I can fetch with a query here and map through!
  // This state is for the sideBar component.
  const [option, setOption] = useState({
    gem: 'Sapphire',
    level: 'Essential Identity',
    cost: '2000-4000',
  })
  return (
    <>
      <div className="flex flex-row">
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
                      <h2 className=" pl-2 font-bold text-gray-500">
                        {option.level}
                      </h2>
                      <div className="flex flex-row">
                        <a href="#" className="pl-2 text-gray-500">
                          Cost Guide AUD {option.cost}
                        </a>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setOption(option)}>
                    <h2 className={`text-2xl font-medium ${'text-blue-400'}`}>
                      {option.gem}
                    </h2>
                  </button>
                  <p className="w-5/6">
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
          <SearchSideBar option={option} />
        </div>
      </div>
    </>
  )
}
