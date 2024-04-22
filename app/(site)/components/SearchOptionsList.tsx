export default function SearchOptionsList() {
  // TODO - make data structure in sanity that I can fetch with a query here and map through!

  return (
    <div id="searchresult">
      {/* Option 1 */}
      <div className="pt-6">
        <div className="flex flex-row">
          <div className="rounded-full w-10 h-10 bg-blue-600"></div>
          <div>
            <h2 className=" pl-2 font-bold text-gray-500">
              Essential Identity
            </h2>
            <div className="flex flex-row">
              <a href="#" className="pl-2 text-gray-500">
                Cost Guide AUD 2000-4000
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-medium text-blue-400">Sapphire</h2>
        <p className="w-5/6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quos
          iure quia veritatis obcaecati, consequuntur cumque consequatur
          similique alias vel animi beatae modi itaque officiis quisquam quasi
          autem voluptatum. Officiis.
        </p>
      </div>
      {/* Option 2 */}
      <div className="pt-6">
        <div className="flex flex-row">
          <div className="rounded-full w-10 h-10 bg-green-600"></div>
          <div>
            <h2 className=" pl-2 font-bold text-gray-500">
              Comprehensive Identity
            </h2>
            <div className="flex flex-row">
              <a href="#" className="pl-2 text-gray-500">
                Cost Guide AUD 4000-6000
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-medium text-blue-400">Emerald</h2>
        <p className="w-5/6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
          dolor exercitationem sint, commodi voluptate a quisquam ipsam illo
          inventore tempore impedit alias aspernatur laborum, pariatur sunt. Cum
          sequi ipsam amet?
        </p>
      </div>
      {/* Option 3 */}
      <div className="pt-6">
        <div className="flex flex-row">
          <div className="rounded-full w-10 h-10 bg-red-600"></div>
          <div>
            <h2 className=" pl-2 font-bold text-gray-500">Premium Identity</h2>
            <div className="flex flex-row">
              <a href="#" className="pl-2 text-gray-500">
                Cost Guide AUD 6000-10,000
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-medium text-blue-400">Ruby</h2>
        <p className="w-5/6">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore
          harum quasi earum cupiditate possimus maxime fuga deleniti pariatur
          debitis vel modi, animi at nemo quisquam, corrupti temporibus quod
          aliquam nam?
        </p>
      </div>
    </div>
  )
}
