#!/usr/bin/env node

/**
 * Helper script to add TikTok video URLs to lib/videos.ts
 * 
 * Usage:
 *   node scripts/add-tiktok-videos.js
 *   node scripts/add-tiktok-videos.js --url "https://www.tiktok.com/@raymondrevel/video/1234567890"
 *   node scripts/add-tiktok-videos.js --urls "url1,url2,url3"
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const VIDEOS_FILE = path.join(__dirname, '../lib/videos.ts');
const TIKTOK_USERNAME = 'raymondrevel';
const TIKTOK_PROFILE_URL = `https://www.tiktok.com/@${TIKTOK_USERNAME}`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function readVideosFile() {
  try {
    const content = fs.readFileSync(VIDEOS_FILE, 'utf8');
    return content;
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

function extractTikTokUrls(content) {
  const match = content.match(/export const tiktokVideos: string\[\] = \[([\s\S]*?)\];/);
  if (!match) {
    console.error('Could not find tiktokVideos array in videos.ts');
    process.exit(1);
  }
  
  const arrayContent = match[1];
  const urlRegex = /'https:\/\/www\.tiktok\.com\/@[\w]+\/video\/[\d]+[^']*'/g;
  const urls = arrayContent.match(urlRegex) || [];
  
  return urls.map(url => url.replace(/'/g, ''));
}

function validateTikTokUrl(url) {
  const tiktokUrlRegex = /^https:\/\/www\.tiktok\.com\/@[\w]+\/video\/[\d]+/;
  if (!tiktokUrlRegex.test(url)) {
    return false;
  }
  
  // Check if it's from the correct user
  if (!url.includes(`@${TIKTOK_USERNAME}`)) {
    console.warn(`⚠️  Warning: URL is not from @${TIKTOK_USERNAME}`);
  }
  
  return true;
}

function addUrlsToFile(urls) {
  const content = readVideosFile();
  const existingUrls = extractTikTokUrls(content);
  
  // Filter out duplicates
  const newUrls = urls.filter(url => !existingUrls.includes(url));
  
  if (newUrls.length === 0) {
    console.log('ℹ️  All URLs already exist in the file');
    return;
  }
  
  // Find the tiktokVideos array
  const arrayMatch = content.match(/(export const tiktokVideos: string\[\] = \[)([\s\S]*?)(\];)/);
  if (!arrayMatch) {
    console.error('Could not find tiktokVideos array');
    process.exit(1);
  }
  
  const [, start, arrayContent, end] = arrayMatch;
  
  // Extract existing URLs (excluding comments)
  const existingUrlsInFile = extractTikTokUrls(content);
  const allUrls = [...existingUrlsInFile, ...newUrls];
  
  // Build new array content
  let newArrayContent = '\n';
  if (allUrls.length === 0) {
    newArrayContent += '  // Add your TikTok video URLs here\n';
  } else {
    allUrls.forEach((url, index) => {
      newArrayContent += `  '${url}',\n`;
    });
  }
  newArrayContent += '];';
  
  const newContent = content.replace(
    /export const tiktokVideos: string\[\] = \[[\s\S]*?\];/,
    `export const tiktokVideos: string[] = [${newArrayContent}`
  );
  
  writeVideosFile(newContent);
  console.log(`✅ Added ${newUrls.length} new TikTok video URL(s)`);
  console.log(`📊 Total videos: ${allUrls.length}`);
}

async function interactiveMode() {
  console.log('\n🎵 TikTok Video URL Helper\n');
  console.log(`Profile: ${TIKTOK_PROFILE_URL}\n`);
  console.log('To get TikTok video URLs:');
  console.log('1. Visit your TikTok profile');
  console.log('2. Click on a video to open it');
  console.log('3. Click the "Share" button');
  console.log('4. Click "Copy link"');
  console.log('5. Paste the URL here\n');
  
  const urls = [];
  let continueAdding = true;
  
  while (continueAdding) {
    const url = await question('Enter TikTok video URL (or press Enter to finish): ');
    
    if (!url.trim()) {
      continueAdding = false;
      break;
    }
    
    if (validateTikTokUrl(url.trim())) {
      urls.push(url.trim());
      console.log('✅ URL added');
    } else {
      console.log('❌ Invalid TikTok URL format. Expected: https://www.tiktok.com/@username/video/VIDEO_ID');
    }
  }
  
  if (urls.length > 0) {
    addUrlsToFile(urls);
  } else {
    console.log('No URLs to add');
  }
  
  rl.close();
}

function parseCommandLineArgs() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
TikTok Video URL Helper

Usage:
  node scripts/add-tiktok-videos.js                    # Interactive mode
  node scripts/add-tiktok-videos.js --url "URL"        # Add single URL
  node scripts/add-tiktok-videos.js --urls "URL1,URL2" # Add multiple URLs

Examples:
  node scripts/add-tiktok-videos.js --url "https://www.tiktok.com/@raymondrevel/video/1234567890"
  node scripts/add-tiktok-videos.js --urls "url1,url2,url3"

Options:
  --url    Add a single TikTok video URL
  --urls   Add multiple TikTok video URLs (comma-separated)
  --help   Show this help message
`);
    process.exit(0);
  }
  
  const urlIndex = args.indexOf('--url');
  const urlsIndex = args.indexOf('--urls');
  
  if (urlIndex !== -1 && args[urlIndex + 1]) {
    const url = args[urlIndex + 1];
    if (validateTikTokUrl(url)) {
      addUrlsToFile([url]);
      process.exit(0);
    } else {
      console.error('❌ Invalid TikTok URL format');
      process.exit(1);
    }
  }
  
  if (urlsIndex !== -1 && args[urlsIndex + 1]) {
    const urls = args[urlsIndex + 1].split(',').map(u => u.trim()).filter(Boolean);
    const validUrls = urls.filter(validateTikTokUrl);
    
    if (validUrls.length !== urls.length) {
      console.warn('⚠️  Some URLs were invalid and skipped');
    }
    
    if (validUrls.length > 0) {
      addUrlsToFile(validUrls);
      process.exit(0);
    } else {
      console.error('❌ No valid URLs provided');
      process.exit(1);
    }
  }
  
  // No command line args, run interactive mode
  return null;
}

async function main() {
  const cliResult = parseCommandLineArgs();
  
  if (cliResult === null) {
    await interactiveMode();
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});

