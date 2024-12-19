'use client'
import { Suspense } from 'react'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

const ContactPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col h-screen justify-between">
        <ContactForm />
        <Footer />
      </div>
    </Suspense>
  )
}

export default ContactPage
