import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { syncAllOrdersFromSupabase } from '@/lib/services/google-sheets'

export async function POST() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    const result = await syncAllOrdersFromSupabase()
    return NextResponse.json({ success: true, ...result })
  } catch (error: any) {
    console.error('[Sync Sheets API Error]:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to sync orders to Google Sheet' },
      { status: 500 }
    )
  }
}
