"use client";

import { useState, useEffect } from "react";
import ImageGallery from 'react-image-gallery';
import Zoom from 'react-medium-image-zoom';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-medium-image-zoom/dist/styles.css';
import Image from 'next/image';

const images = [
  {
    original: '/masterplan.jpg',
    thumbnail: '/masterplan.jpg',
  },
  {
    original: '/processing.jpg',
    thumbnail: '/processing.jpg',
  },
  {
    original: '/section.jpg',
    thumbnail: '/section.jpg',
  },
  {
    original: '/Zones.jpg',
    thumbnail: '/Zones.jpg',
  }
];

export default function Design() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Log the paths to verify correctness
    images.forEach((image, index) => {
      console.log(`Image ${index + 1} - Original: ${image.original}, Thumbnail: ${image.thumbnail}`);
    });
  }, []);

  const handleSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-center">Design Gallery</h1>
      <p className="text-lg text-center mb-6 max-w-2xl">
        In this gallery, you will find masterplans, sections, and plans of how the project will operate and run globally. You will also find some AI-generated images that reflect the project's design goals.
      </p>
      <div className="w-full max-w-4xl">
        <ImageGallery
          items={images}
          startIndex={currentIndex}
          showThumbnails={true}
          showFullscreenButton={true}
          showPlayButton={false}
          onSlide={handleSlide}
          renderItem={(item) => (
            <Zoom>
              <div className="relative w-full" style={{ aspectRatio: '16/9', height: 'auto' }}>
                {item.original && (
                  <Image src={item.original} alt="" layout="fill" objectFit="contain" />
                )}
              </div>
            </Zoom>
          )}
          thumbnailPosition="bottom"
          renderThumbInner={(item) => (
            <div className="relative w-full" style={{ aspectRatio: '4/3', height: 'auto' }}>
              {item.thumbnail && (
                <Image src={item.thumbnail} alt="" layout="fill" objectFit="contain" />
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
