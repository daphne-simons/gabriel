'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { fetchSendAPI } from '../api-utils/apiClient'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const EnquiryForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Ensure client-side rendering for dynamic content
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only access search params on client side to prevent hydration mismatch
  const chosenCategory = isClient
    ? decodeURIComponent(searchParams.get('category') || 'a category')
    : 'a category'

  const gem = isClient
    ? decodeURIComponent(searchParams.get('gem') || 'Sapphire')
    : 'Sapphire'

  const level = isClient
    ? decodeURIComponent(searchParams.get('level') || 'Essential')
    : 'Essential'

  const cost = isClient
    ? decodeURIComponent(searchParams.get('cost') || '2000-4000')
    : '2000-4000'


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
    // Prevent double submissions during sending state
    if (sending) return
    try {
      setSending(true)
      await fetchSendAPI({
        name,
        email,
        chosenCategory,
        gem,
        level,
        cost,
      })
      //  Successful:
      // TODO: Redirect to '/contact/success'
      console.log('Email sent successfully!')
      router.push('/')
    } catch (error) {
      // Failed:
      // TODO: redirect to '/error-page'
      setSending(false)
      router.push('/')
      console.log(error)
    }
  }

  let gemStyle = ''
  if (gem === 'Sapphire') gemStyle = 'text-googleBlue'
  else if (gem === 'Emerald') gemStyle = 'text-googleGreen'
  else if (gem === 'Ruby') gemStyle = 'text-googleRed'

  return (
    <div className="flex flex-col md:w-[90%] lg:w-[80%] xl:w-[68%] mb-auto"
      style={{
        // Ensure form doesn't interfere with parent scroll behavior
        touchAction: 'manipulation'
      }}>
      {/* Enquiry form */}
      <h2 className="font-base max-md:text-4xl md:text-[40px] lg:text-[56px]">
        Hi, how can we help?
      </h2>
      {/* Form */}
      <form className="" onSubmit={handleSubmit}>
        {/* inputs div */}
        <div className="text-sm lg:text-base xl:text-base flex flex-row max-md:flex-col max-md:pt-16 max-md:pb-8 pb-6 pt-32 md:pt-20 gap-4 w-full">
          <input
            aria-label="name"
            className="p-2 outline outline-googleLightGray rounded max-md:w-full md:w-[70%] lg:w-[70%] xl:w-full"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="My name is"
            required
            disabled={sending}
          />
          <input
            aria-label="email"
            className="p-2 outline outline-googleLightGray rounded text-sm max-lg:w-full md:w-[80%] lg:w-[80%] xl:w-full"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="My email address is"
            required
            disabled={sending}
          />
        </div>
        <p className="pt-4 max-md:text-base md:text-lg lg:text-xl xl:text-xl ">
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

        <div className="flex flex-row ">
          {!sending ? (
            <div className="pt-16 max-md:pt-12 md:pt-16 lg:pt-20">
              <button
                className="px-12 py-3 bg-googleBlue hover:bg-googleHoverBlue rounded text-white text-base"
                type="submit"
              >
                Send
              </button>
            </div>
          ) : (
            <div className="pt-10 pl-6">
              <DotLottieReact
                src="https://lottie.host/73583bcb-fac6-4aa1-913f-9518c765befe/fwBf8JZpdp.lottie"
                loop
                autoplay
                style={{
                  width: '85px',
                  height: '85px',
                  justifyContent: 'center',
                }}
              />
            </div>
          )}
        </div>
      </form>
    </div >
  )
}

export default EnquiryForm
