import Link from 'next/link';
import Image from 'next/image';
import MusicPlayer from '@/components/MusicPlayer';
import { discography, popularTracks } from '@/lib/music';
import { getAllPosts } from '@/lib/markdown';
import BlogCard from '@/components/BlogCard';
import { featuredPhotos, backgroundPhotos } from '@/lib/photos';
import HeroBackground from '@/components/HeroBackground';

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  const latestRelease = discography.find(album => album.spotifyId || album.appleMusicId) || discography[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <HeroBackground photos={backgroundPhotos} />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-white drop-shadow-2xl tracking-tight">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Raymond Revel
              </span>
            </h1>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl text-white mb-12 max-w-4xl mx-auto font-medium tracking-wide drop-shadow-lg">
              Singer-Songwriter & Producer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/music"
                className="px-10 py-4 bg-white/95 text-gray-900 rounded-full font-semibold hover:bg-white transition-all hover:scale-105 shadow-xl text-lg"
              >
                Listen Now
              </Link>
              <Link
                href="/about"
                className="px-10 py-4 border-2 border-white/90 text-white rounded-full font-semibold hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Release */}
      {latestRelease && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center tracking-tight">
              Latest Release
            </h2>
            <div className="max-w-2xl mx-auto">
              <MusicPlayer
                spotifyId={latestRelease.spotifyId}
                appleMusicId={latestRelease.appleMusicId}
                title={latestRelease.title}
                album={latestRelease.type === 'album' ? latestRelease.title : undefined}
                year={latestRelease.year}
              />
            </div>
          </div>
        </section>
      )}

      {/* Popular Tracks */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center tracking-tight">
            Popular Tracks
          </h2>
          {popularTracks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTracks.slice(0, 5).map((track, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  {track.spotifyId && (
                    <iframe
                      style={{ borderRadius: '12px' }}
                      src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={track.title}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                Add popular tracks to <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">lib/music.ts</code> to display them here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Photo Gallery */}
      {featuredPhotos.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                Featured Photos
              </h2>
              <Link
                href="/photos"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                View All Photos →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {featuredPhotos.map((photo, index) => (
                <Link
                  key={index}
                  href="/photos"
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                Latest Blog Posts
              </h2>
              <Link
                href="/blog"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">Stay Connected</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Follow me on social media for the latest updates, behind-the-scenes content, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com/raymondrevelmusic"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Instagram
            </a>
            <a
              href="https://open.spotify.com/artist/17gtjCjxCPFSXyva6MAYts"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              Spotify
            </a>
            <a
              href="https://www.youtube.com/channel/UCMeVS5rf7iNC9CI03QN2vpQ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
