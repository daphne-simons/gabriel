// app/api/cron/send-magic-links/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/config/client-config';
import { activeContributorsQuery } from '@/sanity/sanity-utils';
import writeClient from '@/sanity/config/write-client';

import { Resend } from 'resend';
import crypto from 'crypto';
import { ContributorModel } from '@/sanity/models/sanity-client-models';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
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


        // Send magic link email
        const magicLink = `${process.env.NEXT_PUBLIC_SITE_URL}/drop?token=${magicLinkToken}`;

        // TODO: abstract this into a reactEmail template, see autoreply route for example. 
        await resend.emails.send({
          from: 'Gabriel <more@gabriel.exchange>',
          to: contributor.email,
          subject: 'Your constellation portal is ready ✨',
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto;">
              <h2>Hello ${contributor.name},</h2>
              <p>The constellation is calling for your contribution. Share something that inspires you, intrigues you, or simply exists in your orbit right now.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${magicLink}" 
                   style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                  Enter the Portal
                </a>
              </div>
              <p style="font-size: 14px; color: #666;">
                This link expires in 7 days. Questions? Reply to this email.
              </p>
            </div>
          `
        });

        return { success: true, contributor: contributor.name };
      })
    );

    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

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