'use client'
import EmailTemplate from '../components/Email'
import { Resend } from 'resend'

console.log(process.env.NEXT_PUBLIC_RESEND_API_KEY)

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export default function Contact() {
  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // Prevent the default form submission
    // Server actions to do the server side email sending.

    await resend.emails.send({
      // From needs to be a verified domain email
      from: 'Acme <onboarding@resend.dev>',
      // This can be whatever email you want to send to
      to: 'daphnejasminesimons@gmail.com',
      subject: 'Hello Gabriel client',
      react: EmailTemplate({ firstName: 'Jane2' }),
    })
  }

  return (
    <form onSubmit={send}>
      <button type="submit">Send Email</button>
    </form>
  )
}
