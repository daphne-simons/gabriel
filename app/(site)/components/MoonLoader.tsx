import Image from 'next/image'
// Using the moon.css styles
export default function MoonLoader() {
  return (
    <>
      <div className="moon-container">
        <div className="moon-spin"></div>
        <section className="moon-texture"></section>
      </div>
    </>
  )
}
