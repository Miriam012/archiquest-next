"use client";

import { useState, useEffect } from "react";
import ImageGallery from 'react-image-gallery';
import Zoom from 'react-medium-image-zoom';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-medium-image-zoom/dist/styles.css';

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
        In this gallery, you'll find masterplans, sections, and plans of how the project will operate and run globally. You'll also find some AI-generated images that reflect the project's design goals.
      </p>
      <ImageGallery
        items={images}
        startIndex={currentIndex}
        showThumbnails={true}
        showFullscreenButton={true}
        showPlayButton={false}
        onSlide={handleSlide}
        renderItem={(item) => (
          <Zoom>
            <img src={item.original} alt="" className="object-contain max-h-screen" />
          </Zoom>
        )}
      />
    </div>
  );
}