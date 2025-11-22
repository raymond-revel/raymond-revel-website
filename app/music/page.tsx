import MusicPlayer from '@/components/MusicPlayer';
import { discography } from '@/lib/music';
import HeroBackground from '@/components/HeroBackground';
import { backgroundPhotos } from '@/lib/photos';

export const metadata = {
  title: 'Music - Raymond Revel',
  description: 'Listen to music by Raymond Revel. Albums, singles, and EPs available on Spotify and Apple Music.',
};

export default function Music() {
  const albums = discography.filter(item => item.type === 'album');
  const singles = discography.filter(item => item.type === 'single');
  const eps = discography.filter(item => item.type === 'ep');
  
  // Sort all releases by year (newest first)
  const allReleases = [...discography].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  return (
    <div className="min-h-screen">
      {/* Hero Section with Rotating Photos */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <HeroBackground photos={backgroundPhotos} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-2xl tracking-tight">
            Music
          </h1>
        </div>
      </section>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* All Releases Section */}
          <section className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              All Releases
            </h2>
            <div className="space-y-4">
              {allReleases.map((release, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                          {release.title}
                        </h3>
                        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                          {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-lg">
                          {release.year}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {release.spotifyId ? (
                        <a
                          href={`https://open.spotify.com/${release.type === 'album' ? 'album' : 'track'}/${release.spotifyId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors text-sm"
                        >
                          Spotify
                        </a>
                      ) : (
                        <a
                          href="https://open.spotify.com/artist/17gtjCjxCPFSXyva6MAYts"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors text-sm"
                        >
                          Spotify
                        </a>
                      )}
                      {release.appleMusicId ? (
                        <a
                          href={`https://music.apple.com/us/${release.type === 'album' ? 'album' : 'song'}/${release.appleMusicId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition-colors text-sm"
                        >
                          Apple Music
                        </a>
                      ) : (
                        <a
                          href="https://music.apple.com/us/artist/raymond-revel/1020816843"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition-colors text-sm"
                        >
                          Apple Music
                        </a>
                      )}
                    </div>
                  </div>
                  {release.spotifyId || release.appleMusicId ? (
                    <div className="mt-4">
                      <MusicPlayer
                        spotifyId={release.spotifyId}
                        appleMusicId={release.appleMusicId}
                        title={release.title}
                        album={release.type === 'album' ? release.title : undefined}
                        year={release.year}
                        type={release.type}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* Albums */}
          {albums.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
                Albums
              </h2>
              <div className="space-y-6">
                {albums.map((album, index) => (
                  <MusicPlayer
                    key={index}
                    spotifyId={album.spotifyId}
                    appleMusicId={album.appleMusicId}
                    title={album.title}
                    album={album.title}
                    year={album.year}
                    type={album.type}
                  />
                ))}
              </div>
            </section>
          )}

          {/* EPs */}
          {eps.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
                EPs
              </h2>
              <div className="space-y-6">
                {eps.map((ep, index) => (
                  <MusicPlayer
                    key={index}
                    spotifyId={ep.spotifyId}
                    appleMusicId={ep.appleMusicId}
                    title={ep.title}
                    album={ep.title}
                    year={ep.year}
                    type={ep.type}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Singles */}
          {singles.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
                Singles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {singles.map((single, index) => (
                  <MusicPlayer
                    key={index}
                    spotifyId={single.spotifyId}
                    appleMusicId={single.appleMusicId}
                    title={single.title}
                    year={single.year}
                    type={single.type}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Streaming Links */}
          <section className="mt-16 bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Listen on Your Favorite Platform
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://open.spotify.com/artist/17gtjCjxCPFSXyva6MAYts"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Spotify
              </a>
              <a
                href="https://music.apple.com/us/artist/raymond-revel/1020816843"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition-colors"
              >
                Apple Music
              </a>
              <a
                href="https://www.youtube.com/channel/UCMeVS5rf7iNC9CI03QN2vpQ"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                YouTube Music
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

