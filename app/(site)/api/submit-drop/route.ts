// API endpoint to submit contributor drops
import { NextRequest, NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/config/client-config';
import { contributorByTokenQuery } from '@/sanity/sanity-utils';
import writeClient from '@/sanity/config/write-client';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { ContributorModel } from '@/sanity/models/sanity-client-models';

// Create a rate limiter for submissions
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 submissions per hour per IP
  analytics: true,
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip ?? '127.0.0.1';
    const { success, limit, remaining, reset } = await ratelimit.limit(
      `submit_drop_${ip}`
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' },
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

    const formData = await request.formData();
    const token = formData.get('token') as string;

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Validate token and get contributor
    const contributor: ContributorModel = await sanityFetch({
      query: contributorByTokenQuery,
      qParams: { token: token },
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

    // Get uploaded files and metadata
    const files = formData.getAll('files') as File[];
    const captions = formData.getAll('captions') as string[];
    const credits = formData.getAll('credits') as string[];
    const altTexts = formData.getAll('altTexts') as string[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate file sizes and types
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'image/', 'video/', 'audio/', 'text/', 'application/pdf'
    ];

    for (const file of files) {
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds 50MB limit` },
          { status: 400 }
        );
      }

      if (!allowedTypes.some(type => file.type.startsWith(type))) {
        return NextResponse.json(
          { error: `File type ${file.type} not allowed` },
          { status: 400 }
        );
      }
    }

    // Upload files to Sanity and create submission documents
    const uploadedAssets = await Promise.all(
      files.map(async (file, index) => {
        // Convert File to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload to Sanity
        const asset = await writeClient.assets.upload(
          file.type.startsWith('image/') ? 'image' : 'file',
          buffer,
          {
            filename: file.name,
            title: captions[index] || file.name,
            description: credits[index] || undefined,
          }
        );

        return {
          asset: {
            _type: 'reference',
            _ref: asset._id
          },
          caption: captions[index] || '',
          credit: credits[index] || '',
          altText: altTexts[index] || '',
          mimeType: file.type,
          fileSize: file.size
        };
      })
    );

    // Create submission document in Sanity
    const submission = await writeClient.create({
      _type: 'submission',
      contributor: {
        _type: 'reference',
        _ref: contributor._id
      },
      assets: uploadedAssets,
      submittedAt: new Date().toISOString(),
      status: 'pending' // You might want moderation
    });

    // Clear the magic link token to prevent reuse (optional)
    await writeClient
      .patch(contributor._id)
      .unset(['magicLinkToken', 'magicLinkExpires'])
      .commit();

    return NextResponse.json({
      success: true,
      submissionId: submission._id,
      assetsCount: uploadedAssets.length
    });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};