'use client';

import { useEffect, useState } from 'react';
import VideoGallery from '@/components/VideoGallery';
import { getYouTubeVideos } from '@/lib/youtube';
import { getTikTokVideos } from '@/lib/tiktok';
import { getInstagramReels } from '@/lib/instagram';
import { tiktokVideos, instagramReels } from '@/lib/videos';

// YouTube Videos Component
function YouTubeSection() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        const videoData = await getYouTubeVideos(6);
        setVideos(videoData);
        setError(null);
      } catch (err) {
        console.error('Error loading YouTube videos:', err);
        setError('Unable to load YouTube videos');
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading YouTube videos...</p>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error || 'No YouTube videos available at this time.'}
        </p>
        <a
          href="https://www.youtube.com/channel/UCMeVS5rf7iNC9CI03QN2vpQ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
        >
          <span>▶️</span>
          Visit YouTube Channel
        </a>
      </div>
    );
  }

  return <VideoGallery videos={videos} type="youtube" />;
}

// TikTok Videos Component
function TikTokSection() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        const videoData = await getTikTokVideos(6);
        setVideos(videoData);
        setError(null);
      } catch (err) {
        console.error('Error loading TikTok videos:', err);
        setError('Unable to load TikTok videos');
      } finally {
        setLoading(false);
      }
    }
    loadVideos();

    // Load TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading TikTok videos...</p>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          {error || 'TikTok videos will appear here once added.'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 max-w-2xl mx-auto">
          To add videos: Visit your TikTok profile, click on a video, click "Share" → "Copy link", then add the URL to <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-xs">lib/videos.ts</code>
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.tiktok.com/@raymondrevel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            <span>🎵</span>
            View TikTok Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {videos.map((video, index) => {
          // Extract video ID from TikTok URL
          const videoId = video.url.split('/video/')[1]?.split('?')[0] || video.id;
          if (!videoId) return null;

          return (
            <div key={video.id || index} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <blockquote
                className="tiktok-embed"
                data-video-id={videoId}
                style={{ maxWidth: '100%', minWidth: '325px' }}
              >
                <section>
                  <a
                    target="_blank"
                    href={video.url}
                    rel="noopener noreferrer"
                    title={video.title || `TikTok video ${index + 1}`}
                  >
                    View on TikTok
                  </a>
                </section>
              </blockquote>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-6">
        <a
          href="https://www.tiktok.com/@raymondrevel"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          <span>🎵</span>
          View TikTok Profile
        </a>
      </div>
    </>
  );
}

// Instagram Reels Component
function InstagramReelsSection() {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReels() {
      try {
        setLoading(true);
        const reelData = await getInstagramReels(6);
        setReels(reelData);
        setError(null);
      } catch (err) {
        console.error('Error loading Instagram Reels:', err);
        setError('Unable to load Instagram Reels');
      } finally {
        setLoading(false);
      }
    }
    loadReels();

    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading Instagram Reels...</p>
      </div>
    );
  }

  if (error || reels.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error || 'Instagram Reels will appear here once added. Add reel URLs to lib/videos.ts or configure Instagram access token.'}
        </p>
        <a
          href="https://www.instagram.com/raymondrevelmusic"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          <span>📷</span>
          Follow on Instagram
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {reels.map((reel, index) => {
          // Extract reel ID from Instagram URL
          const reelIdMatch = reel.url.match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
          const reelId = reelIdMatch ? reelIdMatch[2] : reel.id;

          return (
            <div key={reel.id || index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={reel.url}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: '0',
                  borderRadius: '3px',
                  margin: '1px',
                  maxWidth: '100%',
                  minWidth: '326px',
                  padding: '0',
                  width: '99.375%',
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a
                    href={reel.url}
                    style={{
                      background: '#FFFFFF',
                      lineHeight: '0',
                      padding: '0 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Instagram
                  </a>
                </div>
              </blockquote>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-6">
        <a
          href="https://www.instagram.com/raymondrevelmusic"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          <span>📷</span>
          Follow on Instagram
        </a>
      </div>
    </>
  );
}

export default function Videos() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Videos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Watch the latest music videos, performances, TikTok videos, Instagram Reels, and behind-the-scenes content.
          </p>
        </div>

        {/* TikTok Videos Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Latest TikTok Videos
          </h2>
          <TikTokSection />
        </section>

        {/* Instagram Reels Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Latest Instagram Reels
          </h2>
          <InstagramReelsSection />
        </section>

        {/* YouTube Videos Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Latest YouTube Videos
          </h2>
          <YouTubeSection />
        </section>

        {/* Social Links */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.tiktok.com/@raymondrevel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              <span>🎵</span>
              Follow on TikTok
            </a>
            <a
              href="https://www.instagram.com/raymondrevelmusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              <span>📷</span>
              Follow on Instagram
            </a>
            <a
              href="https://www.youtube.com/channel/UCMeVS5rf7iNC9CI03QN2vpQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              <span>▶️</span>
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
