'use client'
import { Suspense } from 'react'
import EnquiryForm from '../components/EnquiryForm'
import Footer from '../components/Footer'
import AboutEnquireLogo from '../components/Logos/AboutEnquireLogo'
import Link from 'next/link'

const EnquiryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Enquiry Header */}
      <div id="header" className="flex flex-row relative gap-4 p-2">
        {/* Contact Logo */}
        <div className="px-6 flex items-center">
          <ul className="w-full flex max-md:justify-between gap-4 p-2 pt-2 px-5 text-sm">
            <Link href="/">
              <AboutEnquireLogo />
            </Link>
            <Link href="/about" className="px-8 py-6 ">
              <li className="pb-2 text-sm border-[#ffffff] hover:border-[#8AB4F7] border-b-2">About</li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Enquiry page content / form */}
      <div className="flex flex-col items-start w-full mx-auto max-md:px-10 md:pl-28 md:pb-6 lg:pl-30 lg:pb-20">
        <EnquiryForm />
      </div>
      {/* Footer */}
      <div className=" bg-googlelightGrayFooter bottom-0 w-full ">
        <div className="flex flex-col items-start md:pl-10 lg:pl-12">
          <Footer />
        </div>
      </div>
    </Suspense>
  )
}

export default EnquiryPage
