// Module for email logical functions

import { UserEmailQuery } from '@/types/users'

interface UserQuery {
  name: string
  email: string
  chosenService: string
  gem: string
  level: string
  cost: string
}
export async function sendEmailEnquiry(data: UserQuery) {
  // Parse details with zod
  const result = UserEmailQuery.safeParse(data)
  if (!result.success) {
    // If zod parse fails, handle error then return
    result.error
  } else {
    // If zod parse is successful:
    const { name, email, chosenService, gem, level, cost } = result.data
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          chosenService,
          gem,
          level,
          cost,
        }),
      })

      if (response.ok) {
        // If response goes well, send another post route that sends an automated reply to the user
        try {
          await fetch('/api/autoreply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              chosenService,
              gem,
              level,
              cost,
            }),
          })

          if (response.ok) {
            console.log('Auto-reply email sent successfully!')
          } else {
            console.error(
              'Failed to send auto-reply email:',
              await response.text()
            )
          }
        } catch (error) {
          console.error('Error sending auto-reply email:', error)
        }
      } else {
        console.error('Failed to send enquiry email:', await response.text())
      }
    } catch (error) {
      console.error('Error sending enquiry email:', error)
    }
  }
}
