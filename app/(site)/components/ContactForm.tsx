'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const ContactForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const chosenService = searchParams.get('service')
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

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          email,
          chosenService,
          gem,
          level,
          cost,
        }),
      })

      if (response.ok) {
        // TODO / TOTRY: Make another post route that sends an automated reply to the user/ enquirer??
        try {
          await fetch('/api/autoreply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              email,
              chosenService,
              gem,
              level,
              cost,
            }),
          })

          if (response.ok) {
            console.log('Auto-reply email sent successfully!')
          } else {
            console.error(
              'Failed to send auto-reply email:',
              await response.text()
            )
          }
        } catch (error) {
          console.error('Error sending auto-reply email:', error)
        }

        // If successful - Make a page for route '/contact/success' and redirect to it
        router.push('/')
        console.log('Email sent successfully!')
      } else {
        // some kind of page for "failed to send email, please try again later"
        // redirect to the home page.
        console.error('Failed to send enquiry email:', await response.text())
      }
    } catch (error) {
      // some kind of page for "failed to send email, please try again later"
      // redirect to the home page.
      console.error('Error sending enquiry email:', error)
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
            I am writing to find out more about{' '}
            <span className="font-semibold">{chosenService}</span>. <br />
            Specifically about the <span className="font-semibold">
              {gem}
            </span>, <span className="font-semibold">{level}</span> option.{' '}
            <br />
            Looking forward to speaking more soon!
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
