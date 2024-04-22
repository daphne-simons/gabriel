// pages/api/send/route.ts

import { Resend } from 'resend'

export async function POST(req: Request, res: Response) {
  const person = await req.json()
  const resend = new Resend(process.env.RESEND_API_KEY)
  console.log(person)
  try {
    const { firstName, email } = person
    // Send the email using Resend API
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: `Hello ${firstName}!`,
      text: `Welcome, ${firstName}!`,
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
