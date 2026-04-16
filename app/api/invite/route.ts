import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('t')
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  const { data, error } = await supabaseAdmin.from('influencers').select('*').eq('token', token).single()
  if (error || !data) return NextResponse.json({ error: 'Invalid token' }, { status: 404 })
  if (!data.link_opened) {
    await supabaseAdmin.from('influencers').update({ link_opened: true, link_opened_at: new Date().toISOString() }).eq('token', token)
  }
  return NextResponse.json(data)
}