// app/api/cron/send-magic-links/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/config/client-config';
import { activeContributorsQuery } from '@/sanity/sanity-utils';
import writeClient from '@/sanity/config/write-client';

import { Resend } from 'resend';
import crypto from 'crypto';
import { ContributorModel } from '@/sanity/models/sanity-client-models';
import { magicLinkConfirmationProvider, magicLinkProvider } from '@/app/(site)/utils/resend-utils';

// const resend = new Resend(process.env.RESEND_API_KEY);

// NOTE: Vercel only works with GET requests
export async function GET(request: NextRequest) {
  // Verify this is actually coming from Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    // Get all active contributors
    const contributors: ContributorModel[] = await sanityFetch({
      query: activeContributorsQuery,
      qParams: {},
      tags: ['contributor']
    });

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const contributorsToNudge = contributors.filter((contributor: any) => {
      if (!contributor.lastNudgedDate) return true;
      return new Date(contributor.lastNudgedDate) < twoMonthsAgo;
    });

    let magicContributors = [];

    const results = await Promise.allSettled(
      contributorsToNudge.map(async (contributor: any) => {
        // Generate unique magic link token
        const magicLinkToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // Token expires in 7 days

        // Update contributor with magic link token and nudge date
        await writeClient
          .patch(contributor._id)
          .set({
            magicLinkToken,
            magicLinkExpires: expiresAt.toISOString(),
            lastNudgedDate: new Date().toISOString()
          })
          .commit();


        // Magic link string
        const magicLink = `${process.env.NEXT_PUBLIC_SITE_URL}/drop?token=${magicLinkToken}`;
        // Send magic link via Resend Provider
        await magicLinkProvider(contributor, magicLink);
        magicContributors.push({ "Contributor": contributor.name, "Magic Link": magicLink });

        return { success: true, contributor: contributor.name };
      })
    );

    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    if (failed > 0) {
      console.error('Failed to send magic links:', failed);
    }
    if (successful > 0) {
      console.log('Magic links sent successfully:', successful);
      // TODO: send confirmation of Magic Link distribution email to Ella. 
      await magicLinkConfirmationProvider(magicContributors);
    }
    return NextResponse.json({
      message: `Magic links sent successfully`,
      successful,
      failed,
      total: contributorsToNudge.length
    });

  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json(
      { error: 'Failed to send magic links' },
      { status: 500 }
    );
  }
}