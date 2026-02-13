import HeroBackground from '@/components/HeroBackground';
import { backgroundPhotos } from '@/lib/photos';

export const metadata = {
  title: 'Links - Raymond Revel',
  description: 'All the links you need to connect with Raymond Revel - music, social media, and more.',
};

interface LinkItem {
  name: string;
  href: string;
  icon: string;
  color: string;
  gradient: string;
  featured?: boolean;
}

const links: LinkItem[] = [
  {
    name: 'Pre-Save: Upside Down',
    href: 'https://distrokid.com/hyperfollow/raymondrevel/upside-down?ref=release',
    icon: '🎵',
    color: 'from-purple-500 via-pink-500 to-orange-500',
    gradient: 'bg-gradient-to-br',
    featured: true,
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/17gtjCjxCPFSXyva6MAYts',
    icon: '🎵',
    color: 'from-green-500 to-green-700',
    gradient: 'bg-gradient-to-br',
  },
  {
    name: 'Apple Music',
    href: 'https://music.apple.com/us/artist/raymond-revel/1020816843',
    icon: '🍎',
    color: 'from-pink-500 to-pink-700',
    gradient: 'bg-gradient-to-br',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCMeVS5rf7iNC9CI03QN2vpQ',
    icon: '▶️',
    color: 'from-red-600 to-red-800',
    gradient: 'bg-gradient-to-br',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/raymondrevelmusic',
    icon: '📷',
    color: 'from-purple-500 via-pink-500 to-orange-500',
    gradient: 'bg-gradient-to-br',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@raymondrevel',
    icon: '🎵',
    color: 'from-gray-900 to-black',
    gradient: 'bg-gradient-to-br',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/rayrevelmusic',
    icon: '🐦',
    color: 'from-sky-400 to-sky-600',
    gradient: 'bg-gradient-to-br',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/RaymondRevelMusic',
    icon: '👤',
    color: 'from-blue-600 to-blue-800',
    gradient: 'bg-gradient-to-br',
  },
];

export default function Links() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Rotating Photos */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <HeroBackground photos={backgroundPhotos} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white drop-shadow-2xl tracking-tight">
            Links
          </h1>
          <p className="text-white/90 text-lg md:text-xl drop-shadow-lg">
            Connect with me everywhere
          </p>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block w-full ${link.gradient} ${link.color} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl ${
                  link.featured ? 'ring-4 ring-purple-300/50 dark:ring-purple-500/50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <div>
                      <h3 className="text-white font-semibold text-lg md:text-xl">
                        {link.name}
                      </h3>
                      {link.featured && (
                        <p className="text-white/80 text-sm mt-1">
                          Available February 28, 2026
                        </p>
                      )}
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your favorite consistently-inconsistent songwriter.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
