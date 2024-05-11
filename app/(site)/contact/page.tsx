'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Props {
  product: {
    service: string[]
    level: string[]
  }
}
const ContactForm = ({ product }: Props) => {
  const { service, level } = product

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
      <form onSubmit={handleSubmit}>
        <div className="flex gap-6">
          <input
            className="px-2 outline-dotted outline-2 outline-offset-2 rounded"
            name="firstName"
            type="text"
            value={firstName}
            onChange={handleChange}
            placeholder="First Name"
          />

          <input
            className="px-2 outline-dotted outline-2 outline-offset-2 rounded "
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
          <button
            className="px-2 outline outline-offset-2 rounded"
            type="submit"
          >
            Send Email
          </button>
        </div>
      </form>
      <div className="pt-6 flex">
        <Link href="/">
          <button className="px-2 outline outline-yellow-400 outline-offset-4 rounded">
            Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ContactForm
