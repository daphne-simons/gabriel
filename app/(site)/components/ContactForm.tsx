'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { sendEmailEnquiry } from '../utils/emailProvider'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()
  // url info:
  const chosenService = decodeURIComponent(
    searchParams.get('service') || 'a service'
  )
  const gem = decodeURIComponent(searchParams.get('gem') || 'Sapphire')
  const level = decodeURIComponent(searchParams.get('level') || 'Essential')
  const cost = decodeURIComponent(searchParams.get('cost') || '2000-4000')

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
      await sendEmailEnquiry({
        name,
        email,
        chosenService,
        gem,
        level,
        cost,
      })
      //  If successful:
      // TODO: Redirect to '/contact/success'
      router.push('/')
      console.log('Email sent successfully!')
    } catch (error) {
      // If failed:
      // TODO: redirect to '/error-page'
      router.push('/')
      console.log(error)
    }
  }

  let gemStyle = ''
  if (gem === 'Sapphire') gemStyle = 'text-googleBlue'
  else if (gem === 'Emerald') gemStyle = 'text-googleGreen'
  else if (gem === 'Ruby') gemStyle = 'text-googleRed'

  return (
    <div className="w-full mb-auto">
      {/* Enquiry form */}
      <div className="pt-10 pb-24 flex flex-col">
        <div className="font-roboto text-xl w-2/3">
          <h2 className="text-6xl font-base">Hi, how can we help?</h2>

          {/* Form */}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-row pb-6 pt-32">
              <div className="pr-4 w-1/3">
                <input
                  aria-label="name"
                  className="p-2 outline outline-googleLightGray rounded text-sm w-full"
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
                  className="p-2 outline outline-googleLightGray rounded text-sm w-full"
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
              <span className={`font-semibold ${gemStyle}`}>
                {level.toLowerCase()}
              </span>{' '}
              package, for{' '}
              <span className="font-semibold text-googleGreen">
                {chosenService}
              </span>
              , <br />
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
