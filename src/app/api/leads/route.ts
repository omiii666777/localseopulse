import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const auditId = (body.auditId || '').trim();
    const businessEmail = (body.businessEmail || '').trim().toLowerCase();
    const phone = (body.phone || '').trim() || null;
    const claimedStatus = Boolean(body.claimedStatus);

    if (!auditId || !businessEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
      return NextResponse.json(
        { error: 'A valid Audit ID and Business Email Address are required.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        audit_id: auditId,
        business_email: businessEmail,
        phone,
        claimed_status: claimedStatus,
      })
      .select('*')
      .single();

    if (error) {
      return NextResponse.json(
        { error: `Failed to save lead information: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ lead, unlocked: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error capturing lead.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
