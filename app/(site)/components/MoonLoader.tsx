// Using the moon.css styles

import Image from 'next/image'
export default function MoonLoader({ size }: { size: string }) {
  // Size calculations
  const imgSize = size === 'smallMoon' ? 20 : size === 'medMoon' ? 40 : '16em'
  // Path to the moon phase image
  const pngMoonPath = `/moon-imgs/full.png`
  // const pngMoonPath = `/moon-imgs/full-1.png`
  // Use SVG version for all moons
  // const svgMoonPath = `/moon-imgs/full-1.svg`

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
        <div className="big-moon-spin" style={{ zIndex: '2', opacity: "0.5" }}></div>
        <div
          style={{
            display: 'grid',
            position: 'relative',
            width: `${imgSize}`,
            height: `${imgSize}`,
            bottom: `${imgSize}`,
            opacity: '1',
            zIndex: '0',
            borderRadius: '50 %'
          }}>
          <Image
            src={pngMoonPath}
            alt='full-moon'
            fill
            priority
            sizes="100vw"
            quality={100}
          />

        </div>
      </div>
    )
  return null
}
