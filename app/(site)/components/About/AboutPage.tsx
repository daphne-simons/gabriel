import { AboutPageModel } from '@/sanity/models/sanity-client-models'
import Link from 'next/link'
import AboutEnquireLogo from '../Logos/AboutEnquireLogo'
import { PortableText, PortableTextReactComponents } from 'next-sanity'
import { PortableTextMarkComponentProps } from '@portabletext/react'

import Footer from '../Footer'

// Type for Sanity color mark data
interface ColorMark {
  _type: 'color'
  label: string
  _key: string
  value: string // This is where the hex color is stored
}

export default function AboutPage({ data }: { data: AboutPageModel }) {
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
      <div className="flex flex-row relative gap-4 p-2">
        <ul className="flex justify-between pt-2 px-5 text-sm">
          <Link href="/">
            <AboutEnquireLogo />
          </Link>
          <Link href="/about" className="flex self-center px-8 py-6 ">
            <li className=" pb-2 text-sm border-b-2 border-[#8AB4F7]">About</li>
          </Link>
        </ul>
      </div>
      <main className="pt-10 pb-24 px-20">
        {/* Description */}
        <section className="flex justify-center text-center ">
          <article className="font-roboto text-xl w-2/3 ">
            <PortableText value={data.description} components={components} />
          </article>
        </section>
        <div className="pt-20 flex flex-col items-center">
          <section className="w-5/6 grid grid-cols-2 gap-20 place-content-evenly">
            <article className="font-roboto text-2xl w-2/3">
              <h2>Gabriel</h2>
              <div className="py-2 text-base text-googleMidGray pb-10 ">
                <PortableText value={data.address} />
              </div>
              <button className="text-base text-googleBlue border border-2-lightGray hover:text-googleDarkBlue hover:border-googleBlue rounded-md px-6 py-2">
                View Map
              </button>
            </article>

            <article className="font-roboto text-2xl w-2/3">
              <h2>Contact</h2>
              <div className="pt-2 pb-16 text-base text-googleMidGray">
                <PortableText value={data.contact} />
              </div>
              <a
                className="text-base text-googleBlue hover:text-googleDarkBlue border border-2-lightGray hover:border-googleBlue rounded-md px-7 py-[10px]"
                // TODO: change this email address to Ella's official Gabriel Email
                href="mailto:daphnejasminesimons@gmail.com?subject=General%20Enquiry%20for%20Gabriel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email Us
              </a>
            </article>

            <article className="font-roboto text-2xl w-2/3">
              <h2>Team</h2>
              <div className="pt-2 text-base text-googleMidGray">
                <PortableText value={data.team} />
              </div>
            </article>

            <article className="font-roboto text-2xl w-2/3">
              Consultants
              <div className="pt-2 text-base text-googleMidGray">
                <PortableText value={data.consultants} />
              </div>
            </article>
          </section>
          <section className="w-5/6 pt-20">
            <article className="w-11/12 text-2xl font-normal font-roboto">
              Past Clients and Collaborators
            </article>
            <article className="w-11/12 pt-5 text-lg font-roboto text-googleMidGray">
              <PortableText value={data.clients_collaborators} />
            </article>
          </section>
        </div>
      </main>
      {/* Footer */}
      <div className="bg-googlelightGrayFooter bottom-0 w-full">
        <div className="flex flex-col items-center px-20">
          <Footer />
        </div>
      </div>
    </>
  )
}
