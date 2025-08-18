'use client'

import Link from 'next/link'
import Image from 'next/image'

interface MoonWidgetProps {
  size: string;
  phase: { name: string, img: string }
}

export default function MoonWidget({ size, phase }: MoonWidgetProps) {

  const { name, img } = phase
  // Size calculations
  const imgSize: number = (size === 'small' || size === 'smallMoon') ? 30 :
    size === 'medMoon' ? 50 :
      80 // default/large size


  return (
    <div>
      <Link
        href="/moon"
        className="sm:pt-2 md:pt-0 lg:pt-0 xl:pt-0 max-lg:gap-3 gap-6 flex flex-row items-center justify-center"
        aria-label={`Current moon phase: ${name}`}
      >
        <h2 className="text-center">{name}</h2>
        {/*moon container */}
        <div
          className="small-moon-widget relative"
          style={{
            width: `${imgSize}px`,
            height: `${imgSize}px`,
          }}
        >
          <Image
            src={img}
            alt={name}
            fill
            priority
          />
        </div>
      </Link>
    </div>
  )
}