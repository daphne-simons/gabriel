//  Resend related functions

import { Resend } from 'resend'
import EnquiryEmail from '@/emails/EnquiryEmail'
import { UserQuery } from '@/app/(site)/models/users'
import AutoReply from '@/emails/AutoReply'
import MagicLink from '@/emails/MagicLink'
import MagicConfirmation from '@/emails/MagicConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)
export async function enquiryProvider(person: UserQuery) {
  try {
    await resend.emails.send({
      // TODO: This from address will need to change to a verified domain on resend, e.g. 'contact@gabriel.com' or whatever Ella wants to use for the domain.
      // from: 'Acme <onboarding@resend.dev>',
      from: 'more@gabriel.exchange',
      // TODO: this is the receiver address (or addresses, can send 50 max in the array)
      // use this one for testing success of delivery: 'delivered@resend.dev'
      // to: 'daphnejasminesimons@gmail.com',
      to: 'more@gabriel.exchange',
      bcc: ['delivered@resend.dev'],
      subject: `Gabriel enquiry from ${person.name}!`,
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
      // This `from` address is the official Gabriel email - it has been verified on Resend.
      from: 'Gabriel <more@gabriel.exchange>',
      // This `to` is the receiver address, currently using the dynamic email of the enquirer, but can also use multiple addresses, can send 50 max in the array)
      to: person.email,
      bcc: ['delivered@resend.dev'],
      subject: `Gabriel Enquiry`,
      react: AutoReply(person),

      // This is the `reply_to` address, official Gabriel email. It is verified on Resend.
      reply_to: 'more@gabriel.exchange',
    })
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export async function magicLinkProvider(contributor: any, magicLink: string) {
  try {
    await resend.emails.send({
      from: 'Gabriel <more@gabriel.exchange>',
      to: contributor.email,
      subject: 'Your constellation portal is ready ✨',
      react: MagicLink(contributor, magicLink),
      reply_to: 'more@gabriel.exchange',
    })
  } catch (error) {
    console.error('Error sending Magic Link email:', error)
  }
}

export async function magicLinkConfirmationProvider(magicContributors: {
  contributor: any
  magicLink: string
}[]) {

  try {
    await resend.emails.send({
      from: 'Gabriel <more@gabriel.exchange>',
      to: 'more@gabriel.exchange',
      subject: 'Your Magic Link has been sent',
      react: MagicConfirmation(magicContributors),
    })
  } catch (error) {
    console.error('Error sending Magic Link email:', error)
  }
}

export async function submissionProvider(submission) {
  // TODO: create resend logic to send submission confirmation to Gabriel AND to the Submitter
}