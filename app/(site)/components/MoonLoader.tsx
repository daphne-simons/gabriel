// Using the moon.css styles
export default function MoonLoader({ size }: { size: string }) {
  if (size === 'smallMoon')
    return (
      <>
        <div className="max-lg:gap-3 gap-6 flex flex-row items-center justify-center">
          <h2 className="w-[90px] max-md:w-[80px] max-md:-mt-[28px] text-center text-googleMidGray">

          </h2>
          <div className="mt-[28px] mr-[1px] max-md:mt-[1.5px] max-md:mr-[1px]">
            <div className="small-moon-container">
              <div className="small-moon-spin"></div>
              <section className="small-moon-texture"></section>
            </div>
          </div>
        </div>
      </>
    )
  if (size === 'medMoon')
    return (
      <div className="med-moon-container">
        <div className="med-moon-spin"></div>
        <section className="med-moon-texture"></section>
      </div>
    )

  if (size === 'bigMoon')
    return (
      <div className="big-moon-container">
        <div className="big-moon-spin"></div>
        <section className="big-moon-texture"></section>
      </div>
    )

  return null
}
