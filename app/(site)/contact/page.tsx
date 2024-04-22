'use client'

import { useState } from 'react'

const ContactForm = () => {
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
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        type="text"
        value={firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="email"
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Send Email</button>
    </form>
  )
}

export default ContactForm
