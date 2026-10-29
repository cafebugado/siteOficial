import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_COMMUNITY_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_COMMUNITY_ANON_KEY || 'placeholder'

export const supabaseCommunity = createClient(supabaseUrl, supabaseAnonKey)

