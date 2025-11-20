import PhotoGallery from '@/components/PhotoGallery';
import { allPhotos, shuffleArray } from '@/lib/photos';

export const metadata = {
  title: 'Photos - Raymond Revel',
  description: 'Photo galleries featuring Raymond Revel performances, studio sessions, and more.',
};

export default function Photos() {
  // Randomize photos on each page load
  const shuffledPhotos = shuffleArray(allPhotos);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Photos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore photos from live performances, studio sessions, and behind-the-scenes moments.
          </p>
        </div>

        {shuffledPhotos.length > 0 ? (
          <PhotoGallery photos={shuffledPhotos} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Photos will be displayed here once uploaded to the public/images directory.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Add photos to <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">public/images/</code> and update the photos array in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">app/photos/page.tsx</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

