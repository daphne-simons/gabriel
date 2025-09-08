'use client'
import Footer from '../Footer'
import Link from 'next/link'
import EnquiryForm from '../EnquiryForm'
import { calculateBgColor } from '../../utils/moon-utils'
import GeneralLogo from '../Logos/GeneralLogo'

export default function EnquiryPage() {
  const theme = calculateBgColor() // Uses current date by default

  return (
    <>
      <div
        className="flex flex-col min-h-screen"
        style={{
          // Apply scroll fixes directly to the container
          overscrollBehavior: 'none',
          touchAction: 'pan-y pinch-zoom', // Allow pinch zoom but restrict other gestures
          WebkitOverflowScrolling: 'touch',
          // Additional iOS Safari fixes
          position: 'relative',
          overflow: 'visible', // Ensure content isn't clipped
          minHeight: '100vh', // Use viewport height instead of screen
          height: 'auto'
        }}
      >
        {/* Enquiry Header */}
        <ul className="w-full flex max-md:justify-between gap-4 p-6 text-sm">
          <Link href="/" className="pl-2">
            <GeneralLogo logoColor={theme.logoColor} />
          </Link>
          <Link href="/about" className="px-8 p-2">
            <li className="pb-2 text-sm border-[#ffffff] hover:border-[#8AB4F7] border-b-2">About</li>
          </Link>
        </ul>

        {/* Enquiry page content / form */}
        <main className="pt-10 pb-24 px-20 max-md:px-4">
          <div className="flex justify-start max-md:px-8 md:px-[8%] lg:px-[8%] xl:px-[8%]">
            <EnquiryForm />
          </div>
        </main>

        {/* Footer */}
        <div className="bg-googlelightGrayFooter bottom-0 w-full mt-auto">
          <div className="flex flex-col items-center">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}