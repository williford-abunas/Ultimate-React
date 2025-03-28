
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ayxacsottclfxlwekkzh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5eGFjc290dGNsZnhsd2Vra3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMTk0NTgsImV4cCI6MjA1NzU5NTQ1OH0.-43KCSCAmoDcnoZhcJkiMy3KlgKHkeYB5DXm7srfbf0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase