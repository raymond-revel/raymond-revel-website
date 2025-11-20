const YOUTUBE_CHANNEL_ID = 'UCMeVS5rf7iNC9CI03QN2vpQ';
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';

// Note: RSS feed parsing requires DOMParser which is available in browser environments
// For server-side rendering, we'll need to use a different approach or XML parser

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
}

export async function getYouTubeVideos(maxResults: number = 12): Promise<YouTubeVideo[]> {
  // Try YouTube API first if key is available
  if (YOUTUBE_API_KEY) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet&order=date&maxResults=${maxResults}&type=video`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch YouTube videos');
      }

      const data = await response.json();

      return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
      }));
    } catch (error) {
      console.error('Error fetching YouTube videos via API:', error);
      // Fall through to RSS feed
    }
  }

  // Fallback to RSS feed via API route (no API key required, no CORS issues)
  try {
    return await getYouTubeVideosFromRSS(maxResults);
  } catch (error) {
    console.error('Error fetching YouTube videos via RSS:', error);
    return getFallbackVideos();
  }
}

async function getYouTubeVideosFromRSS(maxResults: number = 12): Promise<YouTubeVideo[]> {
  try {
    // Use Next.js API route to fetch RSS feed server-side (avoids CORS issues)
    const response = await fetch(`/api/youtube-rss?max=${maxResults}`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube RSS feed');
    }
    
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error('Error fetching YouTube RSS feed:', error);
    // Return empty array instead of throwing to allow fallback
    return [];
  }
}

function getFallbackVideos(): YouTubeVideo[] {
  // Fallback videos - Add your actual YouTube video IDs here
  // To get video IDs: Go to your YouTube video, copy the URL, the ID is after "v="
  // Example: https://www.youtube.com/watch?v=VIDEO_ID_HERE
  const videoIds: string[] = [
    // Add your Raymond Revel YouTube video IDs here:
    // 'VIDEO_ID_1',
    // 'VIDEO_ID_2',
    // 'VIDEO_ID_3',
  ];

  // If no video IDs provided, return empty array
  if (videoIds.length === 0) {
    return [];
  }

  return videoIds.map((id) => ({
    id,
    title: 'Raymond Revel Video',
    thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    publishedAt: new Date().toISOString(),
    description: 'Watch on YouTube',
  }));
}

