# Helper Scripts

This directory contains helper scripts for managing website content.

## Automatic Video Fetcher

The `fetch-recent-videos.js` script automatically fetches and adds the most recent TikTok and Instagram Reels videos to your website.

### Quick Start

**Fetch both TikTok and Instagram:**
```bash
npm run fetch-videos
```

This will automatically:
- Fetch recent TikTok videos from @raymondrevel
- Fetch recent Instagram Reels from @raymondrevelmusic
- Update `lib/videos.ts` with the new URLs

### Usage Examples

**Fetch only TikTok videos:**
```bash
npm run fetch-videos -- --tiktok-only
```

**Fetch only Instagram Reels:**
```bash
npm run fetch-videos -- --instagram-only
```

**Limit the number of videos:**
```bash
npm run fetch-videos -- --limit 10
```

### How It Works

The script attempts multiple methods to fetch videos:

1. **TikTok**: Uses web scraping via CORS proxy to extract video IDs from the profile page
2. **Instagram**: 
   - First tries Instagram Basic Display API (if `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN` is set)
   - Falls back to web scraping if API is not available

### Important Notes

⚠️ **Limitations:**
- TikTok and Instagram have anti-scraping measures, so automatic fetching may not always work
- The script uses CORS proxies which may be rate-limited
- For best results, use manual helper scripts or set up API keys

💡 **Recommendations:**
- For TikTok: Use `npm run add-tiktok` for reliable manual addition
- For Instagram: Set `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN` in `.env.local` for better API access
- The automatic fetcher is best used as a starting point, then manually verify/add videos

### Troubleshooting

**"Could not automatically extract video URLs"**
- This is normal due to platform restrictions
- Use manual helper scripts instead: `npm run add-tiktok` or `npm run add-instagram`

**"Failed to fetch profile"**
- CORS proxy may be rate-limited
- Try again later or use manual methods

**For Instagram API access:**
1. Go to https://developers.facebook.com/apps/
2. Create an app and add "Instagram Basic Display" product
3. Get User Token via OAuth flow
4. Add to `.env.local`: `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_token`

---

## Instagram Reel URL Helper

The `add-instagram-reels.js` script helps you easily add Instagram Reel URLs to your website.

### Quick Start

**Interactive Mode** (easiest):
```bash
npm run add-instagram
```

This will guide you through adding Instagram Reel URLs step by step.

### Usage Examples

**Add a single URL:**
```bash
npm run add-instagram -- --url "https://www.instagram.com/reel/ABC123/"
```

**Add multiple URLs:**
```bash
npm run add-instagram -- --urls "url1,url2,url3"
```

**Direct node command:**
```bash
node scripts/add-instagram-reels.js
```

### How to Get Instagram Reel URLs

1. Visit your Instagram profile or open the Reel
2. Click the **three dots (...)** on the Reel
3. Click **"Copy link"**
4. Paste the URL when prompted by the script

### What the Script Does

- ✅ Validates Instagram URL format (supports both `/reel/` and `/p/` formats)
- ✅ Checks for duplicate URLs
- ✅ Automatically updates `lib/videos.ts`
- ✅ Preserves existing URLs and comments
- ✅ Shows helpful error messages

### Troubleshooting

**"Invalid Instagram URL format"**
- Make sure the URL starts with `https://www.instagram.com/reel/REEL_ID/` or `https://www.instagram.com/p/POST_ID/`
- Remove any query parameters after the URL if needed

**"Could not find instagramReels array"**
- Make sure `lib/videos.ts` exists and has the correct structure
- Check that the file hasn't been modified incorrectly

---

## TikTok Video URL Helper

The `add-tiktok-videos.js` script helps you easily add TikTok video URLs to your website.

### Quick Start

**Interactive Mode** (easiest):
```bash
npm run add-tiktok
```

This will guide you through adding TikTok video URLs step by step.

### Usage Examples

**Add a single URL:**
```bash
npm run add-tiktok -- --url "https://www.tiktok.com/@raymondrevel/video/1234567890"
```

**Add multiple URLs:**
```bash
npm run add-tiktok -- --urls "url1,url2,url3"
```

**Direct node command:**
```bash
node scripts/add-tiktok-videos.js
```

### How to Get TikTok Video URLs

1. Visit your TikTok profile: https://www.tiktok.com/@raymondrevel
2. Click on a video to open it
3. Click the **"Share"** button (bottom right)
4. Click **"Copy link"**
5. Paste the URL when prompted by the script

### What the Script Does

- ✅ Validates TikTok URL format
- ✅ Checks for duplicate URLs
- ✅ Automatically updates `lib/videos.ts`
- ✅ Preserves existing URLs and comments
- ✅ Shows helpful error messages

### Troubleshooting

**"Invalid TikTok URL format"**
- Make sure the URL starts with `https://www.tiktok.com/@username/video/VIDEO_ID`
- Remove any query parameters after the video ID if needed

**"Could not find tiktokVideos array"**
- Make sure `lib/videos.ts` exists and has the correct structure
- Check that the file hasn't been modified incorrectly

