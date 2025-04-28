import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'
import { ImageResponse } from 'next/og'
import Image from 'next/image'
import firstQuarterMoon from '../public/moon-imgs/first-q.png'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

//  Moon phase data 
const phases = [
  {
    name: 'New Moon',
    img: 'new',
  },
  {
    name: 'Waxing',
    img: 'waxing',
  },
  {
    name: 'First Quarter',
    img: 'first-q',
  },
  {
    name: 'Waxing Gibbous',
    img: 'waxing-g',
  },
  {
    name: 'Full Moon',
    img: 'full',
  },
  {
    name: 'Waning Gibbous',
    img: 'waning-g',
  },
  {
    name: 'Last Quarter',
    img: 'last-q',
  },
  {
    name: 'Wanning',
    img: 'waning',
  },
]
// Image generation
export default function Icon() {
  // const {
  //   data: moonData,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ['moon'],
  //   queryFn: () => getMoon(),
  // })
  // if (moonData) {
  //   const moonPhases = moonData.phase
  //   // removes duplicate names
  //   const phaseNamesSet = new Set()
  //   for (let key in moonPhases) {
  //     if (moonPhases.hasOwnProperty(key)) {
  //       phaseNamesSet.add(moonPhases[key].phaseName)
  //     }
  //   }

  const getMoonImgByLighting = (lighting: number) => {
    if (lighting >= 0 && lighting <= 5) {
      return {
        img: phases[0].img,
        phase: phases[0].name,
      }
    } else if (lighting >= 6 && lighting <= 42) {
      return {
        img: phases[1].img,
        phase: phases[1].name,
      }
    } else if (lighting >= 43 && lighting <= 60) {
      return {
        img: phases[2].img,
        phase: phases[2].name,
      }
    } else if (lighting >= 61 && lighting <= 95) {
      return {
        img: phases[3].img,
        phase: phases[3].name,
      }
    } else if (lighting >= 96 && lighting <= 105) {
      return {
        img: phases[4].img,
        phase: phases[4].name,
      }
    } else if (lighting <= 97 && lighting >= 66) {
      return {
        img: phases[5].img,
        phase: phases[5].name,
      }
    } else if (lighting <= 65 && lighting >= 44) {
      return {
        img: phases[6].img,
        phase: phases[6].name,
      }
    } else if (lighting <= 43 && lighting >= 5) {
      return {
        img: phases[7].img,
        phase: phases[7].name,
      }
    }
  }

  // const moonLighting = Number(
  //   moonData.phase[new Date().getDate()].lighting.toFixed(0)
  // )

  // console.log('moon lightning number', moonLighting);

  const phase = getMoonImgByLighting(50)
  const phaseImagePath = `../public/moon-imgs/${phase?.img}.png`

  if (phase) {
    return new ImageResponse(
      (
        // ImageResponse JSX element
        //  NORMAL HTML DIV
        // <div
        //   style={{
        //     fontSize: 24,
        //     background: 'black',
        //     width: '100%',
        //     height: '100%',
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     color: 'white',
        //   }}
        // > G
        // </div >
        // NEXT Image COMPONENT
        // <img
        //   // src={phaseImagePath}
        //   src={firstQuarterMoon.src}
        //   alt={phase.phase}
        //   width={30}
        //   height={30}
        // // className="rounded-full filter drop-shadow-[0_0_5px_#fefee0]"
        // />
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {/* SVG content based on moon phase */}
          {/* {phase?.img === 'full' && ( */}
          <circle cx="16" cy="16" r="14" fill="#FEFEE0" />
          {/* )}
          {phase?.img === 'first-q' && ( */}
          {/* <> */}
          <circle cx="16" cy="16" r="14" fill="#000000" stroke="#FEFEE0" strokeWidth="1" />
          <path d="M16,2 A14,14 0 0 1 16,30 A14,14 0 0 0 16,2" fill="#FEFEE0" />
          {/* </> */}
          {/* )} */}
          {/* Add similar SVG paths for other moon phases */}
        </svg>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported icons size metadata
        // config to also set the ImageResponse's width and height.
        // ...size,
      }
    )
  }
}
