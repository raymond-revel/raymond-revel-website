# Deployment Guide: Replacing Wix with Next.js on Vercel

This guide will help you deploy your Next.js website to Vercel and connect your domain `raymondrevelmusic.com`.

## Why Vercel?

✅ **Best Choice for Next.js**
- Created by the same team that built Next.js
- Zero-configuration deployment
- Optimized for Next.js performance

✅ **Easy Management**
- Simple dashboard interface
- One-click deployments from GitHub
- Automatic SSL certificates
- Easy to update (just push to GitHub)

✅ **Free Tier**
- Generous free tier for personal/professional sites
- Automatic HTTPS
- Global CDN
- Custom domains supported

✅ **Great Performance**
- Edge network for fast loading worldwide
- Automatic image optimization
- Built-in analytics

## Prerequisites

1. GitHub account (free)
2. Vercel account (free)
3. Access to your domain registrar (where you bought raymondrevelmusic.com)

## Step-by-Step Deployment

### Step 1: Prepare Your Code

1. **Create a GitHub Repository**
   ```bash
   cd "/Volumes/Raymond's HD/Raymond Revel/Website:Cursor:Claude/raymond-revel-website"
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub Repository Online**
   - Go to https://github.com/new
   - Repository name: `raymond-revel-website` (or your preferred name)
   - Make it **Public** (free) or **Private** (your choice)
   - Click "Create repository"

3. **Push Your Code to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/raymond-revel-website.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Deploy to Vercel

1. **Sign Up for Vercel**
   - Go to https://vercel.com/signup
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

2. **Import Your Project**
   - In Vercel dashboard, click "Add New..." → "Project"
   - Find your `raymond-revel-website` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
   
   **Environment Variables** (if needed):
   - If you have any API keys, add them here:
     - `NEXT_PUBLIC_YOUTUBE_API_KEY` (optional)
     - `NEXT_PUBLIC_TIKTOK_API_KEY` (optional)
     - `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN` (optional)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `your-project-name.vercel.app`

### Step 3: Connect Your Domain

1. **Add Domain in Vercel**
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Enter: `raymondrevelmusic.com`
   - Click "Add"
   - Also add: `www.raymondrevelmusic.com` (optional but recommended)

2. **Configure DNS at Your Domain Registrar**

   You'll need to add DNS records. Vercel will show you exactly what to add.

   **Option A: Use Vercel Nameservers (Easiest)**
   - Vercel will provide nameservers like:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Find DNS/Nameserver settings
   - Replace existing nameservers with Vercel's nameservers
   - Save changes
   - Wait 24-48 hours for propagation

   **Option B: Add DNS Records (More Control)**
   - Keep your current nameservers
   - Add these DNS records:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```
   - Vercel will show you the exact values to use

3. **Verify Domain**
   - Vercel will automatically verify your domain
   - This may take a few minutes to 48 hours
   - You'll see a green checkmark when verified

### Step 4: Update Wix Domain Settings

**Before disconnecting from Wix:**

1. **Export any content** you want to keep from Wix
2. **Note down any important settings** or integrations
3. **Wait for DNS propagation** (24-48 hours) before disconnecting

**After DNS propagates:**

1. Log into your Wix account
2. Go to Domain settings
3. Disconnect/remove the domain from Wix
4. Your site will now point to Vercel

### Step 5: Final Configuration

1. **Enable Automatic Deployments**
   - Vercel automatically deploys when you push to GitHub
   - Every time you update code, it will auto-deploy

2. **Set Up Custom Domain Redirects** (Optional)
   - In Vercel → Settings → Domains
   - Set up redirects if needed (e.g., www → non-www)

3. **Test Your Site**
   - Visit `https://raymondrevelmusic.com`
   - Test all pages and functionality
   - Check mobile responsiveness

## Ongoing Management

### Making Updates

1. **Edit your code locally**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Vercel automatically deploys** - no manual steps needed!

### Viewing Deployments

- Go to Vercel dashboard
- See all deployments and their status
- Click any deployment to preview it
- Rollback to previous versions if needed

## Troubleshooting

### Domain Not Working?

1. **Check DNS propagation**: https://www.whatsmydns.net/
2. **Verify DNS records** match Vercel's requirements
3. **Wait 24-48 hours** for full propagation
4. **Check Vercel dashboard** for any error messages

### Build Errors?

1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Fix any errors and push again

### Need Help?

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: support@vercel.com
- Community: https://github.com/vercel/next.js/discussions

## Cost Estimate

**Vercel Free Tier Includes:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ SSL certificates
- ✅ DDoS protection

**If you exceed free tier:**
- Pro plan: $20/month (includes more bandwidth and features)

For a music website, the free tier should be sufficient!

## Next Steps After Deployment

1. ✅ Test all pages and functionality
2. ✅ Set up Google Analytics (optional)
3. ✅ Submit sitemap to Google Search Console
4. ✅ Update social media links
5. ✅ Monitor site performance in Vercel dashboard

---

**Ready to deploy?** Follow the steps above, and your site will be live in about 30 minutes (plus DNS propagation time)!

