// pages/api/send/route.ts

import { Resend } from 'resend'
import EnquiryEmail from '../../../../emails/EnquiryEmail'
import { EmailTemplateProps } from '../../models/models'

// EMAIL THAT IS SENT TO ELLA - (To let her know someone has made an Enquiry)
export async function POST(req: Request, res: Response) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const person = (await req.json()) as EmailTemplateProps
    console.log('notify ella email', person)
    // const { firstName, email, chosenService, gem, level, cost } = person
    // Send the email using Resend API
    await resend.emails.send({
      // TODO: This from address will need to change to a verified domain on resend, e.g. 'contact@gabriel.com' or whatever Ella wants to use for the domain.
      from: 'Acme <onboarding@resend.dev>',
      // TODO: this is the receiver address (or addresses, can send 50 max in the array)
      // use this one for testing success of delivery: 'delivered@resend.dev'
      to: ['daphnejasminesimons@gmail.com'],
      bcc: ['delivered@resend.dev'],
      subject: `Enquiry from ${person.name}!`,
      react: EnquiryEmail(person),
      // TODO: put Users email address here. For Ella to 'reply_to'
      reply_to: `${person.email}`,
    })
    return new Response(JSON.stringify(person), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
