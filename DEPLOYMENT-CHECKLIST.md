# 🚀 Production Deployment Checklist

Use this checklist before deploying your Marble Manager app to production.

---

## ✅ Pre-Deployment Checklist

### 🔐 Security

- [ ] Updated `.env.local` with production Supabase credentials
- [ ] Changed default WhatsApp number in `.env.local`
- [ ] Replaced UPI ID in `src/components/PaymentModal.tsx` (line 22)
- [ ] Verified `.env.local` is in `.gitignore` (should NOT be committed)
- [ ] Enabled Row Level Security (RLS) in Supabase (done by SQL script)
- [ ] Disabled email confirmation OR configured email templates in Supabase
- [ ] Set up 2FA for Supabase admin account
- [ ] Reviewed Supabase Authentication settings

### 🧪 Testing

- [ ] Tested signup flow (create new account)
- [ ] Tested login flow (login with existing account)
- [ ] Tested logout functionality
- [ ] Tested checkout flow (create order)
- [ ] Tested payment modal displays correctly
- [ ] Tested QR code generation
- [ ] Tested WhatsApp button opens correctly with pre-filled message
- [ ] Tested dashboard shows orders correctly
- [ ] Tested protected routes redirect to login when not authenticated
- [ ] Tested form validation (try invalid inputs)
- [ ] Tested on mobile devices (responsive design)
- [ ] Tested in different browsers (Chrome, Firefox, Safari)

### 📊 Database

- [ ] Ran `supabase-setup.sql` script in Supabase SQL Editor
- [ ] Verified 3 plans were inserted into `plans` table
- [ ] Checked RLS policies are enabled
- [ ] Set up Supabase database backups (Settings → Database → Backups)
- [ ] Reviewed database indexes for performance

### 🎨 Customization

- [ ] Updated business name in payment modal
- [ ] Updated colors/branding if needed
- [ ] Updated meta tags in `index.html` (title, description)
- [ ] Added favicon
- [ ] Customized email templates in Supabase (optional)

### 📱 Configuration

- [ ] Verified all environment variables are set correctly
- [ ] Added environment variables to hosting platform (Netlify/Vercel/Lovable)
- [ ] Tested build process locally (`npm run build`)
- [ ] Verified no TypeScript errors
- [ ] Verified no console warnings/errors

---

## 🌐 Deployment Steps

### Step 1: Build for Production

```bash
npm run build
```

✅ Verify build completes without errors

### Step 2: Test Production Build Locally

```bash
npm run preview
```

✅ Test the production build on `http://localhost:4173`

### Step 3: Deploy to Hosting Platform

Choose your platform:

#### Option A: Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

#### Option B: Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Option C: Lovable

1. Push code to GitHub
2. Connect GitHub repo in Lovable dashboard
3. Add environment variables
4. Deploy

### Step 4: Configure Environment Variables

Add these to your hosting platform's dashboard:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_WHATSAPP_NUMBER=919999999999
```

### Step 5: Configure Domain (Optional)

- [ ] Set up custom domain in hosting platform
- [ ] Update DNS records
- [ ] Enable HTTPS (should be automatic)
- [ ] Add custom domain to Supabase (Settings → API → Site URL)

---

## 🔍 Post-Deployment Verification

### Test on Production URL

- [ ] Can access the landing page
- [ ] Can sign up for new account
- [ ] Can log in
- [ ] Can view plans page
- [ ] Can checkout and create order
- [ ] Can see QR code in payment modal
- [ ] WhatsApp button works
- [ ] Can view dashboard with orders
- [ ] Can log out

### Performance

- [ ] Page loads in < 3 seconds
- [ ] Images are optimized
- [ ] No console errors
- [ ] Mobile responsive

### SEO (Optional)

- [ ] Added meta descriptions
- [ ] Added Open Graph tags
- [ ] Added Twitter Card tags
- [ ] Submitted sitemap to Google Search Console

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring

- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Monitor Supabase usage (Dashboard → Usage)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom, etc.)

### Regular Maintenance

- [ ] Check Supabase logs weekly
- [ ] Review orders in database
- [ ] Update dependencies monthly (`npm outdated`)
- [ ] Monitor security advisories (`npm audit`)
- [ ] Backup database regularly

---

## 🐛 Common Production Issues

### Issue: Users can't sign up
**Check:**
- Supabase authentication is enabled
- Email provider is configured
- RLS policies are correct
- No JavaScript errors in console

### Issue: Orders not being created
**Check:**
- User is logged in
- Database connection works
- RLS policies allow INSERT
- Supabase credentials are correct

### Issue: Payment QR not showing
**Check:**
- UPI ID is set correctly
- Internet connection works
- No CORS issues
- QR API is accessible

### Issue: WhatsApp button not working
**Check:**
- WhatsApp number is correct format (no + or spaces)
- Number is in `.env.local`
- Device has WhatsApp installed (for mobile)

---

## 🎯 Performance Optimization (Optional)

- [ ] Enable Supabase Connection Pooling
- [ ] Add database indexes for frequently queried fields
- [ ] Implement pagination for orders list
- [ ] Add loading skeletons
- [ ] Optimize images with WebP format
- [ ] Enable compression on hosting platform
- [ ] Add service worker for offline support

---

## 🔒 Security Hardening (Advanced)

- [ ] Set up rate limiting for API requests
- [ ] Add CAPTCHA to signup form (optional)
- [ ] Implement password strength requirements
- [ ] Add email verification (if not enabled)
- [ ] Set up Web Application Firewall (WAF)
- [ ] Regular security audits
- [ ] Set up CORS properly in Supabase

---

## 📞 Support & Contact

If you need help with deployment:

1. Check Supabase logs in dashboard
2. Check hosting platform logs (Netlify/Vercel)
3. Check browser console for errors
4. Review this checklist again
5. Check [SETUP.md](./SETUP.md) for detailed troubleshooting

---

## ✅ You're Live!

Once all checks pass:

🎉 **Congratulations!** Your Marble Manager app is live and ready to accept orders!

**Next Steps:**
- Share your website URL with customers
- Test the entire flow with a real order
- Monitor the dashboard for incoming orders
- Set up email notifications for new orders (optional)

---

## 📈 Growth Features (Future Enhancements)

Consider adding:
- Email notifications when orders are placed
- Admin panel to manage orders
- Payment gateway integration (Razorpay) for automated confirmations
- SMS notifications
- Order tracking page
- Customer reviews and ratings
- Blog for SEO
- Lead generation forms

Good luck! 🚀
