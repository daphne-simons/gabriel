'use client'
import { Suspense } from 'react'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import AboutEnquireLogo from '../components/Logos/AboutEnquireLogo'
import Link from 'next/link'

const ContactPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Enquiry Header */}
      <div className="flex flex-col ">
        <div id="header" className="flex flex-row relative gap-4 p-2">
          <div className="flex w-full">
            {/* Contact Logo */}
            <div className="pr-8 pl-5 pt-2 flex items-center">
              <Link href="/">
                <AboutEnquireLogo />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Form and Footer */}
      <div className="flex flex-col items-center justify-between px-20">
        <ContactForm />
      </div>
      <div className="bg-lightGrayText px-20">
        <div className="flex flex-col items-center ">
          <Footer />
        </div>
      </div>
    </Suspense>
  )
}

export default ContactPage
