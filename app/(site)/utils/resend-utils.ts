//  Resend related functions

import { Resend } from 'resend'
import EnquiryEmail from '@/emails/EnquiryEmail'
import { UserQuery } from '@/app/(site)/models/users'
import AutoReply from '@/emails/AutoReply'
import MagicLink from '@/emails/MagicLink'
import MagicConfirmation from '@/emails/MagicConfirmation'
import ContributorSubmissionConfirmation from '@/emails/ContributorSubmissionConfirmation'
import GabrielSubmissionConfirmation from '@/emails/GabrielSubmissionConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)
export async function enquiryProvider(person: UserQuery) {
  try {
    await resend.emails.send({
      from: 'more@gabriel.exchange', // this is the dev/ test email address to test sending 'Acme <onboarding@resend.dev>'. 
      to: 'more@gabriel.exchange', // use this email for testing success of delivery: 'delivered@resend.dev', // for multiple addresses, can send 50 max in the array
      bcc: ['delivered@resend.dev'],
      subject: `Gabriel enquiry from ${person.name}!`,
      react: EnquiryEmail(person),
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
      from: 'Gabriel <more@gabriel.exchange>',
      to: person.email, // for multiple addresses, can send 50 max in the array
      bcc: ['delivered@resend.dev'],
      subject: `Gabriel Enquiry`,
      react: AutoReply(person),
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
      to: contributor.email, // for multiple addresses, can send 50 max in the array
      subject: 'Your constellation portal is ready ✨',
      react: MagicLink(contributor, magicLink),
      reply_to: 'more@gabriel.exchange',
    })
  } catch (error) {
    console.error('Error sending Magic Link email:', error)
  }
}

export async function magicLinkConfirmationProvider(magicContributors: { contributor: any; magicLink: string }[]) {

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

export async function submissionConfirmationProvider(submission: any, contributor: any) {
  // Resend logic to send submission confirmation to Gabriel AND to the Submitter
  try {
    await resend.emails.send({
      from: 'Gabriel <more@gabriel.exchange>',
      // Send both the confirmation to Contributor and Gabriel 
      to: contributor.email,
      subject: 'Gabriel received your submission',
      react: ContributorSubmissionConfirmation(submission, contributor),
    })
    await resend.emails.send({
      from: 'Gabriel <more@gabriel.exchange>',
      to: 'more@gabriel.exchange',
      subject: 'Constellation submission confirmation',
      react: GabrielSubmissionConfirmation(submission, contributor),
    })
  } catch (error) {
    console.error('Error sending Magic Link email:', error)
  }
}