import Projects from './components/Projects'

export default async function Home() {
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
      </div>
    </>
  )
}
