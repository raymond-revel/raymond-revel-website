import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videos - Raymond Revel',
  description: 'Watch music videos and performances by Raymond Revel on YouTube, TikTok, and Instagram Reels.',
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

