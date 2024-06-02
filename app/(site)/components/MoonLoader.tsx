import Image from 'next/image'
// Using the moon.css styles
export default function MoonLoader({ size }: { size: string }) {
  const smallMoon = size === 'smallMoon'
  const medMoon = size === 'bigMoon'
  const small = (
    <div className="h-2 -mt-7">
      <div className="small-moon-container">
        <div className="small-moon-spin"></div>
        <section className="small-moon-texture"></section>
      </div>
    </div>
  )

  const med = (
    // <div className="h-2 -mt-7">
    <div className="med-moon-container">
      <div className="med-moon-spin"></div>
      <section className="med-moon-texture"></section>
    </div>
    // </div>
  )
  return smallMoon ? small : med
}
