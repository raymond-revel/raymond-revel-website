import { NextResponse } from 'next/server';

const YOUTUBE_CHANNEL_ID = 'UCMeVS5rf7iNC9CI03QN2vpQ';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const maxResults = parseInt(searchParams.get('max') || '12', 10);
    
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
    
    // Fetch RSS feed server-side (no CORS issues)
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; YouTube RSS Reader)',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube RSS feed');
    }
    
    const xmlText = await response.text();
    
    // Parse XML to extract video data
    const videos: any[] = [];
    
    // Extract video entries using regex
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    let count = 0;
    
    while ((match = entryRegex.exec(xmlText)) !== null && count < maxResults) {
      const entryXml = match[1];
      
      // Extract video ID
      const videoIdMatch = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      
      if (!videoId) continue;
      
      // Extract title
      const titleMatch = entryXml.match(/<title[^>]*>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : 'Untitled';
      
      // Extract published date
      const publishedMatch = entryXml.match(/<published>([^<]+)<\/published>/);
      const published = publishedMatch ? publishedMatch[1] : new Date().toISOString();
      
      // Extract description
      const descMatch = entryXml.match(/<media:description[^>]*>([\s\S]*?)<\/media:description>/);
      const description = descMatch ? descMatch[1].trim() : '';
      
      videos.push({
        id: videoId,
        title,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt: published,
        description,
      });
      
      count++;
    }
    
    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching YouTube RSS feed:', error);
    return NextResponse.json({ videos: [] }, { status: 200 });
  }
}

