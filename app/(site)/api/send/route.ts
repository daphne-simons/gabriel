// import EmailTemplate from '../../components/Email'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// // Shouldn't need this if i'm using the server actions in the contact page :)
// export async function POST() {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: 'daphnejasminesimons@gmail.com',
//       subject: 'Hello Gabriel client',
//       react: EmailTemplate({ firstName: 'Jane' }) as React.ReactElement,
//     })

//     if (error) {
//       return Response.json({ error })
//     }

//     return Response.json({ data })
//   } catch (error) {
//     return Response.json({ error })
//   }
// }
