import Link from 'next/link';

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/raymondrevelmusic', icon: '📷' },
  { name: 'Facebook', href: 'https://facebook.com/RaymondRevelMusic', icon: '👤' },
  { name: 'Twitter', href: 'https://twitter.com/rayrevelmusic', icon: '🐦' },
  { name: 'TikTok', href: 'https://tiktok.com/@raymondrevel', icon: '🎵' },
  { name: 'Spotify', href: 'https://open.spotify.com/artist/17gtjCjxCPFSXyva6MAYts', icon: '🎵' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCMeVS5rf7iNC9CI03QN2vpQ', icon: '▶️' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 text-transparent bg-clip-text">
              Raymond Revel
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your favorite consistently-inconsistent songwriter.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/music" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Music
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/links" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Links
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gray-200">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label={social.name}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm font-display">&copy; {new Date().getFullYear()} Raymond Revel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

