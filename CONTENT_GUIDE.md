# Content Management Guide

Quick reference for adding and updating content on your website.

## Quick Links

- **Music**: `lib/music.ts`
- **Photos**: `app/photos/page.tsx` + `public/images/`
- **Blog**: `content/blog/*.md`
- **Concerts**: `app/concerts/page.tsx`
- **About**: `app/about/page.tsx`

## Music Releases

**File:** `lib/music.ts`

```typescript
{
  title: 'Song/Album Name',
  year: '2025',
  type: 'single' | 'album' | 'ep',
  spotifyId: 'TRACK_OR_ALBUM_ID',
  appleMusicId: 'APPLE_MUSIC_ID', // Optional
}
```

**Popular Tracks:**
```typescript
{ title: 'Song Name', spotifyId: 'TRACK_ID' }
```

## Blog Posts

**Location:** `content/blog/your-post-name.md`

**Required Frontmatter:**
```markdown
---
title: "Post Title"
date: "2025-01-20"
excerpt: "Brief description"
category: "Category Name"
tags: ["tag1", "tag2"]
image: "/images/blog/image.jpg"  # Optional
---
```

**Writing Tips:**
- Use Markdown syntax
- Images: Place in `public/images/blog/` and reference as `/images/blog/filename.jpg`
- Headers: Use `#` for H1, `##` for H2, etc.
- Links: `[text](url)`
- Lists: Use `-` for bullet points

## Photos

1. **Add photos** to `public/images/` (organize by category)
2. **Update** `app/photos/page.tsx`:

```typescript
const photos = [
  {
    src: '/images/category/filename.jpg',
    alt: 'Description of photo',
    category: 'Category Name'
  }
];
```

**Categories:** Update the `categories` array in the same file.

## Concerts

**File:** `app/concerts/page.tsx`

```typescript
{
  date: '2025-12-15',  // YYYY-MM-DD format
  venue: 'Venue Name',
  location: 'City, State',
  ticketLink: 'https://...',  // Optional
  status: 'upcoming' | 'past'
}
```

## Social Media Links

Update in these files:
- `components/Footer.tsx`
- `app/about/page.tsx`
- `app/page.tsx` (home page)

## YouTube Videos

**Automatic (with API key):**
1. Get API key from Google Cloud Console
2. Add to `.env.local`: `NEXT_PUBLIC_YOUTUBE_API_KEY=your_key`
3. Videos auto-sync from your channel

**Manual (without API key):**
Edit `lib/youtube.ts` → `getFallbackVideos()` function

## File Structure Reference

```
raymond-revel-website/
├── app/                    # Pages
│   ├── about/             # About page
│   ├── music/             # Music page
│   ├── videos/            # Videos page
│   ├── photos/            # Photos page
│   ├── concerts/          # Concerts page
│   └── blog/              # Blog pages
├── components/            # Reusable components
├── content/
│   └── blog/              # Blog markdown files
├── lib/                   # Utilities
│   ├── music.ts          # Music data
│   ├── youtube.ts        # YouTube integration
│   └── markdown.ts       # Blog processing
└── public/
    └── images/           # All images
        └── blog/         # Blog post images
```

## Tips

- **Images**: Optimize before uploading (use tools like TinyPNG)
- **Blog**: Write in Markdown - it's simple and powerful
- **Music IDs**: Always test embeds after adding new IDs
- **Photos**: Use descriptive alt text for accessibility
- **Concerts**: Keep dates in YYYY-MM-DD format for proper sorting

