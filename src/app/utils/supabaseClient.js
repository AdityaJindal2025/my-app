import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ymkcpjtrhteauvzcumdd.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlta2NwanRyaHRlYXV2emN1bWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NjI5ODMsImV4cCI6MjA2NzQzODk4M30.UEhGg9FAhBOLTPiGGG3hmenVb3WocSphnIT1apZyHUM'
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
