import MoonLoader from '../components/MoonLoader'

export default function MoonPage() {
  return (
    <>
      <div className="main-bg">
        <div className=" bg-wrapper">
          <div className="dots-1 dots"></div>
          <div className="dots-2 dots"></div>
          <div className="dots-3 dots"></div>
          <div className="h-screen flex justify-center ">
            <MoonLoader size="medMoon" />
          </div>
        </div>
      </div>

    </>
  )
}
