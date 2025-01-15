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
      <div id="header" className="flex flex-row relative gap-4 p-2">
        {/* Contact Logo */}
        <div className="pr-8 pl-5 pt-2 flex items-center">
          <Link href="/">
            <AboutEnquireLogo />
          </Link>
        </div>
      </div>
      {/* Enquiry page content / form */}
      <div className="flex flex-col items-start pl-36 pb-24 w-full mx-auto">
        <ContactForm />
      </div>
      {/* Footer */}
      <div className="pl-36 bg-googlelightGrayFooter bottom-0 w-full">
        <div className="flex flex-col items-start">
          <Footer />
        </div>
      </div>
    </Suspense>
  )
}

export default ContactPage
