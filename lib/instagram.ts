const INSTAGRAM_USERNAME = 'raymondrevelmusic';
const INSTAGRAM_ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN || '';

export interface InstagramReel {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  publishedAt: string;
  description?: string;
}

/**
 * Fetch Instagram Reels using Instagram Basic Display API
 * 
 * To set up:
 * 1. Go to https://developers.facebook.com/apps/
 * 2. Create a new app or use existing
 * 3. Add "Instagram Basic Display" product
 * 4. Get User Token (requires OAuth flow)
 * 5. Add to .env.local: NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_token_here
 * 
 * Note: Instagram API requires OAuth authentication and has rate limits
 */
export async function getInstagramReels(maxResults: number = 12): Promise<InstagramReel[]> {
  // If no access token, try manual fallback
  if (!INSTAGRAM_ACCESS_TOKEN) {
    console.warn('Instagram access token not configured. Using manual fallback.');
    return getManualInstagramReels();
  }

  try {
    // Fetch user media using Instagram Basic Display API
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${maxResults}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Instagram media');
    }

    const data = await response.json();

    if (data.data && Array.isArray(data.data)) {
      // Filter for Reels (media_type === 'VIDEO' or 'REELS')
      const reels = data.data
        .filter((item: any) => item.media_type === 'VIDEO' || item.media_type === 'REELS')
        .slice(0, maxResults)
        .map((item: any) => ({
          id: item.id,
          url: item.permalink || `https://www.instagram.com/p/${item.id}/`,
          thumbnail: item.thumbnail_url || item.media_url || '',
          title: item.caption ? item.caption.substring(0, 100) : 'Instagram Reel',
          publishedAt: item.timestamp || new Date().toISOString(),
          description: item.caption || '',
        }));

      return reels.length > 0 ? reels : await getManualInstagramReels();
    }

    return await getManualInstagramReels();
  } catch (error) {
    console.error('Error fetching Instagram Reels:', error);
    return await getManualInstagramReels();
  }
}

/**
 * Manual Instagram Reels fallback
 * Add your Instagram Reel URLs here to display them
 * 
 * To get Instagram Reel URLs:
 * 1. Go to your Instagram Reel
 * 2. Click the three dots (...) → "Copy link"
 * 3. Paste the full URL here
 */
async function getManualInstagramReels(): Promise<InstagramReel[]> {
  // Import from videos.ts for manual management
  const videosModule = await import('./videos');
  const instagramReels = videosModule.instagramReels;
  
  if (!instagramReels || instagramReels.length === 0) {
    return [];
  }

  return instagramReels.map((url: string, index: number) => {
    // Extract reel ID from Instagram URL
    // Format: https://www.instagram.com/reel/REEL_ID/ or https://www.instagram.com/p/REEL_ID/
    const reelIdMatch = url.match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
    const reelId = reelIdMatch ? reelIdMatch[2] : `instagram-${index}`;

    return {
      id: reelId,
      url,
      thumbnail: '', // Instagram doesn't provide direct thumbnail URLs without API
      title: `Instagram Reel ${index + 1}`,
      publishedAt: new Date().toISOString(),
      description: '',
    };
  });
}

