import { Suspense } from 'react'
import ContactForm from '../components/ContactForm'

const ContactPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactForm />
    </Suspense>
  )
}

export default ContactPage
