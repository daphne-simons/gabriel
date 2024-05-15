// pages/api/send/route.ts

import { Resend } from 'resend'

export async function POST(req: Request, res: Response) {
  const person = await req.json()
  const resend = new Resend(process.env.RESEND_API_KEY)
  console.log(person)
  try {
    const { firstName, email, chosenService, gem, level, cost } = person
    // Send the email using Resend API
    await resend.emails.send({
      // TODO: This from stuff will need to change to make it come from 'contact@gabriel.com' or whatever Ella wants to use for the domain.
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: `Hello ${firstName}!`,
      text: `Hi Gabriel! My name is: ${firstName}, and I would love to know more about your services. Specifically; the service: ${chosenService}, gem: ${gem}, level: ${level}, and cost: ${cost}. Thank you!`,
      // TODO: Make this nice component:
      // react: <EmailComponent />,
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
