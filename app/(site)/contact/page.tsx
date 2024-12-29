'use client'
import { Suspense } from 'react'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import AboutEnquireLogo from '../components/Logos/AboutEnquireLogo'
import Link from 'next/link'

const ContactPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col min-h-screen">
        {/* Enquiry Header */}
        <div className="flex flex-col">
          <div id="header" className="flex flex-row relative gap-4 p-2">
            <div className="flex ">
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
        <div>
          <main className="flex-1 flex flex-col items-center px-20">
            <ContactForm />
          </main>
          <div className="bg-lightGrayText bottom-0">
            <div className="flex flex-col items-center px-20">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default ContactPage
