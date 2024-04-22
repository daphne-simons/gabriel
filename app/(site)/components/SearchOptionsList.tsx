export default function SearchOptionsList() {
  // TODO - make data structure in sanity that I can fetch with a query here and map through!

  return (
    <div id="searchresult">
      {/* Option 1 */}
      <div className="pt-6">
        <div className="flex flex-row">
          <div className="border border-gray-300 rounded-full w-10 h-10 bg-blue-600"></div>
          <div>
            <h2 className=" pl-2 font-bold text-gray-500">
              Search Result Option 1
            </h2>
            <div className="flex flex-row">
              <a href="#" className="pl-2 text-gray-500">
                Cost Guide AUD 2000-4000
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-2xl text-gray-500">Option 1</h2>
        <p className="w-5/6">
          In computer science, a lock or mutex (from mutual exclusion) is a
          synchronization mechanism for enforcing limits on access to a resource
          in an environment where there are many threads of execution.
        </p>
      </div>
      {/* Option 2 */}
      <div className="pt-6">
        <div className="flex flex-row">
          <div className="border border-gray-300 rounded-full w-10 h-10 bg-blue-600"></div>
          <div>
            <h2 className=" pl-2 font-bold text-gray-500">
              Search Result Option 2
            </h2>
            <div className="flex flex-row">
              <a href="#" className="pl-2 text-gray-500">
                Cost Guide AUD 2000-4000
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-2xl text-gray-500">Option 2</h2>
        <p className="w-5/6">
          In computer science, a lock or mutex (from mutual exclusion) is a
          synchronization mechanism for enforcing limits on access to a resource
          in an environment where there are many threads of execution.
        </p>
      </div>
      {/* Option 3 */}
      <div className="pt-6">
        <div className="flex flex-row">
          <div className="border border-gray-300 rounded-full w-10 h-10 bg-blue-600"></div>
          <div>
            <h2 className=" pl-2 font-bold text-gray-500">
              Search Result Option 3
            </h2>
            <div className="flex flex-row">
              <a href="#" className="pl-2 text-gray-500">
                Cost Guide AUD 2000-4000
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-2xl text-gray-500">Option 3</h2>
        <p className="w-5/6">
          In computer science, a lock or mutex (from mutual exclusion) is a
          synchronization mechanism for enforcing limits on access to a resource
          in an environment where there are many threads of execution.
        </p>
      </div>
    </div>
  )
}
