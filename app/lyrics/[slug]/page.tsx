import { notFound } from 'next/navigation';
import { getLyricBySlug, getAllLyrics } from '@/lib/lyrics';
import Link from 'next/link';
import MarkdownContent from '@/components/MarkdownContent';

export async function generateStaticParams() {
  const lyrics = getAllLyrics();
  return lyrics.map((lyric) => ({
    slug: lyric.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lyric = getLyricBySlug(slug);
  
  if (!lyric) {
    return {
      title: 'Lyrics Not Found',
    };
  }

  return {
    title: `${lyric.title} - Lyrics - Raymond Revel`,
    description: `Lyrics to ${lyric.title} by Raymond Revel`,
  };
}

export default async function LyricPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lyric = getLyricBySlug(slug);

  if (!lyric) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/lyrics"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            ← Back to Lyrics
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {lyric.title}
            </h1>
            {lyric.year && (
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <span>{lyric.year}</span>
              </div>
            )}
          </header>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MarkdownContent content={lyric.content} />
      </div>
    </article>
  );
}

