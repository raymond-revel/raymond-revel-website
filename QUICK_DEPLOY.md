# Quick Deployment Checklist

## Pre-Deployment Checklist

- [ ] All content is finalized
- [ ] All videos/photos are added
- [ ] Test site locally: `npm run dev`
- [ ] Build test: `npm run build` (should succeed without errors)
- [ ] Review all pages for accuracy

## Deployment Steps (30 minutes)

### 1. GitHub Setup (5 min)
```bash
cd raymond-revel-website
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/raymond-revel-website.git
git push -u origin main
```

### 2. Vercel Deployment (10 min)
1. Go to https://vercel.com/signup
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Click "Deploy" (uses defaults)
6. Wait for build to complete

### 3. Domain Connection (15 min)
1. In Vercel → Settings → Domains
2. Add: `raymondrevelmusic.com`
3. Add: `www.raymondrevelmusic.com`
4. Follow DNS instructions from Vercel
5. Update DNS at your registrar
6. Wait for verification (can take 24-48 hours)

## Post-Deployment

- [ ] Test site at new domain
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Test video embeds
- [ ] Submit to Google Search Console
- [ ] Update social media bio links

## Need Help?

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

