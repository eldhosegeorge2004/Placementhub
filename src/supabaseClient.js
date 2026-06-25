import { createClient } from '@supabase/supabase-js';

// Force hardcoded keys to ignore potentially broken Vercel environment variables
const supabaseUrl = 'https://tsryyjzknpeffskgamiq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcnl5anprbnBlZmZza2dhbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMjQwMTgsImV4cCI6MjA5NzkwMDAxOH0.fmr1DZAwevP_j7aITwKufK6OLZMV0GzH-LXV3mhrAvI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
