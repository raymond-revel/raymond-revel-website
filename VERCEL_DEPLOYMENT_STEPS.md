# Vercel Deployment Steps

## ✅ Step 1: Push to GitHub (Complete this first)

Your repository is ready at: https://github.com/raymond-revel/raymond-revel-website.git

**Push your code:**
```bash
cd "/Volumes/Raymond's HD/Raymond Revel/Website:Cursor:Claude/raymond-revel-website"
git push -u origin main
```

When prompted:
- Username: Your GitHub username
- Password: Use a Personal Access Token (not your password)

**Create Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Vercel Deployment"
4. Select scope: `repo` (full control)
5. Generate and copy the token
6. Use this token as your password

---

## 🚀 Step 2: Deploy to Vercel

### 2.1 Sign Up for Vercel
1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Complete signup

### 2.2 Import Your Project
1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. You should see your `raymond-revel-website` repository
3. Click **"Import"** next to it

### 2.3 Configure Project Settings
**Framework Preset:** Next.js (should auto-detect) ✅

**Root Directory:** `./` (default) ✅

**Build Command:** `npm run build` (default) ✅

**Output Directory:** `.next` (default) ✅

**Install Command:** `npm install` (default) ✅

**Environment Variables:** (Optional - only if you have API keys)
- `NEXT_PUBLIC_YOUTUBE_API_KEY` (if you have one)
- `NEXT_PUBLIC_TIKTOK_API_KEY` (if you have one)
- `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN` (if you have one)

**Leave these empty for now** - your site will work without them!

### 2.4 Deploy
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. ✅ Your site will be live at: `raymond-revel-website.vercel.app`

---

## 🌐 Step 3: Connect Your Domain

### 3.1 Add Domain in Vercel
1. Go to your project dashboard in Vercel
2. Click **"Settings"** tab
3. Click **"Domains"** in the left sidebar
4. Enter: `raymondrevelmusic.com`
5. Click **"Add"**
6. Also add: `www.raymondrevelmusic.com` (optional but recommended)

### 3.2 Configure DNS

Vercel will show you DNS instructions. You have two options:

**Option A: Use Vercel Nameservers (Easiest)**
- Vercel will provide nameservers like:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`
- Go to your domain registrar (where you bought the domain)
- Find DNS/Nameserver settings
- Replace existing nameservers with Vercel's nameservers
- Save changes

**Option B: Add DNS Records (Keep Current Nameservers)**
- Keep your current nameservers
- Add these DNS records at your registrar:
  ```
  Type: A
  Name: @
  Value: 76.76.21.21
  
  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  ```
- Vercel will show you the exact values to use

### 3.3 Verify Domain
- Vercel will automatically verify your domain
- This may take a few minutes to 48 hours
- You'll see a green checkmark ✅ when verified
- Check status in Vercel → Settings → Domains

---

## 📋 Post-Deployment Checklist

- [ ] Test site at `raymond-revel-website.vercel.app`
- [ ] Test all pages (Home, About, Music, Videos, Photos, Blog)
- [ ] Verify videos load correctly
- [ ] Check mobile responsiveness
- [ ] Test domain: `raymondrevelmusic.com` (after DNS propagates)
- [ ] Submit sitemap to Google Search Console
- [ ] Update social media bio links

---

## 🔄 Making Updates

After initial deployment, updates are automatic:

1. **Edit your code locally**
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Vercel automatically deploys** - no manual steps needed!

---

## 🆘 Troubleshooting

**Domain not working?**
- Check DNS propagation: https://www.whatsmydns.net/
- Verify DNS records match Vercel's requirements
- Wait 24-48 hours for full propagation

**Build errors?**
- Check build logs in Vercel dashboard
- Test build locally: `npm run build`
- Fix errors and push again

**Need help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: support@vercel.com

---

## 🎉 You're Done!

Once DNS propagates (24-48 hours), your site will be live at:
- **https://raymondrevelmusic.com**
- **https://www.raymondrevelmusic.com**

Both will work automatically!

