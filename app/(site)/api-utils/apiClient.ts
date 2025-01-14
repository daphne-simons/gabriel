import { UserQuery } from '../models/users'

export async function fetchSendAPI(data: UserQuery) {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      // Send another post route that sends an automated reply to the user
      try {
        await fetch('/api/autoreply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
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
