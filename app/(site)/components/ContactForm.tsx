'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const ContactForm = () => {
  const searchParams = useSearchParams()

  const gem = searchParams.get('gem')
  const level = searchParams.get('level')
  const cost = searchParams.get('cost')

  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'firstName') {
      setFirstName(value)
    } else if (name === 'email') {
      setEmail(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(firstName, email)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, email }),
      })

      if (response.ok) {
        console.log('Email sent successfully!')
      } else {
        console.error('Failed to send email:', await response.text())
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold pb-6">Enquiry</h1>
      <form onSubmit={handleSubmit}>
        <div className="pb-6">
          <div className="flex flex-row gap-4">
            <span>
              <p>Dear Gabriel, My name is</p>
            </span>
            <input
              className="px-2 outline-dotted rounded"
              name="firstName"
              type="text"
              value={firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <span>
              <p>and my email is </p>
            </span>
            <input
              className="px-2 outline-dotted  outline-offset-2 rounded"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <p>
            I am writing to find out more about INSERT DESIGN OFFER HERE, more
            specifically about the {gem} {level} option.
          </p>
        </div>
        <div className="pt-6 gap-8 flex">
          <button
            className="px-2 outline outline-green-400 outline-offset-2 rounded"
            type="submit"
          >
            Send Email
          </button>
          <Link href="/">
            <button className="px-2 outline outline-yellow-400 outline-offset-2 rounded">
              Home
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
