import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const lyricsDirectory = path.join(process.cwd(), 'content/lyrics');

export interface Lyric {
  slug: string;
  title: string;
  year?: string;
  content: string;
  image?: string;
}

export function getAllLyrics(): Lyric[] {
  if (!fs.existsSync(lyricsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(lyricsDirectory);
  const allLyricsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '');
      const fullPath = path.join(lyricsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        year: data.year,
        content,
        image: data.image,
      };
    });

  return allLyricsData.sort((a, b) => {
    // Sort by year if available, otherwise by title
    if (a.year && b.year) {
      return parseInt(b.year) - parseInt(a.year);
    }
    if (a.year) return -1;
    if (b.year) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getLyricBySlug(slug: string): Lyric | null {
  const allLyrics = getAllLyrics();
  return allLyrics.find((lyric) => lyric.slug === slug) || null;
}

export function getLyricSlugs(): string[] {
  const lyrics = getAllLyrics();
  return lyrics.map((lyric) => lyric.slug);
}

