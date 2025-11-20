import Image from 'next/image';
import HeroBackground from '@/components/HeroBackground';
import { backgroundPhotos } from '@/lib/photos';

export const metadata = {
  title: 'About - Raymond Revel',
  description: 'Learn about Raymond Revel, singer-songwriter and producer based in Fort Worth, Texas.',
};

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Rotating Photos */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <HeroBackground photos={backgroundPhotos} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-2xl tracking-tight">
            About
          </h1>
        </div>
      </section>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Raymond Revel is a singer-songwriter/producer based out of Fort Worth, Texas. 
                Originally from Burbank, California, Revel began creating primarily as a piano-based 
                songwriter. However, once Raymond began his experimentation with music production, 
                his songwriting branched out into a variety of sub-genres, where each song began to 
                have its own unique sound and character.
              </p>
            </div>

            <div className="mb-8">
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Raymond has never enjoyed being pinned down or "stuck in a box" so what you will 
                find in his catalogue is a wide variety of sounds and musical styles. Raymond takes 
                pride in being "consistently inconsistent" and believes that as a songwriter, he will 
                continue to expand into new sounds and ideas.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Connect With Me
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <a
                  href="https://instagram.com/raymondrevelmusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">📷</span>
                    <span className="text-white font-semibold text-sm">Instagram</span>
                    <span className="text-white/80 text-xs mt-1">@raymondrevelmusic</span>
                  </div>
                </a>
                <a
                  href="https://facebook.com/RaymondRevelMusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">👤</span>
                    <span className="text-white font-semibold text-sm">Facebook</span>
                    <span className="text-white/80 text-xs mt-1">Raymond Revel Music</span>
                  </div>
                </a>
                <a
                  href="https://twitter.com/rayrevelmusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🐦</span>
                    <span className="text-white font-semibold text-sm">Twitter</span>
                    <span className="text-white/80 text-xs mt-1">@rayrevelmusic</span>
                  </div>
                </a>
                <a
                  href="https://tiktok.com/@raymondrevel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🎵</span>
                    <span className="text-white font-semibold text-sm">TikTok</span>
                    <span className="text-white/80 text-xs mt-1">@raymondrevel</span>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Streaming Platforms
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="https://open.spotify.com/artist/17gtjCjxCPFSXyva6MAYts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🎵</span>
                    <span className="text-white font-semibold">Spotify</span>
                  </div>
                </a>
                <a
                  href="https://music.apple.com/us/artist/raymond-revel/1020816843"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🍎</span>
                    <span className="text-white font-semibold">Apple Music</span>
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCMeVS5rf7iNC9CI03QN2vpQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">▶️</span>
                    <span className="text-white font-semibold">YouTube</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

