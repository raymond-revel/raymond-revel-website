#!/usr/bin/env node

/**
 * Automatically fetch and add the most recent TikTok and Instagram Reels videos
 * 
 * Usage:
 *   node scripts/fetch-recent-videos.js
 *   node scripts/fetch-recent-videos.js --tiktok-only
 *   node scripts/fetch-recent-videos.js --instagram-only
 *   node scripts/fetch-recent-videos.js --limit 10
 */

const fs = require('fs');
const path = require('path');

const VIDEOS_FILE = path.join(__dirname, '../lib/videos.ts');
const TIKTOK_USERNAME = 'raymondrevel';
const INSTAGRAM_USERNAME = 'raymondrevelmusic';
const DEFAULT_LIMIT = 6;

function readVideosFile() {
  try {
    return fs.readFileSync(VIDEOS_FILE, 'utf8');
  } catch (error) {
    console.error('Error reading videos.ts file:', error.message);
    process.exit(1);
  }
}

function writeVideosFile(content) {
  try {
    fs.writeFileSync(VIDEOS_FILE, content, 'utf8');
    console.log('✅ Successfully updated lib/videos.ts');
  } catch (error) {
    console.error('Error writing videos.ts file:', error.message);
    process.exit(1);
  }
}

function extractUrls(content, type) {
  const regex = type === 'tiktok' 
    ? /export const tiktokVideos: string\[\] = \[([\s\S]*?)\];/
    : /export const instagramReels: string\[\] = \[([\s\S]*?)\];/;
  
  const match = content.match(regex);
  if (!match) return [];
  
  const arrayContent = match[1];
  const urlRegex = type === 'tiktok'
    ? /'https:\/\/www\.tiktok\.com\/@[\w]+\/video\/[\d]+[^']*'/g
    : /'https:\/\/www\.instagram\.com\/(reel|p)\/[\w-]+\/[^']*'/g;
  
  const urls = arrayContent.match(urlRegex) || [];
  return urls.map(url => url.replace(/'/g, '').split('?')[0]);
}

function updateVideosFile(tiktokUrls, instagramUrls) {
  let content = readVideosFile();
  
  // Update TikTok videos
  if (tiktokUrls !== null) {
    const existingTiktok = extractUrls(content, 'tiktok');
    const allTiktok = [...new Set([...existingTiktok, ...tiktokUrls])];
    
    let tiktokArrayContent = '\n';
    if (allTiktok.length === 0) {
      tiktokArrayContent += '  // Add your TikTok video URLs here\n';
    } else {
      allTiktok.forEach(url => {
        tiktokArrayContent += `  '${url}',\n`;
      });
    }
    tiktokArrayContent += '];';
    
    content = content.replace(
      /export const tiktokVideos: string\[\] = \[[\s\S]*?\];/,
      `export const tiktokVideos: string[] = [${tiktokArrayContent}`
    );
  }
  
  // Update Instagram Reels
  if (instagramUrls !== null) {
    const existingInstagram = extractUrls(content, 'instagram');
    const allInstagram = [...new Set([...existingInstagram, ...instagramUrls])];
    
    let instagramArrayContent = '\n';
    if (allInstagram.length === 0) {
      instagramArrayContent += '  // Add your Instagram Reel URLs here\n';
    } else {
      allInstagram.forEach(url => {
        instagramArrayContent += `  '${url}',\n`;
      });
    }
    instagramArrayContent += '];';
    
    content = content.replace(
      /export const instagramReels: string\[\] = \[[\s\S]*?\]/,
      `export const instagramReels: string[] = [${instagramArrayContent}`
    );
  }
  
  writeVideosFile(content);
}

async function fetchTikTokVideos(limit = DEFAULT_LIMIT) {
  console.log(`\n🎵 Fetching TikTok videos from @${TIKTOK_USERNAME}...`);
  
  try {
    // Method 1: Try using TikTok's embed API via a proxy/service
    // TikTok doesn't have a public API, so we'll use a scraping approach
    
    const profileUrl = `https://www.tiktok.com/@${TIKTOK_USERNAME}`;
    
    // Use a CORS proxy to fetch the page
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(profileUrl)}`;
    
    console.log('  Attempting to fetch TikTok profile...');
    
    // Add timeout and better error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    let response;
    try {
      response = await fetch(proxyUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timeout - TikTok may be blocking automated requests');
      }
      throw fetchError;
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch TikTok profile: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const html = data.contents || '';
    
    // Try to extract video URLs from the HTML
    // TikTok embeds video IDs in data attributes or script tags
    const videoIdRegex = /"videoId":"(\d+)"/g;
    const videoIds = [];
    let match;
    
    while ((match = videoIdRegex.exec(html)) !== null && videoIds.length < limit) {
      const videoId = match[1];
      if (videoId && videoId.length > 10) { // TikTok video IDs are typically long numbers
        videoIds.push(videoId);
      }
    }
    
    if (videoIds.length > 0) {
      const urls = videoIds.map(id => `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${id}`);
      console.log(`  ✅ Found ${urls.length} TikTok video(s)`);
      return urls;
    }
    
    // Method 2: Try alternative parsing
    const alternativeRegex = /\/video\/(\d{19,})/g;
    const altMatches = [];
    let altMatch;
    
    while ((altMatch = alternativeRegex.exec(html)) !== null && altMatches.length < limit) {
      const videoId = altMatch[1];
      if (!altMatches.includes(videoId)) {
        altMatches.push(videoId);
      }
    }
    
    if (altMatches.length > 0) {
      const urls = altMatches.map(id => `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${id}`);
      console.log(`  ✅ Found ${urls.length} TikTok video(s) (alternative method)`);
      return urls;
    }
    
    console.log('  ⚠️  Could not automatically extract TikTok video URLs');
    console.log('  💡 Tip: Use "npm run add-tiktok" to manually add TikTok video URLs');
    return [];
    
  } catch (error) {
    console.error('  ❌ Error fetching TikTok videos:', error.message);
    console.log('  💡 Tip: Use "npm run add-tiktok" to manually add TikTok video URLs');
    return [];
  }
}

async function fetchInstagramReels(limit = DEFAULT_LIMIT) {
  console.log(`\n📷 Fetching Instagram Reels from @${INSTAGRAM_USERNAME}...`);
  
  try {
    // Method 1: Try using Instagram's Basic Display API (if token is available)
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    
    if (accessToken) {
      console.log('  Using Instagram API...');
      const apiUrl = `https://graph.instagram.com/me/media?fields=id,media_type,permalink&access_token=${accessToken}&limit=${limit}`;
      
      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.data && Array.isArray(data.data)) {
          const reels = data.data
            .filter(item => item.media_type === 'VIDEO' || item.media_type === 'REELS')
            .slice(0, limit)
            .map(item => item.permalink);
          
          if (reels.length > 0) {
            console.log(`  ✅ Found ${reels.length} Instagram Reel(s) via API`);
            return reels;
          }
        }
      }
    }
    
    // Method 2: Try scraping the profile page
    const profileUrl = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
    
    console.log('  Attempting to fetch Instagram profile...');
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(profileUrl)}`;
    
    // Add timeout and better error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    let response;
    try {
      response = await fetch(proxyUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timeout - Instagram may be blocking automated requests');
      }
      throw fetchError;
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Instagram profile: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const html = data.contents || '';
    
    // Try to extract reel URLs from the HTML
    // Instagram embeds post/reel data in JSON-LD or script tags
    const reelRegex = /"shortcode":"([A-Za-z0-9_-]+)"/g;
    const reelCodes = [];
    let match;
    
    while ((match = reelRegex.exec(html)) !== null && reelCodes.length < limit) {
      const code = match[1];
      if (code && !reelCodes.includes(code)) {
        reelCodes.push(code);
      }
    }
    
    if (reelCodes.length > 0) {
      const urls = reelCodes.map(code => `https://www.instagram.com/reel/${code}/`);
      console.log(`  ✅ Found ${urls.length} Instagram Reel(s)`);
      return urls;
    }
    
    // Alternative: Try /p/ format
    const postRegex = /"\/p\/([A-Za-z0-9_-]+)\/"/g;
    const postCodes = [];
    let postMatch;
    
    while ((postMatch = postRegex.exec(html)) !== null && postCodes.length < limit) {
      const code = postMatch[1];
      if (code && !postCodes.includes(code)) {
        postCodes.push(code);
      }
    }
    
    if (postCodes.length > 0) {
      const urls = postCodes.map(code => `https://www.instagram.com/p/${code}/`);
      console.log(`  ✅ Found ${urls.length} Instagram post(s) (may include Reels)`);
      return urls;
    }
    
    console.log('  ⚠️  Could not automatically extract Instagram Reel URLs');
    console.log('  💡 Tip: Use "npm run add-instagram" to manually add Instagram Reel URLs');
    console.log('  💡 Tip: Set NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN for better results');
    return [];
    
  } catch (error) {
    console.error('  ❌ Error fetching Instagram Reels:', error.message);
    console.log('  💡 Tip: Use "npm run add-instagram" to manually add Instagram Reel URLs');
    return [];
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    tiktokOnly: args.includes('--tiktok-only'),
    instagramOnly: args.includes('--instagram-only'),
    limit: DEFAULT_LIMIT,
  };
  
  const limitIndex = args.indexOf('--limit');
  if (limitIndex !== -1 && args[limitIndex + 1]) {
    options.limit = parseInt(args[limitIndex + 1], 10) || DEFAULT_LIMIT;
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Automatically Fetch Recent Videos

Usage:
  node scripts/fetch-recent-videos.js              # Fetch both TikTok and Instagram
  node scripts/fetch-recent-videos.js --tiktok-only
  node scripts/fetch-recent-videos.js --instagram-only
  node scripts/fetch-recent-videos.js --limit 10

Options:
  --tiktok-only      Only fetch TikTok videos
  --instagram-only   Only fetch Instagram Reels
  --limit NUMBER     Maximum number of videos to fetch (default: 6)
  --help             Show this help message

Note: This script attempts to automatically fetch videos, but may not always succeed
due to platform restrictions. Manual addition via helper scripts is recommended.
`);
    process.exit(0);
  }
  
  return options;
}

async function main() {
  const options = parseArgs();
  
  console.log('🚀 Starting automatic video fetch...\n');
  console.log(`Limit: ${options.limit} videos per platform\n`);
  
  let tiktokUrls = null;
  let instagramUrls = null;
  
  // Fetch TikTok videos
  if (!options.instagramOnly) {
    tiktokUrls = await fetchTikTokVideos(options.limit);
  }
  
  // Fetch Instagram Reels
  if (!options.tiktokOnly) {
    instagramUrls = await fetchInstagramReels(options.limit);
  }
  
  // Update the file
  if (tiktokUrls !== null || instagramUrls !== null) {
    console.log('\n📝 Updating lib/videos.ts...');
    updateVideosFile(tiktokUrls, instagramUrls);
    
    const tiktokCount = tiktokUrls ? tiktokUrls.length : 0;
    const instagramCount = instagramUrls ? instagramUrls.length : 0;
    
    console.log(`\n✅ Complete! Added ${tiktokCount} TikTok video(s) and ${instagramCount} Instagram Reel(s)`);
  } else {
    console.log('\n⚠️  No videos were fetched. Try using manual helper scripts:');
    console.log('   npm run add-tiktok');
    console.log('   npm run add-instagram');
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});

