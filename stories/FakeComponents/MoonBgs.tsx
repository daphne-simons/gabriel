import Image from 'next/image'
export function NewMoonBg({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`h-screen w-full bg-skin-newMoon fill-current text-skin-newMoon outline outline-outline-skin-newMoon outline-1`}
      >
        <div className={`bg-cover bg-moon-bg`}>{children}</div>
      </div>
    </>
  )
}

export function WaxingBg({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`h-screen w-full bg-skin-waxing fill-current text-skin-waxing outline outline-outline-skin-waxing outline-1`}
      >
        <div className={`bg-cover bg-moon-bg-80`}>{children}</div>
      </div>
    </>
  )
}

export function FirstQuarterBg({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`h-screen w-full bg-skin-firstQuarter fill-current text-skin-firstQuarter outline outline-outline-skin-firstQuarter outline-1`}
      >
        <div className={`bg-cover bg-moon-bg-60`}>{children}</div>
      </div>
    </>
  )
}

export function WaxingGibbousBg({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`h-screen w-full bg-skin-waxingGibbous fill-current text-skin-waxingGibbous outline outline-outline-skin-waxingGibbous outline-1`}
      >
        <div className={`bg-cover bg-moon-bg-60`}>{children}</div>
      </div>
    </>
  )
}

export function FullMoonBg({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`h-screen w-full bg-skin-fullMoon fill-current text-skin-fullMoon outline outline-outline-skin-fullMoon outline-1`}
      >
        <div className={`bg-cover bg-moon-bg-60`}>{children}</div>
      </div>
    </>
  )
}

export function WaningGibbousBg({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`h-screen w-full bg-skin-waningGibbous fill-current text-skin-waningGibbous outline outline-outline-skin-waningGibbous outline-1`}
      >
        <div className={`bg-cover bg-moon-bg-60`}>{children}</div>
      </div>
    </>
  )
}
export function LastQuarterBg({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`h-screen w-full bg-skin-lastQuarter fill-current text-skin-lastQuarter outline outline-outline-skin-lastQuarter outline-1`}
      >
        <div className={`bg-cover bg-moon-bg-60`}>{children}</div>
      </div>
    </>
  )
}

export function WaningBg({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`h-screen w-full bg-skin-waning fill-current text-skin-waning outline outline-outline-skin-waning outline-1`}
      >
        <div className={`bg-cover bg-moon-bg-80`}>{children}</div>
      </div>
    </>
  )
}
