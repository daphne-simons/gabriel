// import EmailTemplate from '../components/Email'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// export default async function Contact() {
//   async function send() {
//     // Server actions to do the server side email sending.
//     'use server'
//     await resend.emails.send({
//       // From needs to be a verified domain email
//       from: 'Acme <onboarding@resend.dev>',
//       // This can be whatever email you want to send to
//       to: 'daphnejasminesimons@gmail.com',
//       subject: 'Hello Gabriel client',
//       react: EmailTemplate({ firstName: 'Jane2' }) as React.ReactElement,
//     })
//   }
//   return (
//     <form action={send}>
//       <button type="submit">Send Email</button>
//     </form>
//   )
// }
