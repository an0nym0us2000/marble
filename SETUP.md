# Marble Manager - Setup Guide

## 🚀 Production-Ready Authentication & Payment System

This guide will help you set up authentication and QR code payment system for your Marble Manager application.

---

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- A Supabase account (free tier is sufficient)
- A UPI ID for receiving payments
- WhatsApp Business number (optional but recommended)

---

## 🛠️ Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or login
3. Click "New Project"
4. Fill in the details:
   - **Project Name**: marble-manager
   - **Database Password**: (Choose a strong password and save it)
   - **Region**: Choose closest to India (Singapore recommended)
5. Wait for the project to be created (2-3 minutes)

### 1.2 Get API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### 1.3 Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Open the file `supabase-setup.sql` from your project root
4. Copy and paste the entire contents into the SQL Editor
5. Click **Run** or press `Ctrl+Enter`
6. You should see "Success. No rows returned" message

### 1.4 Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider (should be enabled by default)
3. Optional: Disable "Confirm email" if you want instant signup
   - Go to **Authentication** → **Settings**
   - Under "Email Auth", toggle OFF "Enable email confirmations"
4. Optional: Configure email templates
   - Go to **Authentication** → **Email Templates**
   - Customize "Confirm signup", "Magic Link", etc.

---

## 🔧 Step 2: Configure Environment Variables

### 2.1 Update `.env.local`

1. Open `.env.local` in your project root
2. Replace the placeholder values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Payment Configuration
VITE_RAZORPAY_KEY_ID=optional-for-future-use

# WhatsApp Business Number (with country code, no + or spaces)
VITE_WHATSAPP_NUMBER=919999999999
```

### 2.2 Update UPI ID for Payments

Open `src/components/PaymentModal.tsx` and find this line (around line 22):

```typescript
const upiId = 'marblemanager@upi' // REPLACE WITH YOUR ACTUAL UPI ID
```

Replace with your actual UPI ID (e.g., `yourname@paytm`, `yourname@ybl`, etc.)

---

## 📦 Step 3: Install Dependencies & Run

### 3.1 Install Dependencies

```bash
npm install
```

### 3.2 Start Development Server

```bash
npm run dev
```

The app will run on `http://localhost:8080`

---

## 🧪 Step 4: Test the Application

### 4.1 Test Authentication

1. Open `http://localhost:8080`
2. Click on any "Buy Now" button
3. You'll be redirected to **Login** page
4. Click "Sign up" to create an account:
   - Enter your name, email, and password
   - Click "Sign Up"
5. You should be logged in automatically and redirected to Plans page

### 4.2 Test Checkout Flow

1. After logging in, click "Buy Now" on any plan
2. Fill in the checkout form:
   - Full Name (required)
   - Email (pre-filled)
   - Phone Number (10 digits)
   - Project Address (optional)
3. Click "Proceed to Payment"

### 4.3 Test Payment Modal

1. After submitting the form, you should see:
   - QR code for UPI payment
   - Your order details
   - WhatsApp confirmation button
2. Test the WhatsApp button - it should open WhatsApp with pre-filled message
3. The "Open UPI App Directly" button should trigger your UPI app

### 4.4 Test Dashboard

1. Go to `http://localhost:8080/dashboard`
2. You should see all your orders
3. Each order shows:
   - Plan name
   - Payment status
   - Amount details
   - Contact information

---

## 🎨 Step 5: Customization

### 5.1 Update WhatsApp Number

In `.env.local`:
```env
VITE_WHATSAPP_NUMBER=919876543210
```

### 5.2 Update UPI Merchant Name

In `src/components/PaymentModal.tsx`:
```typescript
const merchantName = 'Your Business Name'
```

### 5.3 Customize Colors & Branding

The app uses Tailwind CSS. Update colors in `src/index.css`:

```css
:root {
  --primary: 265 70% 50%; /* Purple */
  --secondary: 350 85% 60%; /* Pink */
}
```

---

## 🚀 Step 6: Deploy to Production

### 6.1 Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

### 6.2 Deploy to Lovable/Netlify/Vercel

#### Option A: Deploy to Lovable
1. Push your code to GitHub
2. Connect your Lovable project to GitHub
3. Add environment variables in Lovable dashboard
4. Deploy!

#### Option B: Deploy to Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify login`
3. Run: `netlify deploy --prod`
4. Add environment variables in Netlify dashboard

#### Option C: Deploy to Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel login`
3. Run: `vercel --prod`
4. Add environment variables in Vercel dashboard

### 6.3 Add Environment Variables to Hosting Platform

Add these environment variables in your hosting platform's dashboard:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_WHATSAPP_NUMBER`

**⚠️ IMPORTANT**: Never commit `.env.local` to Git! It's already in `.gitignore`.

---

## 🔒 Step 7: Security & Production Checklist

### Required Steps:

- [ ] Update Supabase RLS policies (already configured in SQL script)
- [ ] Change default WhatsApp number in `.env.local`
- [ ] Replace UPI ID in `PaymentModal.tsx`
- [ ] Test signup/login flow
- [ ] Test payment QR code generation
- [ ] Test WhatsApp integration
- [ ] Enable email confirmation in Supabase (optional but recommended)
- [ ] Set up custom email templates in Supabase
- [ ] Add custom domain to Supabase project
- [ ] Enable 2FA for Supabase admin account

### Recommended Steps:

- [ ] Set up Supabase backups (Settings → Database → Backups)
- [ ] Add rate limiting to prevent abuse
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure CORS in Supabase if needed
- [ ] Add Google Analytics or similar
- [ ] Set up email notifications for new orders
- [ ] Create admin panel to manage orders

---

## 📊 Database Schema

### Tables Created:

1. **plans** - Service plans (Consultation, Premium, Full Service)
2. **orders** - Customer orders with payment tracking
3. **auth.users** - User accounts (managed by Supabase)

### Row Level Security (RLS):

- Users can only view/edit their own orders
- Plans are publicly readable
- All policies are enforced at database level

---

## 🎯 Features Implemented

### ✅ Authentication System
- Email/password signup and login
- Protected routes (checkout, dashboard)
- Auto-redirect for authenticated users
- Session management with Supabase Auth

### ✅ Payment System
- QR code generation for UPI payments
- Order creation in database
- Payment status tracking (pending, paid, confirmed, failed)
- Manual UPI ID display with copy button

### ✅ WhatsApp Integration
- Pre-filled message with order details
- Direct link to WhatsApp Business number
- Instant payment confirmation workflow

### ✅ User Dashboard
- View all orders
- Order history with status
- Contact information
- Payment details with GST breakdown

### ✅ Form Validation
- Zod schema validation
- React Hook Form integration
- Indian phone number validation
- Email format validation

---

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Check that `.env.local` exists and has correct values. Restart dev server.

### Issue: "Cannot insert into orders table"
**Solution**: Make sure you ran the SQL script in Supabase. Check RLS policies.

### Issue: "QR code not loading"
**Solution**: Check your internet connection. The QR API requires internet access.

### Issue: "User not redirected after login"
**Solution**: Check that protected routes are wrapped with `<ProtectedRoute>` component.

### Issue: "WhatsApp button not working"
**Solution**: Make sure WhatsApp is installed on device and number is correct in `.env.local`.

---

## 📚 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Forms**: React Hook Form + Zod
- **State**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Payment**: UPI QR Code (no payment gateway fees!)

---

## 📞 Support

If you encounter any issues:

1. Check Supabase logs in dashboard
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Make sure SQL script ran successfully
5. Test in incognito mode to rule out cache issues

---

## 🎉 Congratulations!

Your Marble Manager app is now production-ready with:
- ✅ Secure authentication system
- ✅ QR code payment integration
- ✅ WhatsApp confirmation workflow
- ✅ Order tracking dashboard
- ✅ Database with proper security

Start accepting orders today! 🚀
