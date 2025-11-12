# Admin Panel Setup Guide

## Overview

The admin panel allows you to:
- View all customer orders in real-time
- Update payment statuses manually
- Search and filter orders
- View revenue statistics
- Contact customers directly via WhatsApp

## Initial Setup

### Step 1: Update Database Schema

If you haven't already run the SQL setup script, or if you ran it before the admin functionality was added, you need to update your database:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Open your project: `cfmjkkenlgprbsqaeumj`
3. Navigate to **SQL Editor**
4. Copy the **entire contents** of `supabase-setup.sql`
5. Paste and click **Run**

This will create:
- `admin_users` table to store admin access
- `is_admin()` function to check admin status
- Updated RLS policies allowing admins to see all orders

### Step 2: Create Your Admin Account

**Option A: Using Your Existing Account**

If you already have a user account, make yourself an admin:

1. In Supabase Dashboard, go to **SQL Editor**
2. Run this query (replace with your email):

```sql
INSERT INTO admin_users (user_id, email)
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';
```

**Option B: Creating a New Admin Account**

1. Sign up normally at `/signup` on your website
2. Then run the SQL query above with that email

### Step 3: Access the Admin Panel

1. Log in with your admin account
2. Navigate to `/admin` (e.g., `http://localhost:8080/admin`)
3. You should see the admin dashboard with all orders

## Admin Panel Features

### Dashboard Overview

The admin panel includes:

**Statistics Cards:**
- Total Orders
- Total Revenue (paid + confirmed orders)
- Pending Orders Count
- Confirmed Orders Count

**Filters:**
- Search by name, email, phone, plan name, or order ID
- Filter by payment status (all, pending, paid, confirmed, failed)

**Order Management:**
- View complete order details
- Update payment status with dropdown
- Contact customers via WhatsApp
- See order timestamps and amounts

### Payment Status Workflow

Recommended workflow:

1. **Pending** - Initial state when order is created
2. **Paid** - Customer sends payment screenshot on WhatsApp
3. **Confirmed** - You verify payment in bank account
4. **Failed** - Payment failed or was declined

### Managing Orders

For each order, you can:

1. **Update Status**: Use the dropdown to change payment status
2. **Contact Customer**: Click "Contact on WhatsApp" to message them
3. **View Details**: See full order information, amounts, and timestamps

## Adding More Admins

To add another admin user:

1. Have them create a normal account at `/signup`
2. Go to Supabase SQL Editor
3. Run:

```sql
INSERT INTO admin_users (user_id, email)
SELECT id, email FROM auth.users WHERE email = 'new-admin@example.com';
```

## Removing Admin Access

To remove admin access from a user:

```sql
DELETE FROM admin_users WHERE email = 'user-to-remove@example.com';
```

## Security Notes

- Admin access is protected by Row Level Security (RLS)
- Only users in the `admin_users` table can access `/admin`
- Non-admin users are redirected to `/plans`
- All order updates are logged with timestamps
- Admin function uses `SECURITY DEFINER` for proper permission checks

## Troubleshooting

**Problem: Can't access `/admin` route**
- Verify you're logged in
- Check that your email exists in `admin_users` table:
  ```sql
  SELECT * FROM admin_users WHERE email = 'your-email@example.com';
  ```

**Problem: Can't see any orders**
- Check if RLS policies are enabled:
  ```sql
  SELECT tablename, policyname FROM pg_policies WHERE tablename = 'orders';
  ```
- Verify the `is_admin()` function exists:
  ```sql
  SELECT routine_name FROM information_schema.routines WHERE routine_name = 'is_admin';
  ```

**Problem: Status update fails**
- Check browser console for errors
- Verify admin policy exists on orders table
- Ensure you're logged in as admin

## Support

For issues with the admin panel, check:
1. Browser console for JavaScript errors
2. Supabase logs for database errors
3. Network tab for API failures

Access the admin panel at: `https://your-domain.vercel.app/admin`
