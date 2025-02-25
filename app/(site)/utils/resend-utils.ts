//  Resend related functions

import { Resend } from 'resend'
import EnquiryEmail from '@/emails/EnquiryEmail'
import { UserQuery } from '@/app/(site)/models/users'
import AutoReply from '@/emails/AutoReply'

const resend = new Resend(process.env.RESEND_API_KEY)
export async function enquiryProvider(person: UserQuery) {
  try {
    await resend.emails.send({
      // TODO: This from address will need to change to a verified domain on resend, e.g. 'contact@gabriel.com' or whatever Ella wants to use for the domain.
      from: 'Acme <onboarding@resend.dev>',
      // TODO: this is the receiver address (or addresses, can send 50 max in the array)
      // use this one for testing success of delivery: 'delivered@resend.dev'
      to: ['daphnejasminesimons@gmail.com', 'ellasutherland@me.com'],
      bcc: ['delivered@resend.dev'],
      subject: `Enquiry from ${person.name}!`,
      react: EnquiryEmail(person),
      // TODO: put Users email address here. For Ella to 'reply_to'
      reply_to: `${person.email}`,
    })
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export async function autoReplyProvider(person: UserQuery) {
  try {
    // Send the email using Resend API
    await resend.emails.send({
      // TODO: This from address will need to change to a verified domain on resend, e.g. 'contact@gabriel.com' or whatever Ella wants to use for the domain.
      from: 'Acme <onboarding@resend.dev>',
      // TODO: this is the receiver address, replace with dynamic person.email OR multiple addresses, can send 50 max in the array)
      // use this one for testing success of delivery: 'delivered@resend.dev'
      to: ['daphnejasminesimons@gmail.com', 'ellasutherland@me.com'],
      bcc: ['delivered@resend.dev'],
      subject: `Auto-Reply to ${person.name}!`,
      react: AutoReply(person),

      // TODO: put Gabriel's email address here. For the user to 'reply_to'
      // reply_to: 'emailforgabriel',
    })
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
