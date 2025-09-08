import { AboutPageModel } from '@/sanity/models/sanity-client-models'
import Link from 'next/link'
import { PortableText, PortableTextReactComponents } from 'next-sanity'
import { PortableTextMarkComponentProps } from '@portabletext/react'

import Footer from '../Footer'
import { calculateBgColor } from '../../utils/moon-utils'
import GeneralLogo from '../Logos/GeneralLogo'

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
            <GeneralLogo logoColor={theme.logoColor} />
          </Link>
          <Link href="/about" className="px-8 pt-2">
            <li className="pb-2 text-sm border-b-2 border-[#8AB4F7]">About</li>
          </Link>
        </ul>
        {/* BODY */}
        <main className="pt-10 pb-24 px-20 max-md:px-4 ">
          {/* DESCRIPTION */}
          <section className="flex justify-center text-center ">
            <article className="font-roboto text-xl max-md:text-[20px] max-md:w-[80%] md:w-[85%] lg:w-[75%] xl:w-[50%] xl:text-2xl">
              <PortableText value={data.description} components={components} />
            </article>
          </section>
          {/* BLOCKS OF INFO*/}
          <div className="pt-20 max-md:pt-16 flex flex-col items-center">
            <section className="w-5/6 grid grid-cols-2 grid-rows-2 gap-16 max-md:grid-cols-1 max-md:grid-rows-4 max-md:gap-0 place-content-evenly">

              {/* ADDRESS */}
              <article className="sm:w-full md:w-[90%] max-md:pt-4 max-md:pb-0 font-roboto text-2xl ">
                <h2>Gabriel</h2>
                <div className="py-2 text-base max-md:pb-4 pb-10 text-googleMidGray ">
                  <PortableText value={data.address} />
                </div>
                <Link href="https://maps.app.goo.gl/2rd1gz6KkYwJTWgN9" target="_blank" rel="noopener noreferrer">
                  <button className="w-32 h-10 flex items-center justify-center text-base text-googleBlue border border-2-lightGray hover:text-googleDarkBlue hover:border-googleBlue rounded-md px-6 py-2 ">
                    View Map
                  </button>
                </Link>
              </article>
              {/* CONTACT */}
              <article className="sm:w-full md:w-[90%] max-md:pt-10 font-roboto text-2xl ">
                <h2>Contact</h2>
                <div className="pt-2 pb-16 max-md:pb-4 text-base text-googleMidGray">
                  <PortableText value={data.contact} />
                </div>
                <Link
                  className="w-32 h-10 flex items-center justify-center text-base  text-googleBlue hover:text-googleDarkBlue border border-2-lightGray hover:border-googleBlue rounded-md "
                  href="mailto:more@gabriel.exchange?subject=General%20Enquiry%20for%20Gabriel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email Us
                </Link>
              </article>

              {/* TEAM & CONSULTANTS*/}
              <article className="sm:w-full md:w-[90%] max-md:flex max-md:flex-col max-md:pt-6 max-md:justify-center font-roboto text-2xl">
                <h2>Team</h2>
                <div className="pt-2 text-base text-googleMidGray">
                  <PortableText value={data.team} />
                </div>
              </article>
              <article className="sm:w-full md:w-[90%] max-md:flex max-md:flex-col max-md:pt-6 max-md:justify-start font-roboto text-2xl">
                Consultants
                <div className="pt-2 text-base text-googleMidGray">
                  <PortableText value={data.consultants} />
                </div>
              </article>
            </section>
            {/* CLIENTS/ COLLABORATORS */}
            <div className="flex flex-col items-center">
              <section className="w-5/6 pt-14 max-md:pt-6">
                <article className="w-11/12 text-2xl font-normal font-roboto">
                  Past Clients and Collaborators
                </article>
                <article className="pt-5 font-roboto  text-lg max-md:w-full max-md:text-base text-googleMidGray">
                  <PortableText value={data.clients_collaborators} />
                </article>
              </section>
            </div>
          </div>
        </main >
        {/* Footer */}
        < div className="bg-googlelightGrayFooter bottom-0 w-full mt-auto" >
          <div className="flex flex-col items-center">
            <Footer />
          </div>
        </div >
      </div >
    </>
  )
}