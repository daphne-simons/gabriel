// Using the moon.css styles
export default function MoonLoader({ size }: { size: string }) {
  if (size === 'smallMoon')
    return (
      <div className="h-2 -mt-5">
        <div className="small-moon-container">
          <div className="small-moon-spin"></div>
          <section className="small-moon-texture"></section>
        </div>
      </div>
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
