const TIKTOK_USERNAME = 'raymondrevel';
const TIKTOK_API_KEY = process.env.NEXT_PUBLIC_TIKTOK_API_KEY || '';

export interface TikTokVideo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  publishedAt: string;
  description?: string;
}

/**
 * Fetch TikTok videos using RapidAPI
 * 
 * To set up:
 * 1. Sign up at https://rapidapi.com/
 * 2. Subscribe to a TikTok API (e.g., "TikTok API" or "TikTok Scraper")
 * 3. Get your API key
 * 4. Add to .env.local: NEXT_PUBLIC_TIKTOK_API_KEY=your_api_key_here
 */
export async function getTikTokVideos(maxResults: number = 12): Promise<TikTokVideo[]> {
  // If no API key, try manual fallback
  if (!TIKTOK_API_KEY) {
    console.warn('TikTok API key not configured. Using manual fallback.');
    return getManualTikTokVideos();
  }

  try {
    // Example using RapidAPI TikTok API
    // Note: Replace with actual RapidAPI endpoint you subscribe to
    const response = await fetch(
      `https://tiktok-scraper2.p.rapidapi.com/user/posts?username=${TIKTOK_USERNAME}&count=${maxResults}`,
      {
        headers: {
          'X-RapidAPI-Key': TIKTOK_API_KEY,
          'X-RapidAPI-Host': 'tiktok-scraper2.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch TikTok videos');
    }

    const data = await response.json();

    // Parse response based on API structure
    // Adjust this based on the actual API response format
    if (data.data && Array.isArray(data.data)) {
      return data.data.slice(0, maxResults).map((item: any) => ({
        id: item.id || item.aweme_id || '',
        url: item.webVideoUrl || item.video_url || `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${item.id}`,
        thumbnail: item.cover || item.thumbnail || '',
        title: item.desc || item.description || 'TikTok Video',
        publishedAt: item.createTime || new Date().toISOString(),
        description: item.desc || item.description || '',
      }));
    }

    return getManualTikTokVideos();
  } catch (error) {
    console.error('Error fetching TikTok videos:', error);
    return await getManualTikTokVideos();
  }
}

/**
 * Manual TikTok videos fallback
 * Add your TikTok video URLs here to display them
 * 
 * To get TikTok video URLs:
 * 1. Go to your TikTok video
 * 2. Click "Share" → "Copy link"
 * 3. Paste the full URL here
 */
async function getManualTikTokVideos(): Promise<TikTokVideo[]> {
  // Import from videos.ts for manual management
  const videosModule = await import('./videos');
  const tiktokVideos = videosModule.tiktokVideos;
  
  if (!tiktokVideos || tiktokVideos.length === 0) {
    return [];
  }

  return tiktokVideos.map((url: string, index: number) => {
    // Extract video ID from TikTok URL
    // Format: https://www.tiktok.com/@username/video/VIDEO_ID
    const videoIdMatch = url.match(/\/video\/(\d+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : `tiktok-${index}`;

    return {
      id: videoId,
      url,
      thumbnail: `https://www.tiktok.com/api/img/?itemId=${videoId}`, // May not work, but placeholder
      title: `TikTok Video ${index + 1}`,
      publishedAt: new Date().toISOString(),
      description: '',
    };
  });
}

