// pages/api/send/route.ts

import { Resend } from 'resend'
import EmailTemplate from '../../emails/Email'

export async function POST(req: Request, res: Response) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const person = await req.json()
    console.log(person)
    // const { firstName, email, chosenService, gem, level, cost } = person
    // Send the email using Resend API
    await resend.emails.send({
      // TODO: This from address will need to change to a verified domain on resend, e.g. 'contact@gabriel.com' or whatever Ella wants to use for the domain.
      from: 'Acme <onboarding@resend.dev>',
      // TODO: this is the receiver address: (use this one for testing success of delivery: 'delivered@resend.dev', )
      to: ['daphnejasminesimons@gmail.com'],
      subject: `Enquiry from ${person.firstName}!`,
      // For sending a simple string of text:
      // text: `Hi Gabriel! My name is: ${firstName}, and I would love to know more about your services. My email address is: ${email}.
      // Specifically; I am interested in the service: ${chosenService}, gem: ${gem}, level: ${level}, and cost: ${cost}. Thank you!`,
      // TODO: Create an email Component, and call like a function, props are params:
      react: EmailTemplate({ person }),
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
