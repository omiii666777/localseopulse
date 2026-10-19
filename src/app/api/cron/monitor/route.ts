import { NextRequest, NextResponse } from 'next/server';
import { executeFullAudit } from '@/lib/audit-engine';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { AuditRecord, PlaceReview } from '@/types/audit';

async function sendAlertEmail(params: {
  toEmail: string;
  businessName: string;
  previousScore: number;
  newScore: number;
  newNegativeReviews: PlaceReview[];
  auditId: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'LocalSeoPulse Alerts <alerts@localseopulse.com>';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable');
  }

  const scoreDelta = params.newScore - params.previousScore;
  const subject =
    scoreDelta < 0
      ? `[Alert] ${params.businessName} GBP Health Score Dropped to ${params.newScore}/100`
      : `[Alert] New Negative Review Detected for ${params.businessName}`;

  const negativeReviewHtml =
    params.newNegativeReviews.length > 0
      ? `
        <div style="margin-top:20px;padding:16px;background-color:#fef2f2;border-left:4px solid #ef4444;border-radius:6px;">
          <h3 style="margin:0 0 8px 0;color:#991b1b;font-size:16px;">New Negative Reviews Requiring Response (${params.newNegativeReviews.length})</h3>
          ${params.newNegativeReviews
            .map(
              (rev) => `
              <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #fee2e2;">
                <p style="margin:0;font-weight:600;color:#7f1d1d;">${rev.author_name} — ${rev.rating}★ (${rev.relative_time_description})</p>
                <p style="margin:6px 0 0 0;color:#374151;font-size:14px;">"${rev.text || 'No written comment provided.'}"</p>
              </div>
            `
            )
            .join('')}
        </div>
      `
      : '';

  const htmlBody = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;">
      <h2 style="margin:0 0 12px 0;color:#111827;">Weekly LocalSeoPulse Health Alert</h2>
      <p style="color:#4b5563;font-size:15px;line-height:1.5;">
        Our automated weekly scan for <strong>${params.businessName}</strong> detected changes that require your attention:
      </p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#f9fafb;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;color:#6b7280;">Previous Health Score</td>
          <td style="padding:14px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#111827;">${params.previousScore}/100</td>
        </tr>
        <tr>
          <td style="padding:14px;color:#6b7280;">Current Health Score</td>
          <td style="padding:14px;font-weight:700;color:${
            params.newScore < params.previousScore ? '#dc2626' : '#111827'
          };">${params.newScore}/100 (${scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta} pts)</td>
        </tr>
      </table>
      ${negativeReviewHtml}
      <div style="margin-top:24px;">
        <a href="${appUrl}/?auditId=${params.auditId}" style="display:inline-block;padding:12px 20px;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:600;border-radius:8px;">
          View Full Diagnostic Action Plan
        </a>
      </div>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [params.toEmail],
      subject,
      html: htmlBody,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Resend API error (${response.status}): ${errText}`);
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized cron invocation' }, { status: 401 });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GOOGLE_PLACES_API_KEY' }, { status: 500 });
    }

    const supabase = getSupabaseAdminClient();

    const { data: userAudits, error: fetchError } = await supabase
      .from('audits')
      .select('*, users!inner(email, subscription_tier)')
      .not('user_id', 'is', null)
      .order('created_at', { ascending: false });

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const uniqueTrackedBusinesses = new Map<
      string,
      AuditRecord & { users: { email: string; subscription_tier: string } }
    >();

    for (const row of userAudits || []) {
      const key = `${row.user_id}:${row.place_id}`;
      if (!uniqueTrackedBusinesses.has(key)) {
        uniqueTrackedBusinesses.set(key, row);
      }
    }

    const summary = {
      checkedCount: 0,
      alertsSent: 0,
      errors: [] as string[],
    };

    for (const [, previousAudit] of uniqueTrackedBusinesses) {
      try {
        summary.checkedCount += 1;

        const freshAudit = await executeFullAudit({
          businessName: previousAudit.business_name,
          city: previousAudit.city,
          websiteUrl: previousAudit.website_url,
          placeId: previousAudit.place_id,
          apiKey,
        });

        const previousReviewTimestamps = new Set(
          (previousAudit.raw_audit_data?.placeDetails?.recentReviews || []).map((r) => r.time)
        );

        const newNegativeReviews = (
          freshAudit.rawAuditData.placeDetails.recentReviews || []
        ).filter((review) => review.rating <= 3 && !previousReviewTimestamps.has(review.time));

        const scoreDropped = freshAudit.healthScore < previousAudit.health_score;

        const { data: savedSnapshot, error: insertErr } = await supabase
          .from('audits')
          .insert({
            user_id: previousAudit.user_id,
            business_name: freshAudit.exactBusinessName,
            place_id: freshAudit.placeId,
            city: previousAudit.city,
            website_url: previousAudit.website_url,
            health_score: freshAudit.healthScore,
            raw_audit_data: freshAudit.rawAuditData,
          })
          .select('id')
          .single();

        if (insertErr) {
          throw new Error(insertErr.message);
        }

        if (scoreDropped || newNegativeReviews.length > 0) {
          await sendAlertEmail({
            toEmail: previousAudit.users.email,
            businessName: freshAudit.exactBusinessName,
            previousScore: previousAudit.health_score,
            newScore: freshAudit.healthScore,
            newNegativeReviews,
            auditId: savedSnapshot.id,
          });
          summary.alertsSent += 1;
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Unknown monitoring error';
        summary.errors.push(`${previousAudit.business_name}: ${errMsg}`);
      }
    }

    return NextResponse.json({
      status: 'completed',
      timestamp: new Date().toISOString(),
      ...summary,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Cron execution failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
