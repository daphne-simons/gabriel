// Using the moon.css styles
export default function MoonLoader({ size }: { size: string }) {
  const smallMoon = size === 'smallMoon'
  const medMoon = size === 'medMoon'
  const bigMoon = size === 'bigMoon'

  const small = (
    <div className="h-2 -mt-7">
      <div className="small-moon-container">
        <div className="small-moon-spin"></div>
        <section className="small-moon-texture"></section>
      </div>
    </div>
  )

  const med = (
    <div className="med-moon-container">
      <div className="med-moon-spin"></div>
      <section className="med-moon-texture"></section>
    </div>
  )

  const big = (
    <div className="big-moon-container">
      <div className="big-moon-spin"></div>
      <section className="big-moon-texture"></section>
    </div>
  )

  if (smallMoon) {
    return small
  }

  if (medMoon) {
    return med
  }

  if (bigMoon) {
    return big
  }

  return medMoon
}
