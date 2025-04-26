import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kjdfckmdvppnvtoryjws.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZGZja21kdnBwbnZ0b3J5andzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MTYzNjIsImV4cCI6MjA2MTE5MjM2Mn0.WhGy-nJKf0eJ0pVJFRqXNhIabF_JH6eluFwu29cUPgI'!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
