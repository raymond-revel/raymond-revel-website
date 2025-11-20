# Deployment Checklist

Follow these steps to deploy your website to production.

## Pre-Deployment Checklist

### 1. Content Setup
- [ ] Add Spotify track/album IDs to `lib/music.ts`
- [ ] Add Apple Music IDs (optional) to `lib/music.ts`
- [ ] Upload photos to `public/images/`
- [ ] Update photo array in `app/photos/page.tsx`
- [ ] Write at least one blog post in `content/blog/`
- [ ] Add upcoming concerts to `app/concerts/page.tsx`
- [ ] Review and update About page content

### 2. Configuration
- [ ] Set up YouTube API key (optional) in `.env.local`
- [ ] Update social media links in Footer and About page
- [ ] Verify all external links work correctly
- [ ] Test music embeds on Music page
- [ ] Test video gallery (if YouTube API is set up)

### 3. Testing
- [ ] Run `npm run dev` and test all pages
- [ ] Test navigation on mobile devices
- [ ] Verify all images load correctly
- [ ] Check blog posts render properly
- [ ] Test music players (Spotify/Apple Music)
- [ ] Verify YouTube videos display (if API is set up)

### 4. SEO & Metadata
- [ ] Review metadata in `app/layout.tsx`
- [ ] Verify sitemap generates correctly (`/sitemap.xml`)
- [ ] Check robots.txt (`/robots.txt`)
- [ ] Add Open Graph images (optional)

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Prepare Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Configure:
     - Framework Preset: Next.js
     - Root Directory: `./` (default)
     - Build Command: `npm run build` (default)
     - Output Directory: `.next` (default)
   - Add Environment Variables:
     - `NEXT_PUBLIC_YOUTUBE_API_KEY` (if using YouTube API)
   - Click "Deploy"

4. **Connect Domain**
   - In Vercel project → Settings → Domains
   - Add `www.raymondrevelmusic.com`
   - Add `raymondrevelmusic.com` (redirects to www)
   - Update DNS records as instructed:
     - Add CNAME record: `www` → `cname.vercel-dns.com`
     - Add A record: `@` → Vercel IP (if needed)

5. **Verify Deployment**
   - Wait for DNS propagation (can take up to 48 hours)
   - Test site at `www.raymondrevelmusic.com`
   - Check all pages load correctly
   - Verify HTTPS is enabled

### Option 2: Other Platforms

**Netlify:**
- Similar process to Vercel
- Connect GitHub repo
- Build command: `npm run build`
- Publish directory: `.next`

**Self-Hosted:**
- Build: `npm run build`
- Start: `npm start`
- Requires Node.js server setup

## Post-Deployment

### 1. Verify Everything Works
- [ ] Home page loads
- [ ] All navigation links work
- [ ] Music players function
- [ ] Videos display (if API set up)
- [ ] Photos load correctly
- [ ] Blog posts render
- [ ] Mobile responsive design works

### 2. Performance
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Optimize images if needed
- [ ] Verify fast load times

### 3. Analytics (Optional)
- [ ] Set up Google Analytics
- [ ] Add tracking code to `app/layout.tsx`
- [ ] Set up Vercel Analytics (if using Vercel)

### 4. Monitoring
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Monitor uptime
- [ ] Check for broken links regularly

## Maintenance

### Regular Updates
- **Weekly**: Add new blog posts
- **Monthly**: Update concerts/events
- **As needed**: Add new music releases, photos

### Backup
- Keep GitHub repository updated
- Backup `content/blog/` directory
- Backup `public/images/` directory

## Troubleshooting

**Build Fails:**
- Check for TypeScript errors: `npm run build`
- Verify all imports are correct
- Check environment variables are set

**Images Don't Load:**
- Verify paths start with `/images/`
- Check files are in `public/images/`
- Ensure file names match exactly

**Music Embeds Don't Work:**
- Verify Spotify/Apple Music IDs are correct
- Check IDs are from the correct platform (track vs album)
- Test embed URLs directly

**YouTube Videos Don't Show:**
- Verify API key is set correctly
- Check API key has YouTube Data API v3 enabled
- Review `lib/youtube.ts` for errors

## Support Resources

- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

