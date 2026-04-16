import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { token, rsvp, plus_ones, plus_handles, creators_type, gmail } = await req.json()
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    const { error } = await supabaseAdmin.from('influencers').update({
      rsvp, plus_ones: plus_ones ?? 0,
      plus_handles: plus_handles ?? '', creators_type: creators_type ?? '',
      gmail: gmail ?? '', responded_at: new Date().toISOString(),
    }).eq('token', token)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}