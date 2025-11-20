# Raymond Revel Music Website

A modern, custom music website built with Next.js, featuring improved music embeds, YouTube integration, photo galleries, and a markdown-based blog system.

**🌐 Live Site:** [raymondrevelmusic.com](https://raymondrevelmusic.com)

**📦 Deployed on:** Vercel

## Features

- 🎵 **Music Integration**: Spotify and Apple Music embeds
- 🎬 **YouTube Integration**: Automatic video syncing from YouTube channel
- 📸 **Photo Galleries**: Beautiful image galleries with lightbox
- ✍️ **Blog System**: Markdown-based blog for easy content management
- 📱 **Responsive Design**: Mobile-first, fully responsive
- ⚡ **Performance**: Optimized with Next.js Image and static generation
- 🔍 **SEO**: Built-in sitemap and robots.txt

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Set up YouTube API key:
   - Get a YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a `.env.local` file and add:
     ```
     NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
     ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Helper Scripts

### Adding TikTok Videos

Use the helper script to easily add TikTok video URLs:

```bash
npm run add-tiktok
```

This will guide you through adding TikTok video URLs interactively.

### Adding Instagram Reels

Use the helper script to easily add Instagram Reel URLs:

```bash
npm run add-instagram
```

This will guide you through adding Instagram Reel URLs interactively.

### Automatic Video Fetching

Automatically fetch and add the most recent TikTok and Instagram Reels:

```bash
npm run fetch-videos
```

This script attempts to automatically fetch videos from your profiles. Note: Due to platform restrictions, manual addition via helper scripts may be more reliable.

See `scripts/README.md` for more details on all scripts.

## Project Structure

```
/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── music/             # Music/discography page
│   ├── videos/            # YouTube videos page
│   ├── photos/            # Photo galleries page
│   ├── concerts/          # Concerts/events page
│   └── blog/              # Blog pages
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── MusicPlayer.tsx
│   ├── VideoGallery.tsx
│   ├── PhotoGallery.tsx
│   └── BlogCard.tsx
├── content/
│   └── blog/              # Markdown blog posts
├── lib/                   # Utility functions
│   ├── music.ts           # Music data
│   ├── youtube.ts         # YouTube API integration
│   └── markdown.ts        # Markdown processing
└── public/
    └── images/            # Image assets

```

## Adding Content

### Music

Edit `lib/music.ts` to add albums, singles, and tracks. Update the Spotify and Apple Music IDs for each release.

### Photos

1. Add photos to `public/images/`
2. Update the `photos` array in `app/photos/page.tsx`

### Blog Posts

1. Create a new `.md` file in `content/blog/`
2. Add frontmatter:
```markdown
---
title: "Your Post Title"
date: "2025-01-15"
excerpt: "Brief description"
category: "Category Name"
tags: ["tag1", "tag2"]
image: "/images/blog/image.jpg"
---

Your content here...
```

### Concerts

Edit the `concerts` array in `app/concerts/page.tsx` to add upcoming and past shows.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables if needed
4. Connect your domain (www.raymondrevelmusic.com)
5. Deploy!

The site will automatically deploy on every push to the main branch.

## Customization

- **Colors**: Edit `app/globals.css` for theme colors
- **Fonts**: Update fonts in `app/layout.tsx`
- **Social Links**: Update links in `components/Footer.tsx` and `app/about/page.tsx`

## License

All rights reserved © Raymond Revel
