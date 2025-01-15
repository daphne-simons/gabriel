import { Ratelimit } from '@upstash/ratelimit'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(5, '20 s'), // amount of tokens per time window
  redis: Redis.fromEnv(), // extracts redis info from env
  analytics: true,
})

export async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> {
  console.log('rate-limit middleware')

  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  return success
    ? NextResponse.next()
    : // : NextResponse.redirect(new URL('/blocked', request.url)) // Redirect to '/blocked' page
      NextResponse.json('Too many requests', {
        status: 429,
      }) // gives a 429 error
}

export const config = {
  matcher: ['/api/send', '/api/autoreply'], // protects both routes with middleware
}
