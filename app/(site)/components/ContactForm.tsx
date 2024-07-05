'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AboutLogo from './Logos/AboutLogo'

const ContactForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const chosenService = searchParams.get('service')
  const gem = searchParams.get('gem')
  const level = searchParams.get('level')
  const cost = searchParams.get('cost')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const changedService = chosenService.split(' ')
  if (changedService.length > 1) {
    changedService.shift()
  }
  // const service = changedService.join(' ')
  console.log(changedService)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'name') {
      setName(value)
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
          name,
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
              name,
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
    <div className="h-screen w-full">
      {/* Header */}
      <div className="h-auto flex flex-col ">
        <div id="header" className="flex flex-row relative gap-4 p-2">
          {/* Wrapper logo and search bar */}
          <div className="flex w-full">
            {/* Logo */}
            <div className="pr-8 pl-5 pt-2 flex items-center">
              <Link href="/">
                <AboutLogo />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Enquiry form */}
      <div className="pt-10 pl-40 flex ">
        <div className="font-roboto text-xl w-2/3">
          <h1 className="text-6xl font-base">Hi, how can we help?</h1>

          {/* Form */}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-row pb-6 pt-32">
              <div className="pr-4 w-1/3">
                <input
                  aria-label="name"
                  className="p-2 outline outline-googleLightGray rounded text-sm w-[100%]"
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  placeholder="My name is"
                />
              </div>
              <div className="pl-4 w-1/3">
                <input
                  aria-label="email"
                  className="p-2 outline outline-googleLightGray rounded text-sm w-[100%]"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="My email address is"
                />
              </div>
            </div>
            <p>
              I&apos;d like to learn more about the{' '}
              <span
                className={`font-semibold ${gem === 'Sapphire' ? 'text-googleBlue' : gem === 'Emerald' ? 'text-googleGreen' : gem === 'Ruby' ? 'text-googleRed' : ''}`}
              >
                {level?.toLowerCase()}
              </span>{' '}
              <span
                className="font-semibold text-googleGreen
            "
              >
                {changedService}{' '}
              </span>
              package, <br />
              could you send me some information?
            </p>

            <div className="flex flex-row pt-20">
              <div className="">
                <button
                  className="px-12 py-3 bg-googleBlue rounded text-white text-sm"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
