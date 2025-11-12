import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Database types for TypeScript
export interface Plan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  is_popular: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  plan_id?: string
  plan_name: string
  full_name: string
  email: string
  phone: string
  project_address?: string
  base_amount: number
  gst_amount: number
  total_amount: number
  payment_status: 'pending' | 'paid' | 'failed' | 'confirmed'
  razorpay_order_id?: string
  razorpay_payment_id?: string
  payment_screenshot_url?: string
  notes?: string
  created_at: string
  updated_at: string
}
