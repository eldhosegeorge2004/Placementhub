import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise fallback to hardcoded keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tsryyjzknpeffskgamiq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcnl5anprbnBlZmZza2dhbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMjQwMTgsImV4cCI6MjA5NzkwMDAxOH0.fmr1DZAwevP_j7aITwKufK6OLZMV0GzH-LXV3mhrAvI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
