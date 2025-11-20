import { getAllPosts, getAllCategories } from '@/lib/markdown';
import BlogCard from '@/components/BlogCard';

export const metadata = {
  title: 'Blog - Raymond Revel',
  description: 'Read the latest blog posts from Raymond Revel about music, life, and more.',
};

export default function Blog() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, stories, and updates from the studio and beyond.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No blog posts yet. Check back soon!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Blog posts are written in Markdown format and stored in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">content/blog/</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

