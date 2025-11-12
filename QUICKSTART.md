# 🚀 Quick Start Guide

Get your Marble Manager app running with authentication and payments in **10 minutes**!

---

## ⚡ Super Quick Setup

### 1️⃣ Install Dependencies (1 min)

```bash
npm install
```

### 2️⃣ Create Supabase Project (3 mins)

1. Go to [supabase.com](https://supabase.com) and create account
2. Click **"New Project"**
3. Name it: `marble-manager`
4. Wait for it to be created

### 3️⃣ Setup Database (2 mins)

1. In Supabase, go to **SQL Editor**
2. Copy everything from `supabase-setup.sql` file
3. Paste and click **Run**
4. Done! ✅

### 4️⃣ Get API Keys (1 min)

1. In Supabase, go to **Settings** → **API**
2. Copy:
   - Project URL
   - anon/public key

### 5️⃣ Configure App (2 mins)

1. Open `.env.local` file
2. Replace with your values:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-key...
VITE_WHATSAPP_NUMBER=919999999999
```

3. Open `src/components/PaymentModal.tsx`
4. Find line 22: `const upiId = 'marblemanager@upi'`
5. Replace with YOUR UPI ID (e.g., `yourname@paytm`)

### 6️⃣ Start App (1 min)

```bash
npm run dev
```

Open `http://localhost:8080` 🎉

---

## ✅ Test It Works

1. **Click "Sign Up"** → Create account
2. **Click "Buy Now"** on any plan
3. **Fill checkout form** → Click "Proceed to Payment"
4. **You should see**:
   - ✅ QR code for payment
   - ✅ WhatsApp button
   - ✅ Order details

---

## 🎯 What You Get

- ✅ **Login/Signup** pages
- ✅ **Protected checkout** (must login first)
- ✅ **QR code payment** (UPI)
- ✅ **WhatsApp confirmation**
- ✅ **Dashboard** to view orders
- ✅ **Secure database** with Supabase

---

## 📱 Pages Available

- `/` - Landing page
- `/login` - Login page
- `/signup` - Sign up page
- `/plans` - View plans
- `/checkout` - Checkout (protected)
- `/dashboard` - Your orders (protected)

---

## 🔥 Deploy to Production

### Option 1: Netlify (Easiest)

```bash
npm run build
npx netlify-cli deploy --prod
```

Add environment variables in Netlify dashboard.

### Option 2: Vercel

```bash
npm run build
npx vercel --prod
```

Add environment variables in Vercel dashboard.

---

## ❓ Common Issues

**Q: "Missing Supabase environment variables"**
A: Restart dev server after updating `.env.local`

**Q: "Cannot insert into orders"**
A: Run the SQL script in Supabase SQL Editor

**Q: "QR code not showing"**
A: Check internet connection (QR API needs internet)

---

## 📚 Full Documentation

See [SETUP.md](./SETUP.md) for detailed setup guide.

---

## 🎉 You're Done!

Your app is now production-ready with authentication and payments!

**Need help?** Check the [SETUP.md](./SETUP.md) file for detailed troubleshooting.
