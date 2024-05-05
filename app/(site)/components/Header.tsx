import { PT_Serif } from 'next/font/google'

const serif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

interface Props {
  color: string
  size: string
  weight: 'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'black'
}
export default function Header(props: Props) {
  const { color, size, weight } = props

  const fontWeightClasses = {
    thin: 'font-thin',
    light: 'font-light',
    regular: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
    black: 'font-black',
  }
  const spanStyle = `absolute mx-auto py-4 flex border blur-lg ${color} bg-clip-text ${size} box-content text-transparent text-center select-none ${fontWeightClasses[weight]}`
  const h1Style = `relative top-0 py-4 justify-center flex items-center ${color} bg-clip-text ${size} text-transparent text-center select-auto ${fontWeightClasses[weight]}`
  return (
    <h1 className="font-gramercy">
      <div className="">
        <span className={spanStyle}>Gabriel</span>
        <h1 className={h1Style}>Gabriel</h1>
      </div>
    </h1>
  )
}
