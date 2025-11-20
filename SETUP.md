# Setup Guide for Raymond Revel Music Website

This guide will help you set up and customize your new music website.

## Initial Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see your site.

## Adding Your Content

### 1. Music (Spotify & Apple Music IDs)

Edit `lib/music.ts`:

**To get Spotify Track ID:**
- Go to Spotify and open the track
- Click "Share" → "Copy link to track"
- The ID is the last part: `spotify.com/track/TRACK_ID_HERE`

**To get Spotify Album ID:**
- Same process, but for albums: `spotify.com/album/ALBUM_ID_HERE`

**To get Apple Music ID:**
- Open the track/album on Apple Music
- Copy the URL and extract the ID from it

Example:
```typescript
{
  title: 'November In Me',
  year: '2025',
  type: 'single',
  spotifyId: '7xKXtgakCvAHX7D9v8MmyK', // Your actual ID
  appleMusicId: '1751234567', // Your actual ID
}
```

### 2. Photos

1. Add photos to `public/images/` directory
2. Organize by category (e.g., `public/images/live-shows/`, `public/images/studio/`)
3. Update `app/photos/page.tsx`:

```typescript
const photos = [
  { src: '/images/live-shows/photo1.jpg', alt: 'Live performance', category: 'Live Shows' },
  { src: '/images/studio/photo2.jpg', alt: 'Studio session', category: 'Studio' },
  // Add more photos...
];
```

### 3. Blog Posts

Create new `.md` files in `content/blog/`:

**File:** `content/blog/my-post.md`
```markdown
---
title: "My Blog Post Title"
date: "2025-01-20"
excerpt: "A brief description of the post"
category: "Music"
tags: ["songwriting", "studio"]
image: "/images/blog/post-image.jpg"
---

# My Blog Post

Your content here in Markdown format...
```

### 4. Concerts/Events

Edit `app/concerts/page.tsx`:

```typescript
const concerts: Concert[] = [
  {
    date: '2025-12-15',
    venue: 'Venue Name',
    location: 'City, State',
    ticketLink: 'https://example.com/tickets',
    status: 'upcoming',
  },
  // Add more concerts...
];
```

### 5. YouTube Videos (Optional)

1. Get a YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create `.env.local` file:
   ```
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
   ```
3. Videos will automatically sync from your channel

**Without API Key:**
- The site will use fallback data
- You can manually update videos in `lib/youtube.ts`

## Customization

### Colors & Theme

Edit `app/globals.css` to customize colors. The site supports both light and dark modes based on user preference.

### Social Media Links

Update links in:
- `components/Footer.tsx`
- `app/about/page.tsx`
- `app/page.tsx` (home page CTA section)

### Navigation

Edit `components/Navigation.tsx` to add/remove menu items.

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables if needed (YouTube API key)
   - Click "Deploy"

3. **Connect Your Domain**
   - In Vercel project settings, go to "Domains"
   - Add `www.raymondrevelmusic.com`
   - Follow DNS configuration instructions

## Next Steps

1. ✅ Add your Spotify/Apple Music IDs
2. ✅ Upload photos to `public/images/`
3. ✅ Write your first blog post
4. ✅ Add upcoming concerts
5. ✅ Set up YouTube API (optional)
6. ✅ Deploy to Vercel
7. ✅ Connect your domain

## Need Help?

- Check `README.md` for more details
- Review the code comments in each file
- All components are in `components/` directory
- All pages are in `app/` directory

