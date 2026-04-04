import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_COMMUNITY_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_COMMUNITY_ANON_KEY as string

export const supabaseCommunity = createClient(supabaseUrl, supabaseAnonKey)
