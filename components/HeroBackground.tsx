'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Photo {
  src: string;
  alt: string;
}

interface HeroBackgroundProps {
  photos: Photo[];
}

export default function HeroBackground({ photos }: HeroBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [photos.length]);

  if (photos.length === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
    );
  }

  return (
    <div className="absolute inset-0">
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
        </div>
      ))}
    </div>
  );
}

