// EMAIL THAT IS SENT TO THE USER (PERSON MAKING ENQUIRY)
// pages/api/autoreply/route.ts
import { render } from '@react-email/render'
import { Resend } from 'resend'
import AutoReply from '../../../../emails/AutoReply'
import { EmailTemplateProps } from '../../models/models'
// import { render } from '@react-email/components'

export async function POST(req: Request, res: Response) {
  // TODO: Create rate limit so that users can't spam us.

  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const person = (await req.json()) as EmailTemplateProps

    // Send the email using Resend API
    await resend.emails.send({
      // TODO: This from address will need to change to a verified domain on resend, e.g. 'contact@gabriel.com' or whatever Ella wants to use for the domain.
      from: 'Acme <onboarding@resend.dev>',
      // TODO: this is the receiver address, replace with dynamic person.email OR multiple addresses, can send 50 max in the array)
      // use this one for testing success of delivery: 'delivered@resend.dev'
      to: ['daphnejasminesimons@gmail.com'],
      bcc: ['delivered@resend.dev'],
      subject: `Auto-Reply to ${person.name}!`,
      // react: AutoReply(person),
      html: render(AutoReply(person)),

      // TODO: put Gabriel's email address here. For the user to 'reply_to'
      // reply_to: 'daphnejasminesimons@gmail.com',
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
