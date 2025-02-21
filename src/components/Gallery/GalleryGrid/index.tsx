'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import './styles.scss';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { fetchContentfulImage } from '@/utils';

export default function GalleryGrid({ galleryImages }: { galleryImages: { src: string }[] }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const getImageClass = (index: number) => {
    if (galleryImages.length > 7) {
      const positionInSet = index % 9;
      if (positionInSet === 1 || positionInSet === 3) {
        return 'tall-item'; // Make 2nd and 4th images taller
      }
    }
    return '';
  };

  return (
    <div className="gallery-grid">
      <ResponsiveMasonry columnsCountBreakPoints={{ 359: 2, 767: 2, 1279: 4 }}>
        <Masonry gutter="20px">
          {galleryImages.map((img, index) => (
            <div
              key={fetchContentfulImage(img)}
              className={`gallery-item ${getImageClass(index)}`}
              onClick={() => handleImageClick(index)}
            >
              <Image
                className="gallery-image"
                src={fetchContentfulImage(img)}
                alt={`Gallery image ${index + 1}`}
                fill
                objectFit="cover"
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      <Lightbox
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .7)', backdropFilter: 'blur(5px)' } }}
        plugins={[Thumbnails, Fullscreen, Slideshow]}
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={galleryImages}
      />
    </div>
  );
}
