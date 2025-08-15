// TODO: api route to validate token / magicLink

// app/api/validate-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/config/client-config';
import { contributorByTokenQuery } from '@/sanity/sanity-utils';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { ContributorModel } from '@/sanity/models/sanity-client-models';

// Create a rate limiter for token validation
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
  analytics: true,
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip ?? '127.0.0.1';
    const { success, limit, remaining, reset } = await ratelimit.limit(
      `validate_token_${ip}`
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          },
        }
      );
    }

    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Find contributor with this magic link token
    const contributor: ContributorModel = await sanityFetch({
      query: contributorByTokenQuery,
      qParams: { token },
      tags: ['contributor']
    });

    if (!contributor) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Check if token has expired
    if (contributor.magicLinkExpires && new Date(contributor.magicLinkExpires) < new Date()) {
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      contributor: {
        _id: contributor._id,
        name: contributor.name,
        email: contributor.email
      }
    });

  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}