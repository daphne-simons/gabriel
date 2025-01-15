// pages/api/autoreply/route.ts

// ROLE: Email that is sent to the user from Gabriel

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { UserEmailQuery, UserQuery } from '../../models/users'
import { autoReplyProvider } from '../../utils/resend-utils'

export async function POST(req: NextRequest) {
  // Triggers rate limiting middleware so that users can't spam.
  try {
    const person = (await req.json()) as UserQuery
    // Parse input request with zod:
    const data = UserEmailQuery.parse(person)

    // Send the email using relevant Resend Provider
    await autoReplyProvider(data)
    return NextResponse.json(
      { message: 'Auto-reply sent successfully', data },
      { status: 200 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }
    // Handle other errors
    return NextResponse.json(
      { message: 'Something went wrong', error: error.message },
      { status: 500 }
    )
  }
}
