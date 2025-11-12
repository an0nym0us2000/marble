-- Marble Manager Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  period TEXT DEFAULT 'one-time',
  features JSONB,
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES plans(id),
  plan_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_address TEXT,
  base_amount DECIMAL(10,2) NOT NULL,
  gst_amount DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, confirmed
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  payment_screenshot_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Admin users table (stores admin emails)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to allow re-running this script)
DROP POLICY IF EXISTS "Anyone can view plans" ON plans;
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;
DROP POLICY IF EXISTS "Admins can update any order" ON orders;
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can view their own admin status" ON admin_users;

-- Plans policies (public read access)
CREATE POLICY "Anyone can view plans" ON plans
  FOR SELECT USING (true);

-- Admin policies (allow authenticated users to check if they're admin)
CREATE POLICY "Authenticated users can view their own admin status" ON admin_users
  FOR SELECT USING (auth.uid() = user_id);

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Orders policies (users can only see their own orders, admins can see all)
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any order" ON orders
  FOR UPDATE USING (is_admin());

-- Insert default plans
INSERT INTO plans (name, price, period, features, is_popular) VALUES
  ('Consultation Plan', 999.00, 'session',
   '["Expert guidance on marble selection", "Quality assessment tips", "Budget planning advice", "Supplier recommendations", "One-time consultation session"]',
   false),
  ('Premium Plan', 4999.00, 'project',
   '["Everything in Consultation Plan", "Direct connection with verified suppliers", "Quality inspection at supplier", "Price negotiation support", "Delivery coordination", "Post-delivery support"]',
   true),
  ('Full Service Plan', 24999.00, 'project',
   '["Everything in Premium Plan", "End-to-end marble procurement", "On-site quality verification", "Installation supervision", "Warranty documentation", "Priority 24/7 support", "Money-back guarantee"]',
   false)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_payment_status_idx ON orders(payment_status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist (to allow re-running this script)
DROP TRIGGER IF EXISTS update_plans_updated_at ON plans;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON plans TO authenticated;
GRANT ALL ON orders TO authenticated;
GRANT SELECT ON plans TO anon;

COMMENT ON TABLE plans IS 'Available service plans for marble procurement';
COMMENT ON TABLE orders IS 'Customer orders with payment tracking';
COMMENT ON TABLE admin_users IS 'Admin users with full access to all orders';

-- To add an admin user, first they must sign up normally, then run:
-- INSERT INTO admin_users (user_id, email)
-- SELECT id, email FROM auth.users WHERE email = 'your-admin-email@example.com';
--
-- Or if you know the user_id:
-- INSERT INTO admin_users (user_id, email) VALUES ('user-uuid-here', 'admin@example.com');
