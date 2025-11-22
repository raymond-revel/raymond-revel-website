import { getAllLyrics } from '@/lib/lyrics';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Lyrics - Raymond Revel',
  description: 'Read the lyrics to songs by Raymond Revel.',
};

export default function Lyrics() {
  const lyrics = getAllLyrics();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Lyrics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Read the lyrics to your favorite Raymond Revel songs.
          </p>
        </div>

        {lyrics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lyrics.map((lyric) => (
              <Link
                key={lyric.slug}
                href={`/lyrics/${lyric.slug}`}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                {lyric.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={lyric.image}
                      alt={lyric.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {lyric.title}
                  </h2>
                  {lyric.year && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {lyric.year}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No lyrics available yet. Check back soon!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Lyrics are written in Markdown format and stored in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">content/lyrics/</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

