'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { fetchSendAPI } from '../api-utils/apiClient'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()
  // url info:
  const chosenCategory = decodeURIComponent(
    searchParams.get('category') || 'a category'
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
      await fetchSendAPI({
        name,
        email,
        chosenCategory,
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
      <div className="pt-14 pb-24 flex flex-col  lg:pb-10">
        <div className="font-roboto text-xl  max-md:w-full md:w-[80%] lg:w-[75%] xl:w-[60%]">
          <h2 className="font-base max-md:text-4xl md:text-5xl lg:text-6xl">
            Hi, how can we help?
          </h2>

          {/* Form */}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-row max-md:flex-col max-md:py-16 pb-6 pt-32 md:pt-24 gap-4">
              <div className="w-1/3 max-md:w-full md:w-[90%] lg:w-[60%]">
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
              <div className="w-1/3 max-lg:w-full lg:w-[70%]">
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
            <p className="md:w-[85%]  pt-4">
              I&apos;d like to learn more about the{' '}
              <span className={`font-semibold ${gemStyle}`}>
                {level.toLowerCase()}
              </span>{' '}
              package, for{' '}
              <span className="font-semibold text-googleGreen">
                {chosenCategory.toLowerCase()}
              </span>
              , could you send me some information?
            </p>

            <div className="flex flex-row pt-16 max-md:pt-16 md:pt-18 lg:pt-20">
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
