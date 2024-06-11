"use client";

import { useState, useEffect } from "react";
import ImageGallery from 'react-image-gallery';
import Zoom from 'react-medium-image-zoom';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-medium-image-zoom/dist/styles.css';
import Image from 'next/image';

const images = [
  {
    original: '/1.jpg',
    thumbnail: '/1.jpg',
  },
  {
    original: '/2.jpg',
    thumbnail: '/2.jpg',
  },
  {
    original: '/3.jpg',
    thumbnail: '/3.jpg',
  },
  {
    original: '/4.jpg',
    thumbnail: '/4.jpg',
  },
  {
    original: '/5.jpg',
    thumbnail: '/5.jpg',
  },
  {
    original: '/6.jpg',
    thumbnail: '/6.jpg',
  },
  {
    original: '/details.jpg',
    thumbnail: '/details.jpg',
  },
  {
    original: '/masterplanNew.jpg',
    thumbnail: '/masterplanNew.jpg',
  },
  {
    original: '/CALL OUTS 1.jpg',
    thumbnail: '/CALL OUTS 1.jpg',
  },
  {
    original: '/zones.jpg',
    thumbnail: '/zones.jpg',
  },
  {
    original: '/processingstuff.jpg',
    thumbnail: '/processingstuff.jpg',
  },
  {
    original: '/section 1.jpg',
    thumbnail: '/section 1.jpg',
  },
  {
    original: '/section long.jpg',
    thumbnail: '/section long.jpg',
  },
  {
    original: '/finalpanel.jpg',
    thumbnail: '/finalpanel.jpg',
  },
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
      In this gallery, you will find an array of drawings that illustrate the evolution of the Fish For Food (F.F.F) OceanFarm project. Starting with a timeline of design iterations, the progression is displayed across the years 2019, 2024, 2038, 2042, 2046, and 2050. This timeline demonstrates the development and iterative process of the design, informed by both the World Simulation and the graph tool.
The masterplan highlights the project's expansion from Norway to Chile and Canada, showcasing the growth and distribution of the Fish For Food initiative on a global scale. Additionally, the drawings emphasize the integration of the project with existing architecture through detailed sections.
The first section, focusing on the Norway onshore aquaculture hub, vividly displays the processing and distribution services, offering insight into the operational intricacies of the hub. These drawings collectively illustrate the global impact and architectural integration of the Fish For Food project, emphasizing its development and expansion over time.
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
