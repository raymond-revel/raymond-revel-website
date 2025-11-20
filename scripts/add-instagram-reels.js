#!/usr/bin/env node

/**
 * Helper script to add Instagram Reel URLs to lib/videos.ts
 * 
 * Usage:
 *   node scripts/add-instagram-reels.js
 *   node scripts/add-instagram-reels.js --url "https://www.instagram.com/reel/ABC123/"
 *   node scripts/add-instagram-reels.js --urls "url1,url2,url3"
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const VIDEOS_FILE = path.join(__dirname, '../lib/videos.ts');
const INSTAGRAM_USERNAME = 'raymondrevelmusic';
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}`;

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

function extractInstagramUrls(content) {
  const match = content.match(/export const instagramReels: string\[\] = \[([\s\S]*?)\];/);
  if (!match) {
    console.error('Could not find instagramReels array in videos.ts');
    process.exit(1);
  }
  
  const arrayContent = match[1];
  const urlRegex = /'https:\/\/www\.instagram\.com\/(reel|p)\/[\w-]+\/[^']*'/g;
  const urls = arrayContent.match(urlRegex) || [];
  
  return urls.map(url => url.replace(/'/g, ''));
}

function validateInstagramUrl(url) {
  // Accept both /reel/ and /p/ formats
  const instagramUrlRegex = /^https:\/\/www\.instagram\.com\/(reel|p)\/[\w-]+\//;
  if (!instagramUrlRegex.test(url)) {
    return false;
  }
  
  return true;
}

function normalizeInstagramUrl(url) {
  // Remove trailing slash and query parameters
  return url.split('?')[0].replace(/\/$/, '');
}

function addUrlsToFile(urls) {
  const content = readVideosFile();
  const existingUrls = extractInstagramUrls(content).map(normalizeInstagramUrl);
  
  // Normalize and filter out duplicates
  const normalizedUrls = urls.map(normalizeInstagramUrl);
  const newUrls = normalizedUrls.filter(url => !existingUrls.includes(url));
  
  if (newUrls.length === 0) {
    console.log('ℹ️  All URLs already exist in the file');
    return;
  }
  
  // Find the instagramReels array
  const arrayMatch = content.match(/(export const instagramReels: string\[\] = \[)([\s\S]*?)(\];)/);
  if (!arrayMatch) {
    console.error('Could not find instagramReels array');
    process.exit(1);
  }
  
  const [, start, arrayContent, end] = arrayMatch;
  
  // Extract existing URLs (excluding comments)
  const existingUrlsInFile = extractInstagramUrls(content).map(normalizeInstagramUrl);
  const allUrls = [...existingUrlsInFile, ...newUrls];
  
  // Build new array content
  let newArrayContent = '\n';
  if (allUrls.length === 0) {
    newArrayContent += '  // Add your Instagram Reel URLs here\n';
  } else {
    allUrls.forEach((url, index) => {
      newArrayContent += `  '${url}',\n`;
    });
  }
  newArrayContent += '];';
  
  const newContent = content.replace(
    /export const instagramReels: string\[\] = \[[\s\S]*?\];/,
    `export const instagramReels: string[] = [${newArrayContent}`
  );
  
  writeVideosFile(newContent);
  console.log(`✅ Added ${newUrls.length} new Instagram Reel URL(s)`);
  console.log(`📊 Total reels: ${allUrls.length}`);
}

async function interactiveMode() {
  console.log('\n📷 Instagram Reel URL Helper\n');
  console.log(`Profile: ${INSTAGRAM_PROFILE_URL}\n`);
  console.log('To get Instagram Reel URLs:');
  console.log('1. Visit your Instagram profile or the Reel');
  console.log('2. Click the three dots (...) on the Reel');
  console.log('3. Click "Copy link"');
  console.log('4. Paste the URL here\n');
  console.log('Note: URLs can be in these formats:');
  console.log('  - https://www.instagram.com/reel/REEL_ID/');
  console.log('  - https://www.instagram.com/p/POST_ID/\n');
  
  const urls = [];
  let continueAdding = true;
  
  while (continueAdding) {
    const url = await question('Enter Instagram Reel URL (or press Enter to finish): ');
    
    if (!url.trim()) {
      continueAdding = false;
      break;
    }
    
    if (validateInstagramUrl(url.trim())) {
      urls.push(url.trim());
      console.log('✅ URL added');
    } else {
      console.log('❌ Invalid Instagram URL format. Expected: https://www.instagram.com/reel/REEL_ID/ or https://www.instagram.com/p/POST_ID/');
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
Instagram Reel URL Helper

Usage:
  node scripts/add-instagram-reels.js                    # Interactive mode
  node scripts/add-instagram-reels.js --url "URL"        # Add single URL
  node scripts/add-instagram-reels.js --urls "URL1,URL2" # Add multiple URLs

Examples:
  node scripts/add-instagram-reels.js --url "https://www.instagram.com/reel/ABC123/"
  node scripts/add-instagram-reels.js --urls "url1,url2,url3"

Options:
  --url    Add a single Instagram Reel URL
  --urls   Add multiple Instagram Reel URLs (comma-separated)
  --help   Show this help message
`);
    process.exit(0);
  }
  
  const urlIndex = args.indexOf('--url');
  const urlsIndex = args.indexOf('--urls');
  
  if (urlIndex !== -1 && args[urlIndex + 1]) {
    const url = args[urlIndex + 1];
    if (validateInstagramUrl(url)) {
      addUrlsToFile([url]);
      process.exit(0);
    } else {
      console.error('❌ Invalid Instagram URL format');
      process.exit(1);
    }
  }
  
  if (urlsIndex !== -1 && args[urlsIndex + 1]) {
    const urls = args[urlsIndex + 1].split(',').map(u => u.trim()).filter(Boolean);
    const validUrls = urls.filter(validateInstagramUrl);
    
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

