import { createClient, SupabaseClient } from '@supabase/supabase-js';

// These MUST be set in your Vercel Environment Variables:
//   VITE_SUPABASE_URL       → your Supabase project URL
//   VITE_SUPABASE_ANON_KEY  → your Supabase anon/public key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Guard: don't crash the entire app if env vars are missing
let supabase: SupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase environment variables are missing!\n' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vercel dashboard.\n' +
    'The app will load but auth/data features will not work.'
  );
  // Create a dummy client with a placeholder URL so the app doesn't crash
  supabase = createClient('https://placeholder.supabase.co', 'placeholder');
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
