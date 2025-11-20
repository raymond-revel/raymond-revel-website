import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  image?: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
        {post.image && (
          <div className="relative w-full h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          {post.category && (
            <span className="inline-block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {post.category}
            </span>
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <time className="text-sm text-gray-500 dark:text-gray-500">
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span className="text-sm text-gray-900 dark:text-white font-medium hover:underline">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

