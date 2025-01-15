// pages/api/send/route.ts

// ROLE: Email enquiry info sent to Gabriel from the user

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { UserEmailQuery, UserQuery } from '../../models/users'
import { enquiryProvider } from '../../utils/resend-utils'

// api/send
export async function POST(req: NextRequest) {
  // Triggers rate limiting middleware so that users can't spam.
  try {
    // Parse input request with zod:
    const person = (await req.json()) as UserQuery
    const data = UserEmailQuery.parse(person)

    // Send the email using relevant Resend Provider
    await enquiryProvider(data)
    return NextResponse.json(
      { message: 'Enquiry sent successfully', data },
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
