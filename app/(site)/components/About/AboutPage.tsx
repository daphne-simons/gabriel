import { AboutPageModel } from '@/sanity/models/sanity-client-models'
import Link from 'next/link'
import AboutEnquireLogo from '../Logos/AboutEnquireLogo'
import { PortableText, PortableTextReactComponents } from 'next-sanity'
import { PortableTextMarkComponentProps } from '@portabletext/react'

import Footer from '../Footer'
import { calculateBgColor } from '../../utils/moon-utils'

// Type for Sanity color mark data
interface ColorMark {
  _type: 'color'
  label: string
  _key: string
  value: string // This is where the hex color is stored
}

export default function AboutPage({ data }: { data: AboutPageModel }) {

  const theme = calculateBgColor() // Uses current date by default

  // Custom components configuration for PortableText
  const components: Partial<PortableTextReactComponents> = {
    marks: {
      color: ({
        children,
        value,
      }: PortableTextMarkComponentProps<ColorMark>) => {
        // Guard against missing value
        if (!value?.value) {
          return <>{children}</>
        }
        return <span style={{ color: value.value }}>{children}</span>
      },
    },
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* About Header */}
        <ul className="w-full flex max-md:justify-between gap-4 p-6 text-sm">
          <Link href="/" className="pl-2">
            <AboutEnquireLogo logoColor={theme.logoColor} />
          </Link>
          <Link href="/about" className="px-8 pt-2">
            <li className="pb-2 text-sm border-b-2 border-[#8AB4F7]">About</li>
          </Link>
        </ul>
        {/* BODY */}
        <main className="pt-10 pb-24 px-20 max-md:px-4 ">
          {/* Gabriel Description */}
          <section className="flex justify-center text-center ">
            <article className="font-roboto text-xl max-md:text-[20px] max-md:w-[80%] md:w-[85%] lg:w-[75%] xl:w-[50%] xl:text-2xl">
              <PortableText value={data.description} components={components} />
            </article>
          </section>
          {/* Blocks/ Buttons of info */}
          <div className="pt-20 max-md:pt-16 flex flex-col items-center">
            <section className="w-5/6 grid grid-cols-2 grid-rows-3 max-md:grid-cols-1 max-md:grid-rows-4 max-md:gap-6 md:gap-4 place-content-evenly">
              <article className="sm:w-full md:w-[90%] font-roboto text-2xl ">
                <h2>Gabriel</h2>
                <div className="py-2 text-base max-md:pb-8 text-googleMidGray ">
                  <PortableText value={data.address} />
                </div>
                {/* SMALL - BUTTON 1 */}
                <button className="w-32 h-10 flex items-center justify-center text-base text-googleBlue border border-2-lightGray hover:text-googleDarkBlue hover:border-googleBlue rounded-md px-6 py-2 md:hidden lg:hidden xl:hidden 2xl:hidden">
                  View Map
                </button>
              </article>
              <article className="sm:w-full md:w-[90%] max-md:pt-8 font-roboto text-2xl ">
                <h2>Contact</h2>
                <div className="pt-2 pb-16 text-base max-md:pb-8  text-googleMidGray">
                  <PortableText value={data.contact} />
                </div>
                {/* SMALL - BUTTON 2 */}
                <a
                  className="w-32 h-10 flex items-center justify-center text-base  text-googleBlue hover:text-googleDarkBlue border border-2-lightGray hover:border-googleBlue rounded-md md:hidden lg:hidden xl:hidden 2xl:hidden"
                  // TODO: change this email address to Ella's official Gabriel Email
                  href="mailto:daphnejasminesimons@gmail.com?subject=General%20Enquiry%20for%20Gabriel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email Us
                </a>
              </article>
              {/* MED -> LARGE Button 1 */}
              <button className="w-32 h-10 flex items-center justify-center text-base text-googleBlue border border-2-lightGray hover:text-googleDarkBlue hover:border-googleBlue rounded-md px-6 py-2 max-md:hidden">
                View Map
              </button>
              {/* MED -> LARGE Button 2 */}
              <a
                className="w-32 h-10 flex items-center justify-center text-base  text-googleBlue hover:text-googleDarkBlue border border-2-lightGray hover:border-googleBlue rounded-md max-md:hidden"
                // TODO: change this email address to Ella's official Gabriel Email
                href="mailto:daphnejasminesimons@gmail.com?subject=General%20Enquiry%20for%20Gabriel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email Us
              </a>
              <article className="sm:w-full md:w-[90%] max-md:flex max-md:flex-col  max-md:justify-center font-roboto text-2xl">
                <h2>Team</h2>
                <div className="pt-2 text-base text-googleMidGray">
                  <PortableText value={data.team} />
                </div>
              </article>
              <article className="sm:w-full md:w-[90%] max-md:flex max-md:flex-col  max-md:justify-start font-roboto text-2xl">
                Consultants
                <div className="pt-2 text-base text-googleMidGray">
                  <PortableText value={data.consultants} />
                </div>
              </article>
            </section>
            {/* Seperate styling to switch between mob and laptops */}
            <div className="flex flex-col items-center">
              <section className="w-5/6 pt-20 max-md:pt-0">
                <article className="w-11/12 text-2xl font-normal font-roboto">
                  Past Clients and Collaborators
                </article>
                <article className="max-md:w-full max-md:text-sm md:text-base pt-5 text-lg font-roboto text-googleMidGray">
                  <PortableText value={data.clients_collaborators} />
                </article>
              </section>
            </div>
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
