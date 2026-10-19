import { NextRequest, NextResponse } from 'next/server';
import { executeFullAudit } from '@/lib/audit-engine';
import { getSupabaseAdminClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const businessName = (body.businessName || '').trim();
    const city = (body.city || '').trim();
    const websiteUrl = (body.websiteUrl || '').trim() || null;
    const placeId = (body.placeId || '').trim() || null;
    const userId = (body.userId || '').trim() || null;

    if (!businessName || !city) {
      return NextResponse.json(
        { error: 'Both Business Name and City / Location are required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_PLACES_API_KEY is not configured on the server.' },
        { status: 500 }
      );
    }

    const auditResult = await executeFullAudit({
      businessName,
      city,
      websiteUrl,
      placeId,
      apiKey,
    });

    const supabase = getSupabaseAdminClient();
    const { data: insertedAudit, error: dbError } = await supabase
      .from('audits')
      .insert({
        user_id: userId,
        business_name: auditResult.exactBusinessName,
        place_id: auditResult.placeId,
        city,
        website_url: websiteUrl || auditResult.rawAuditData.placeDetails.googleWebsiteUrl,
        health_score: auditResult.healthScore,
        raw_audit_data: auditResult.rawAuditData,
      })
      .select('*')
      .single();

    if (dbError) {
      return NextResponse.json(
        { error: `Failed to persist audit to database: ${dbError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ audit: insertedAudit }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred during the audit.';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
